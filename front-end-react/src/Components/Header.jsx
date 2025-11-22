
import Logout from './Logout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


function MenuOp({ setUserLogin, username, serOpenMenu }) {
  return (<div className='menu-op'>
    <p>{username}</p>
    <button className="navBtn home">Home</button>
    <button className="navBtn about">About</button>
    <Logout setUserLogin={setUserLogin} serOpenMenu={serOpenMenu} />

  </div>)
}


export default function Header({ islogin, setCurrentPage, setUserLogin, username }) {
  const [openMenu, setOpenMenu] = useState(false)

  let contetn = "";

  if (islogin === true) {
    contetn = <>
      <FontAwesomeIcon icon={faUser} className='user-icon' onClick={() => { openMenu === false ? setOpenMenu(true) : setOpenMenu(false) }} />
      {openMenu === true && <MenuOp setUserLogin={setUserLogin} username={username} serOpenMenu={setOpenMenu} />}

    </>
  } else {

    contetn = <div>
      <button onClick={() => setCurrentPage("login")} className="navBtn login">
        Log In
      </button>
      <button onClick={() => setCurrentPage("signup")} className="navBtn signup">
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
