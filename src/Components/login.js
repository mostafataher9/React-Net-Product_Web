import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Export Users array to be used in other components
export const Users = [
    {
        id: 1,
        role: "admin",
        username: "mhmd",
        email: "mhmd@gmail.com",
        password: "ad123"
    },
    {
        id: 2,
        role: "editor",
        username: "samer",
        email: "samer@gmail.com",
        password: "samer456"
    },
    {
        id: 3,
        role: "user",
        username: "mahmoud",
        email: "mahmoud@gmail.com",
        password: "mahmoud456"
    },
    {
        id: 4,
        role: "user",
        username: "kot",
        email: "kot@gmail.com",
        password: "kot123"
    }
];

export function Login(){
    const navigate = useNavigate();

    const [DataForm, setDataForm] = useState({
        user: '',
        name: '',
        email: '',
        password: ''
    });
    const [submitStatus, setSubmitStatus] = useState(null);

    var userWithCorrectPassword = null;

    var userWithSameRoleAndName = null;

    const handleChange = (event) => {
        //here name and value are name and value of input that catched
        const { name, value } = event.target;
        setDataForm((prev) => ({ ...prev, [name]: value }));
    }
    const handleLogin = async(event) => {
        event.preventDefault();
        try {
            // Find user by role, username, email, and password
            const matchedUser = Users.find(
                u => u.role === DataForm.user &&
                     u.username === DataForm.name &&
                     u.email === DataForm.email &&
                     u.password === DataForm.password
            );
            if (matchedUser) {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        console.log("Login successful");
                        resolve();
                    }, 3000);
            });
                setSubmitStatus('success');
                // mark authenticated and go to app
                localStorage.setItem('auth', 'true');
                navigate('/', { replace: true });
                setDataForm({
                    user: '',
                    name: '',
                    email: '',
                    password: ''
                });
            } else {
                // Check if there's a user with the same role and username
                userWithSameRoleAndName = Users.find(
                    u => u.role === DataForm.user && u.username === DataForm.name
                );
                
                if (!userWithSameRoleAndName) {
                    setSubmitStatus('error');
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            console.log("Username not found for this role");
                            setSubmitStatus(null);
                            resolve();
                        }, 3000);
                    });
                } else {
                    // Username exists for role, check password
                    userWithCorrectPassword = Users.find(
                        u => u.role === DataForm.user && 
                             u.username === DataForm.name && 
                             u.password === DataForm.password
                    );
                    
                    if (!userWithCorrectPassword) {
                        setSubmitStatus('error');
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                console.log("Incorrect password");
                                setSubmitStatus(null);
                                resolve();
                            }, 3000);
                        });
                    }
                }
            }
        } catch (error) {
            console.error("Login failed:", error);
            setSubmitStatus('error');
        }
    };
    return(
        <section className="min-vh-100 d-flex align-items-center justify-content-center py-4">
            <div className="container d-flex align-items-center justify-content-center">
                <div className="w-100" style={{ maxWidth: '640px' }}>
                    <div className="card shadow">
                        <div className="card-body p-4">
                            {/* need to change values of user, name, email, password so I need value dataform */}
                            <div>
                                 {submitStatus === 'success' && (
                                    <div className="alert alert-success">
                                        {"The login succeeded"}
                                    </div>
                                )}
                                {submitStatus === 'error' && (!userWithSameRoleAndName) && (
                                    <div className="alert alert-danger">
                                        {"Username not found for this role"}
                                    </div>
                                )}
                                {submitStatus === 'error' && (!userWithCorrectPassword) && (
                                    <div className="alert alert-danger">
                                        {"Incorrect password"}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-center mb-4">Login</h2>
                            <form onSubmit={handleLogin} className="mb-0">
                                <div className="mb-3">
                                    <label htmlFor="user" className="form-label">Role</label>
                                    {/*for sure onChange={handleChange} and value are made on select not on options */} {/*it is required */}
                                    <select id="user" name="user" className="form-select" value={DataForm.user} onChange={handleChange} required>
                                        <option value="" disabled>Select role</option> {/*disabled can't be selected */}
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="Editor">Editor</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Username</label>
                                    <input type="text" id="name" name="name" className="form-control" value={DataForm.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" id="email" name="email" className="form-control" value={DataForm.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" id="password" name="password" className="form-control" value={DataForm.password} onChange={handleChange} required />
                                </div>
                                <button className="btn btn-primary" type="submit">Login</button>
                                <div className="mt-3">
                                    <small>Don&apos;t have an account? <Link to="/signup">Sign up</Link></small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}