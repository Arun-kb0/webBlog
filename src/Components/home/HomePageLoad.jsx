import React from 'react'

function HomePageLoad() {
    return (

        <div className='home '>
            <div className='PostsContainers '>
                <PostContainerLoading />
                <PostContainerLoading />
                <PostContainerLoading />
            </div>
        </div>
    )
}

const PostContainerLoading = () => {


    return (
        <div id='postContainer' className='' >
            <div id="postTextContainer" className='postTextTitle-load' />

            <div className='postTextContainer-skeleton' />
            <div className='postTextContainer-skeleton' />
            <div className='postTextContainer-skeleton' />
            <div className='postTextContainer-skeleton' />
            <div className='postTextContainer-skeleton w-96' />

            <div id="postTextContainer" className='postTextContainer-skeleton w-20 mt-7' />
        </div>
    )
}

export default HomePageLoad