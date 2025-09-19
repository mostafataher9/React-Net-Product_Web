import { Outlet, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React from "react";
import "../../Components/Navbar.css";
export function AdminLayout(){
       return (
              <>
                        <nav className="navbar">
                           {/* Navigation menu at the top */}
                           <ul className="navbar-menu active" id="navbar-menu">
                              <li>
                                 <NavLink to="/" className={({ isActive }) => isActive ? 'link active' : 'link'}>Home</NavLink>
                              </li>
                              <li>
                                 <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'link active' : 'link'}>Dashboard</NavLink>
                              </li>
                              <li>
                                 <NavLink to="/admin/activities" className={({ isActive }) => isActive ? 'link active' : 'link'}>Activities</NavLink>
                              </li>
                              <li>
                                 <NavLink to="/admin/settings" className={({ isActive }) => isActive ? 'link active' : 'link'}>Settings</NavLink>
                              </li>
                           </ul>
                        </nav>
                        <main>
                              <Outlet />
                        </main>
                        
            </>
      );
}
