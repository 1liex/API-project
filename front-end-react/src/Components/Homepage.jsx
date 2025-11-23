import InfoCard from "./InfoCard"



export default function Homepage({ data }) {
    return (
        <>
            <h1 className="homePage">Home page</h1>
            <InfoCard data={data} />
        </>
    )
}
