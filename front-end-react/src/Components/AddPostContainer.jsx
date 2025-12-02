

export default function AddPostContainer({ data, setShowAddPost }) {


    return (
        <>
            <div className="container">
                <div className="edit-add-post-container">
                    <div className="posts-container">
                        {data.post.length === 0 ? (
                            <p>No posts</p>
                        ) : (
                            data.post.slice().reverse().map((el) => (
                                <div className="post" key={el.id} id={el.id}>
                                    <p>{el.title ? el.title : "No title"}</p>
                                    <button className="delBtn">Delete</button>
                                </div>
                            ))
                        )}
                    </div>

                    <button className="add-post-btn" onClick={() => { setShowAddPost(true) }}>Add post</button>

                </div>
            </div>

        </>
    )
}
