import { useState, useEffect } from 'react'
import Login from './Components/Login'
import Homepage from './Components/Homepage'
import Head from './Components/Header'
import "./index.css"
import Header from './Components/Header'
import Signup from './Components/Signup'
import TwoFA from './Components/TwoFA'


export default function App() {
  const [userLogin, setUserLogin] = useState(null)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState("login")
  const [tfaShow, setTfaShow] = useState(false)

  async function getData() {
    const res = await fetch("http://127.0.0.1:5000/get_data", {
      method: "GET",
      credentials: "include"
    })

    if (res.ok) {
      const data = await res.json()
      setData(data)
      setUserLogin(true)
    } else {
      setUserLogin(false)
    }

  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <>
      <Header islogin={userLogin} setCurrentPage={setCurrentPage} setUserLogin={setUserLogin} username={data.name} />
      <section>
        {tfaShow === true && <TwoFA setUserLogin={setUserLogin} setShowTfa={setTfaShow} checkLogin={getData} />}
        {userLogin === false && currentPage === "login" && tfaShow === false && <Login setShowTfa={setTfaShow} />}
        {userLogin === false && currentPage === "signup" && tfaShow === false && <Signup setLoginForm={setCurrentPage} />}
        {userLogin === true && tfaShow === false && <Homepage data={data} />}
      </section>
    </>
  )
}


