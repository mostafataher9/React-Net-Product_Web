import {Navbar} from './Navbar'; // Assuming you have a Navbar component
export function About(){
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
            <Navbar />
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