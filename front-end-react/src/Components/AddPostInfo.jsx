import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


export default function AddPostInfo({ setShowAddPost, refresh }) {
  const [fileName, setFileName] = useState("No file yet")
  const [file, setFile] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [publish, setPublish] = useState("private")


  async function handleJsonData() {

    const formData = new FormData();

    const jsonData = {
      title: title,
      content: content,
      publish: publish
    }

    formData.append("img", file)
    formData.append("json", JSON.stringify(jsonData))

    const res = await fetch("http://127.0.0.1:5000/add_data",
      {
        method: "POST",
        credentials: "include",
        body: formData
      }
    )

    const data = await res.json()
    if (data.msg === "post added") {
      refresh()
      setShowAddPost(false)
    }

  }

  return (
    <>


      <div className='add-post-frame'>
        <div className='clos-add-post-info'><FontAwesomeIcon icon={faX} id='x' onClick={() => { setShowAddPost(false) }} /></div>

        <input type="text" placeholder='Enter post title' className='post-title' onChange={(e) => { setTitle(e.target.value) }} />
        <textarea className='post-textarea' placeholder='Enter post content' onChange={(e) => { setContent(e.target.value) }} />
        <label className="upload-label">
          {fileName}
          <input
            type="file"
            className="upload-img"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFileName(file.name)
                setFile(file)
              }
            }}
          />
        </label>

        <div className='Publish'>
          <input type="checkbox" onChange={(e) => {setPublish( e.target.checked ? "publish" : "private")}} />
          <p>Publish?</p>
        </div>
        <button className='navBtn add' onClick={() => handleJsonData()}>Add</button>
      </div>

    </>
  )
}
