import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
export default function AddPostInfo({ setShowAddPost }) {
  const [fileName, setFileName] = useState("No file yet")
  return (
    <>


      <div className='add-post-frame'>
        <div className='clos-add-post-info'><FontAwesomeIcon icon={faX} id='x' onClick={() => { setShowAddPost(false) }} /></div>

        <input type="text" placeholder='Enter post title' className='post-title' />
        <textarea className='post-textarea' placeholder='Enter post content' />
        <label className="upload-label">
          {fileName}
          <input
            type="file"
            className="upload-img"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFileName(file.name)
              }
            }}
          />
        </label>

        <div className='Publish'>
          <input type="checkbox" />
          <p>Publish?</p>
        </div>
        <button className='navBtn add'>Add</button>
      </div>

    </>
  )
}
