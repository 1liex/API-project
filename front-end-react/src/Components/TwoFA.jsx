import { useState } from "react";

export default function TwoFA({ setUserLogin, setShowTfa, checkLogin }) {
  const [vCode, setVcode] = useState("")
  async function Verification(v) {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ Verification: v })
    })

    const data = await res.json()
    if (data.msg === "log in successful") {
      setUserLogin(true)
      setShowTfa(false)
      checkLogin()
      window.location.reload()
    }
  }
  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); Verification(vCode) }} className="tfa-form">
        <input type="text" className="tfa-input" onChange={(e) => setVcode(e.target.value)} placeholder="Enter the verification code" />
        <button type="subit" className="navBtn">Submit</button>
      </form>
    </>
  )
}
