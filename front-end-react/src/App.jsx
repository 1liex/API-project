import { useState, useEffect } from 'react'
import Login from './Components/Login'
import Homepage from './Components/Homepage'
import Head from './Components/Header'
import "./index.css"
import Header from './Components/Header'
import Signup from './Components/Signup'


export default function App() {
  const [userLogin, setUserLogin] = useState(false)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState("login")

  async function getData() {
    const res = await fetch("http://127.0.0.1:5000/get_data", {
      method: "GET",
      credentials: "include"
    })

    if (res.ok) {
      const data = await res.json()
      setData(data)
      setUserLogin(true)
    }

  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <>
      <Header islogin={userLogin} setCurrentPage={setCurrentPage} setUserLogin={setUserLogin}/>
      <section>


        {!userLogin && currentPage === "login" && <Login checkLogin={getData} />}
        {!userLogin && currentPage === "signup" && <Signup checkLogin={getData}/>}
        {userLogin && <Homepage data={data} />}
      </section>
    </>
  )
}


