import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users } from './login';
//import login from './login';
export function SignUp(){
    const navigate = useNavigate();
    const [form, setForm] = useState({ user: '', name: '', email: '', password: '' });
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Helper to get last id from Users
    const getLastUserId = () => {
        if (!Users.length) return 0;
        return Math.max(...Users.map(u => u.id));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const newId = getLastUserId() + 1;
            Users.push({
                id: newId,
                role: form.user,
                username: form.name,
                email: form.email,
                password: form.password
            });
            // TODO: call your backend signup API here
            await new Promise((r) => {
                    setTimeout(() => {
                        console.log("Signup successful");
                        r();
                    }, 3000);
            });
            setStatus('success');
            // mark registered and go to login
            localStorage.setItem('registered', 'true');
            navigate('/', { replace: true });
            setForm({
                    user: '',
                    name: '',
                    email: '',
                    password: ''
                });
        } catch (err) {
            setStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    return(
     <section className="min-vh-100 d-flex align-items-center justify-content-center py-4">
        {/*card inside container in order to have the foorm layout as box */}
        <div className="container d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: '640px' }}>
                <div className="card shadow">
                  <div className="card-body p-4">
                     {/* need to change values of user, name, email, password so I need value dataform */}
                    <div>
                             
            {status && (
                <div className={`alert alert-${status === 'success' ? 'success' : 'danger'}`}>
                    {status === 'success' ? 'Signed up successfully. Please login.' : 'Signup failed.'}
                </div>
            )}
            <h2>Sign Up</h2>
            <form onSubmit={onSubmit} className="mb-0">
                <div className="mb-3">
                    <label htmlFor="user" className="form-label">Role</label>
                    <select id="user" name="user" className="form-select" value={form.user} onChange={onChange} required>
                        <option value="" disabled>Select role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="Editor">Editor</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Username</label>
                    <input id="name" name="name" className="form-control" value={form.name} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-control" value={form.email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name="password" className="form-control" value={form.password} onChange={onChange} required />
                </div>
                <button disabled={submitting} className="btn btn-primary" type="submit">
                    {submitting ? 'Signing up…' : 'Sign up'}
                </button>
                <div className="mt-3">
                    <small>Already have an account? <Link to="/login">Login</Link></small>
                </div>
                </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  
</section>
    );
}