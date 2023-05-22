// import { React, useContext, useState, useEffect } from 'react'
import { React, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-new.png';

// import { UserContext } from '../../App'

const Navbar = (props) => {
    // const { state, dispatch } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    
    const [status, setStatus] = useState(false);
    useEffect(()=>{
        const check_login = localStorage.getItem('user_login');
        if(check_login){
            setStatus(true);
          }else{
            setStatus(false);
          }
    },[])

    const NavMenu = () => {
        if (status) {
            return (
                <>
                    <li className="nav-item mx-1 active " >
                        <NavLink className="nav-link text-light" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item mx-1">
                        <NavLink className="nav-link text-light" to="/about">My Profile</NavLink>
                    </li>
                    <li className="nav-item mx-1">
                        <NavLink className="nav-link text-light" to="/view_users">Users</NavLink>
                    </li>
                    {/* <li className="nav-item mx-1">
                        <NavLink className="nav-link text-light" to="/messages">Messages</NavLink>
                    </li> */}
                    {/* <li className="nav-item mx-1">
                        <NavLink className="nav-link text-light" to="/contact">Support</NavLink>
                    </li> */}
                    <li className="nav-item mx-1">
                        <NavLink className="fs-6 text-decoration-none" to="/logout"><button className='rounded btn-grad text-light w-100'>Logout</button></NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item mx-1 active">
                        <NavLink className="nav-link text-light" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item mx-1">
                        <NavLink className="nav-link text-light" to="/view_users">Users</NavLink>
                    </li>
                    <li className="nav-item mx-1">
                        <NavLink className="nav-link text-light" to="/contact">Support</NavLink>
                    </li>
                    <li className="nav-item mx-1">
                        <NavLink className="fs-6 text-decoration-none" to="/login"><button className='rounded btn-grad text-light w-100'>Login</button></NavLink>
                    </li>
                    <li className="nav-item ms-1">
                        <NavLink className="fs-6 text-light text-decoration-none" to="/register"><button className='rounded btn-grad text-light w-100'>Register</button></NavLink>
                    </li>
                </>
            )
        }
    }

    return (
        <>
            <nav className={`navbar navbar-expand-lg`}>
                <div className="container py-2">
                    <div className="row w-100">
                        <div className="col-12 col-md-4 logo">
                            <NavLink className="navbar-brand" to="/"><img src={logo} alt="logo" className='w-25 rounded site_logo' /></NavLink>
                        </div>
                        <div className="col-12 col-md-8 d-flex justify-content-end flex-wrap">
                            {/* <button className="navbar-toggler bg-light py-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse pc-mennu" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto">
                                    <NavMenu />
                                </ul>
                            </div> */}

                            <button className="navbar-toggler bg-light py-2" onClick={handleToggle}><span className="navbar-toggler-icon"></span></button>

                            <div className="pc-menu">
                                {isOpen ||
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav ms-auto">
                                            <NavMenu />
                                        </ul>
                                    </div>
                                }
                            </div>
                            <div className="dropdowm-mobile-menu col-12">
                                {isOpen &&
                                    <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                                        <ul className="navbar-nav ms-auto">
                                            <NavMenu />
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>


                </div>
            </nav>
        </>
    )
}

export default Navbar
