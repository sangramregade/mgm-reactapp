import React from "react";
import { Link,NavLink  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link ms-5"  to="/"> <FontAwesomeIcon icon={faHome} className="me-3" /> Home</NavLink>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <Link to="/patients/add" className="btn btn-success me-5" style={{ color:'white'}}><b>ADD DATA</b></Link>
                    </form>
                </div>
            </div>
        </nav>
    );

};

export default Navbar;