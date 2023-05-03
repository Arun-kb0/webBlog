import { SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILED } from "../../constants";

import { db } from "../../../../firebase-config";
import { query, collection, where, getDocs } from '../../../../imports/firebaseFunctions'
import { QueryEndAtConstraint, endAt, orderBy, startAt } from "firebase/firestore";

const searchStart = () => {
    return {
        type: SEARCH_START
    }
}

const searchSuccess = (searchData) => {
    return {
        type: SEARCH_SUCCESS,
        payload: searchData
    }
}


const searchFailed = (error) => {
    return {
        type: SEARCH_FAILED,
        payload: error
    }
}


// ! not getting hastag all array  data
export const search = (searchTerm) => {
    console.log("search async call")


    return async function (dispatch) {

        dispatch(searchStart())
        console.warn(searchTerm)

        try {

            const collectionNames = {
                'posts': ['title', 'hashtags'],
                'users': ['name']
            }

            let snap = null;
            let searchData = null;
            let colName = null
            let matchDocs = []

            for (const collectionName of Object.keys(collectionNames)) {
                const fields = collectionNames[collectionName];
                for (const field of fields) {
                    console.log(field, collectionName);
                    let q = null
                    const postRef = collection(db, collectionName);
                    if (field === 'hashtags') {
                        q = query(postRef,
                            where(field, 'array-contains', searchTerm),
                        );
                    } else {
                        q = query(postRef,
                            where(field, '>=', searchTerm),
                            where(field, '<=', searchTerm + "\uf8ff"),
                        );
                    }
                    const querySnap = await getDocs(q);
                    console.warn(querySnap.empty, q);

                    if (!querySnap.empty) {
                        console.log(`Found in ${collectionName} collection using field ${field}`);
                        snap = querySnap;
                        colName = collectionName
                        matchDocs.push(...querySnap.docs)

                    }
                }
            }

            console.warn(snap?.docs);
            console.warn(matchDocs)


            if (snap) {

                searchData = snap.docs.map((doc) => {
                    return { ...doc.data(), postId: doc.id };
                });
            }
            console.warn(searchData);
            console.warn(colName)


            dispatch(searchSuccess({ searchData, collectionName: colName }));

        } catch (error) {
            console.warn(error)
            dispatch(searchFailed())
        }

    }
}

