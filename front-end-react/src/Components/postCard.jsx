
export default function PostCard({ data }) {
    if (!data || !data.post) {
        return <p>Loading...</p>
    }
    console.log(data)
    return (
        <div className='container'>

            {data.post.length === 0 ? (<h2 className="no-post">No Post</h2>) : (

                data.post.map((el) => (

                    <div className='post-container card-post-container' key={el.post_id}>
                        <div className='img-container'>
                            <img src={el.featured_media === "None" ? "/image-not-found.png" : el.featured_media} className='post-img' />
                        </div>
                        <div className='text-container'>
                            <h2>{el.title}</h2>
                            <p>{el.content}</p>
                            <div>{el.modified_gmt}</div>
                            <a href={el.link} className='view-post-btn' target='_blank'>View</a>
                        </div>
                    </div>

                ))
            )}

        </div>
    )
}
