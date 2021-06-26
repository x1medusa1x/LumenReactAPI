import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
const Nav = (props) => {

  const logout = e => {
    axios.post('logout').then(
      res => {
        localStorage.clear();
      },
      err =>{
        console.log(err);
      }
    )
  }

  let buttons;
  if(props.user){
    buttons = (
      <ul className = "navbar-nav me-auto mb-2 mb-md-0">
        <li className = "nav-item active">
          <Link to={'/'} onClick={logout} className = "nav-link">Logout</Link>
        </li>
      </ul>
    );
    return(
          <nav className="navbar navbar-expand-md navbar bg-light mb-4">
            <div className="container-fluid">
              <h2 className="navbar-brand" >Hello {props.user.name} !</h2>
                <div>
                {buttons}
                </div>
            </div>
          </nav>


    );
  }


};

export default Nav;
