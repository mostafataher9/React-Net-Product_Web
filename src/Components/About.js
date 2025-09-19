import {Navbar} from './Navbar'; // Assuming you have a Navbar component
import {Helmet} from 'react-helmet';
import React from "react";
import './Navbar.css';
export function About({page}){
    const team=[
       { name: "Ali", role: "CEO", bio: "Founder and CEO of the company" },
       { name: "Bob", role: "CTO", bio: "Chief Technology Officer" },
       { name: "Jad", role: "Designer", bio: "Lead Designer" }
    ];
    function TeamMembers() {
        return (
            <ul>
                {team.map(member => (
                    <li key={member.name}>
                        <h3>{member.name}</h3>
                        <p><strong>Role:</strong> {member.role}</p>
                        <p>{member.bio}</p>
                    </li>
                ))}
            </ul>
        );
    }

    return (
     <div style={{ padding: '2rem' }}>
        <section>
         <Helmet>     
                      <title>{page?.titleTag || 'About Us'}</title>
                      <meta name="description" content={page?.metaDescription || 'Learn more about our company'} />
                      <meta name="keywords" content={page?.metaKeywords || 'about, company, story'} />
                      <link rel="icon" type="image/png" href="/react-crash-course/src/my-admin-panel/public/product_shop_icon.png" />
         </Helmet>

          <Navbar showFilter={false} />

        </section>
        <section>
            <h2>Our Story</h2>
            <p>Founded in 2020, we have been committed to delivering quality products ever since.</p>
        </section>

        <section>
            <h2>Our Mission</h2>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li>✅ <strong>Innovation</strong>: Push boundaries</li>
                <li>✅ <strong>Quality</strong>: Build with care</li>
            </ul>
        </section>

        <section>
            <h2>Our Team Members</h2>
            <TeamMembers />
        </section>
     </div>
    );
   }