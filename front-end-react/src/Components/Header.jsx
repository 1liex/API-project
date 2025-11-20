
import Logout from './Logout'
export default function Header({ islogin, setCurrentPage, setUserLogin }) {

  let contetn = "";

  if (islogin === true) {
    contetn = <div>
      <button className="navBtn">Home</button>
      <button className="navBtn">About us</button>
      <Logout setUserLogin={setUserLogin}/>
    </div>
  } else {

    contetn = <div>
      <button onClick={() => setCurrentPage("login")} className="navBtn">
        Log In
      </button>
      <button onClick={() => setCurrentPage("signup")} className="navBtn">
        Sin Up
      </button>
    </div>

  }
  return (
    <>
      <header>
        <h1 className="logo">WP PROJECT</h1>
        <nav>
          {contetn}
        </nav>
      </header>
    </>
  )
}
