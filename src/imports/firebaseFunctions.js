
// ! fix needed
const { createUserWithEmailAndPassword, updateProfile, 
    signInWithEmailAndPassword, signOut } =await import('firebase/auth')


const {
    doc, setDoc, getDoc, collection, addDoc,
    updateDoc, arrayUnion, onSnapshot, arrayRemove,
    getDocs, deleteDoc, 
    query, where,
    increment,
}  =  await import( "firebase/firestore");

// import('firebase/auth').then((module) => {
//     const{
//         createUserWithEmailAndPassword, updateProfile,
//         signInWithEmailAndPassword, signOut
//     } = module
// })

// import('firebase/firestore').then((module) => {
//     const{
//         doc, setDoc, getDoc, collection, addDoc,
//             updateDoc, arrayUnion, onSnapshot, arrayRemove,
//             getDocs, deleteDoc,
//             query, where,
//             increment,
//     }  = module
// })



// import("firebase/firestore").then(() => {
//     doc, setDoc, getDoc, collection, addDoc,
//         updateDoc, arrayUnion, onSnapshot, arrayRemove,
//         getDocs, deleteDoc,
//         query, where,
//         increment,
// })

export {
    createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut,
    doc, setDoc, getDoc, collection, addDoc,
    updateDoc, arrayUnion, onSnapshot, arrayRemove,
    getDocs, deleteDoc,
    query, where,
    increment,
}


// import { useEffect, useState } from "react";


// let firebaseFunctions = null

// async function loadFirebaseFunctions() {
//     try {
//         const [
//             {
//                 createUserWithEmailAndPassword, updateProfile,
//                 signInWithEmailAndPassword, signOut
//             },

//             {
//                 doc, setDoc, getDoc, collection, addDoc,
//                 updateDoc, arrayUnion, onSnapshot, arrayRemove,
//                 getDocs, deleteDoc, query, where, increment,
//             }
//         ] = await Promise.all([
//             import('firebase/auth'),
//             import('firebase/firestore')
//         ])

//         firebaseFunctions = Object.freeze({
//             createUserWithEmailAndPassword,
//             updateProfile,
//             signInWithEmailAndPassword,
//             signOut,
//             doc,
//             setDoc,
//             getDoc,
//             collection,
//             addDoc,
//             updateDoc,
//             arrayUnion,
//             onSnapshot,
//             arrayRemove,
//             getDocs,
//             deleteDoc,
//             query,
//             where,
//             increment
//         })
//     } catch (error) {
//         console.error('Error loading Firebase functions:', error);
//     }
// }




// function useFirebaseFunctions(){
//     const [functions, setFunctions] = useState(null);

//     useEffect(()=>{
//         loadFirebaseFunctions.then(()=>{
//             setFunctions(firebaseFunctions)
//         })
//     },[])
//     return functions
// }

// export default useFirebaseFunctions


