import { useState } from "react"


export default function Login({ setShowTfa }) {
    const [un, setUn] = useState("")
    const [pw, setPw] = useState("")


    async function login(username, password) {
        if (un === "" || pw === "") {
            alert("no empty")
            return
        }

        const res = await fetch("http://127.0.0.1:5000/tfa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password })
        })
        const data = await res.json()

        if (data.msg === "Verification code has been sent") {
            alert(data.msg)
            setShowTfa(true)
        } else {
            alert(data.msg)
        }

    }

    const [showPw, setShowPw] = useState("password")
    return (

        <>
            <form onSubmit={(e) => { e.preventDefault(); login(un, pw) }}>
                <h2>Log In</h2>
                <div className="label">
                    <label>Username:</label>
                    <input type="text" className="login-username" placeholder="Enter user name" onChange={(e) => setUn(e.target.value)} />
                </div>
                <div className="label">
                    <label>Password:</label>
                    <input type={showPw} className="login-password" placeholder="Enter password" onChange={(e) => setPw(e.target.value)} />
                </div>
                <div className="showPw">
                    <input type="checkbox" className="chack" onChange={() => showPw === "password" ? setShowPw("text") : setShowPw("password")} />
                    <p>Show password</p>

                </div>
                <button type="submit" className="login-btn">Submit</button>
            </form>
        </>
    )
}
