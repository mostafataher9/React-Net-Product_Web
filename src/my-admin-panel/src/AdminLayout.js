import { Outlet, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "../../Components/Navbar.css";
export function AdminLayout(){
      const [open, setOpen] = useState(false);
       return (
              <>
                        <nav className="navbar">
                           <button className="navbar-line" id="navbar-line" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
                              <span></span>
                              <span></span>
                              <span></span>
                           </button>
                           {/* Use a list for semantics; flex lays items horizontally */}
                           <ul className={`navbar-menu ${open ? 'active' : ''}`} id="navbar-menu">
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
