

export default function InfoCard({ data }) {
    console.log(data)
    return (
        <>
            <div className="card-container">
                {data.post.map((el, index) => {
                    return (
                        <div className="card">
                            <h2>{data.name}</h2>
                            <p key={index} id={index}>{el.post_title}</p>
                        </div>
                    )
                })}
            </div>

        </>
    )
}
