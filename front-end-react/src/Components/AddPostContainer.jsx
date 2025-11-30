

export default function AddPostContainer({ data,  setShowAddPost}) {
    console.log(data)
    return (
        <>
            <div className="container">
                <div className="edit-add-post-container">
                    <div className="posts-container">
                        {data.post.map((el) => {
                            return (
                                <div className="post" key={el.id} id={el.id}>
                                    <p>{el.title}</p>
                                    <button className="delBtn">Delete</button>
                                </div>
                            )
                        })}
                    </div>
                    <button className="add-post-btn" onClick={()=>{setShowAddPost(true)}}>Add post</button>

                </div>
            </div>

        </>
    )
}
