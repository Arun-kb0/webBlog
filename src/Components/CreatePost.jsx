import React from 'react'

function CreatePost() {
  return (
    <section className=''>
      <div className='createPost'>
        <h1  className='CreatePostFeildText text-4xl mb-6' >Create A Post</h1>
        <div className='pt-4 pl-10 pr-10'>
          <label className='CreatePostFeildText '>Title</label><br/>
          <input className='createPostInput' placeholder='Title'/>
        </div>
        <div className='p-1 pl-10 pr-10'>
        <label className='CreatePostFeildText mt-4'>Post</label><br/>
          <textarea className='createPostInput h-44' placeholder='post'/>

        </div>
        <div className='flex justify-center p-4'>
          <button className='btn p-3 pl-4 pr-4'>Submit Post</button>
        </div>
      </div>
    </section>
  )
}

export default CreatePost