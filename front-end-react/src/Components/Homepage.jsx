import InfoCard from "./InfoCard"
import Logout from "./Logout"



export default function Homepage({ data }) {
    console.log(data)
    return (
        <>
        <h1 className="homePage">Home page</h1>
           <InfoCard data={data}/> 
        </>
    )
}
