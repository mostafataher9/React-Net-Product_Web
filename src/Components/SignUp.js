import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function SignUp(){
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', user: '' });
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // TODO: call your backend signup API here
            await new Promise((r) => setTimeout(r, 700));
            setStatus('success');
            // mark registered and go to login
            localStorage.setItem('registered', 'true');
            navigate('/login', { replace: true });
        } catch (err) {
            setStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    return(
           <section className="min-vh-100 d-flex align-items-center justify-content-center py-4">
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
        </section>
    );
}