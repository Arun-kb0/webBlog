import React from 'react'
import Home from '../Components/home/Home'
import { useSelector } from 'react-redux'

function SearchPage() {
    const styles = {
        home: 'home',
        PostsContainers: 'mt-28'
    }
    const { searchData, collectionName, searchChange } = useSelector(state => state.searchReducer)

    return (
        <div >
            {
                collectionName === 'posts' &&
                <Home
                    postLists={searchData}
                    searchChange={searchChange}
                    styles={styles}
                />
            }

            

            {
                collectionName === null &&
                <div className=' notfound-container'>
                    <h1 className='notfound-text
                     '>not found..</h1>
                </div>
            }
        </div>
    )
}

export default SearchPage