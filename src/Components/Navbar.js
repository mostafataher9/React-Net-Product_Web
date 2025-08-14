import {  Link } from "react-router-dom";

export function Navbar() {
   return ( 
        <nav style={{ display: 'flex', gap: '16px', listStyle: 'none', gridTemplateColumns: 'repeat(3, 1fr)' }}>
         {/*gap: Adds space between flex/grid items (external spacing)
         padding: Adds space inside an element (internal spacing)  */}
            <li>
               <Link to="/">Home</Link>
            </li>
            <li>
               <Link to="/about">About</Link>
            </li>
            <li>
               <Link to="/contact">Contact</Link>
            </li>
        </nav>
   );
}
