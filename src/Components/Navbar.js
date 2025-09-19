import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "./Navbar.css";
import { ProductFilter } from "./ProductFilter";
export function Navbar({ onApplyFilters, showFilter = true }) {
   const [open, setOpen] = useState(false);
   return (
      <nav className="navbar">
         <button className="navbar-line" id="navbar-line" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
         </button>

          <div className="navbar-filter">
                     {showFilter ? <ProductFilter placeholder="Search…" onApply={onApplyFilters} /> : <div style={{ height: '40px' }}></div>}
            </div>
         {/* Use a list for semantics; flex lays items horizontally */}
         <ul className={`navbar-menu ${open ? 'active' : ''}`} id="navbar-menu">
            <li>
               <NavLink to="/" className={({ isActive }) => isActive ? 'link active' : 'link'}>Home</NavLink>
            </li>
            <li>
               <NavLink to="/about" className={({ isActive }) => isActive ? 'link active' : 'link'}>About</NavLink>
            </li>
            <li>
               <NavLink to="/contact" className={({ isActive }) => isActive ? 'link active' : 'link'}>Contact</NavLink>
            </li>
             <li>
               <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'link active' : 'link'}>Dashboard</NavLink>
            </li>
            <li>
               <NavLink to="/admin" className={({ isActive }) => isActive ? 'link active' : 'link'}>Admin</NavLink>
            </li>
         </ul>
        </nav>
   );
}
