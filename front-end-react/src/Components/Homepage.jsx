import Logout from "./Logout"



export default function Homepage({ data }) {
    console.log(data)
    return (
        <div>
            <h2>{data.name}</h2>
            {data.post.map((el) => {
                return (
                    <p key={el.post_id} id={el.post_id}>{el.post_title}</p>
                )
            })}
            
        </div>
    )
}
