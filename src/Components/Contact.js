import {Navbar} from './Navbar'; // Assuming you have a Navbar component
import React from 'react';
import { useState } from 'react';
export function Contact() {
 
     function ContactForm() {
        // 1st method: Controlled Components
        const [dataForm, setDataForm] = useState({
            name: "",
            email: "",
            message: ""
        });
        /* 2nd method: Uncontrolled Components
        const [inputName, setInputName] = React.useState("");
        const [inputEmail, setInputEmail] = React.useState("");
        const [inputMessage, setInputMessage] = React.useState("");
        */
        const [isEditing, setIsEditing] = React.useState(true);
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [submitStatus, setSubmitStatus] = React.useState(null);
        const [deleteStatus, setDeleteStatus] = React.useState(null);
        const handleChange = (event) => {
            const { name, value } = event.target;
            setDataForm((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
        const handleSubmit = async (event) => {
            event.preventDefault();
            setIsSubmitting(true);
            try{
                  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a network request
                  console.log("Form submitted:", dataForm);
                  setSubmitStatus('success');
                  alert(`Thank you ${dataForm.name}, your message has been sent!`);
                  setDataForm({
                      name: "",
                      email: "",
                      message: ""
                  });
                } catch (error) {
                  setSubmitStatus('Error');
                  console.error("Error submitting form:", error);
                  alert("There was an error submitting your message. Please try again later.");
              }
                finally{
                  setIsSubmitting(false);
                  setIsEditing(false); // Reset the editing state
                }
            }
        

        const handleEdit = () => {
            setIsEditing(true);
            setSubmitStatus(null); // Reset submit status when editing
        }

        const handleDelete= ()=> { 
             if (window.confirm('Are you sure you want to delete this message?')) {
                    setDataForm({
                        name: "",
                        email: "",
                        message: ""
                    });
                    setIsEditing(false);
                    const alertBox = document.getElementById("customAlert");
                    alertBox.classList.add("alert", "alert-success");
                    alertBox.textContent = "Your message has been deleted successfully!";

                    setTimeout(() => {
                        alertBox.classList.remove("alert", "alert-success");
                        alertBox.textContent = "";

                    }, 1000); // Clear the alert after 1 second
                    setDeleteStatus('success');
                }
        }



        return (
        <div className="container my-4 row justify-content-center col-md-8 col-lg-6 card shadow card-body p-4 card-title text-center mb-4">
            <div>
                {submitStatus &&  (  <div className={`alert alert-${[...submitStatus]}`} role="alert">
                    {submitStatus === 'success' ? 'Your message has been sent successfully!' : 'There was an error sending your message.'}
                </div>)}
            </div>
            <div>
                {deleteStatus &&  (  <div className={`alert alert-${[...deleteStatus]}`} role="alert">
                    {deleteStatus === 'success' ? 'Your message has been deleted successfully!' : 'There was an error sending your message.'}
                </div>)}
            </div>
            <div className="container mt-4">
            {isEditing ? (
                <form onSubmit={handleSubmit} className="mb-4">
                    {/*the messages can be submitted, edited or deleted */}
                        <div className="form-group mb-3">   
                            <label htmlFor="name" className="form-control">Name:</label>
                            <input type="text" id="name" name="name" className="form-control" value={dataForm.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-control">Email:</label>
                            <input type="email" id="email" name="email" className="form-control" value={dataForm.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="message" className="form-control">Message:</label>
                            <textarea id="message" name="message" rows= "5" className="form-control" value={dataForm.message} onChange={handleChange} required></textarea>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary" type="submit" aria-label="Submit" disabled={isSubmitting}>
                            {isSubmitting ? 
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting...
                            </>
                            : 
                            "Submit"}</button>
                        </div>
                    </form>
            ) : (
                <>
                    <div className="mb-3">
                        <h5> Name </h5>
                        <p className="p-2 border rounder bg-light">{dataForm.name || "No name provided"}</p>
                    </div>
                    <div className="mb-3">
                    
                        <h5>Email</h5>
                        <p className="p-2 border rounder bg-light">{dataForm.email || "No email provided"}</p>
                    </div>
                               <div className="mb-3">
                    
                        <h5>Email</h5>
                        <p className="p-2 border rounder bg-light">{dataForm.message || "No message provided"}</p>
                    </div>
                    <div className="mt-2 d-flex gap-2">
                        <button className="btn btn-outline-warning" aria-label="Edit" onClick={handleEdit}>
                            Edit
                        </button> 
                         <div id="customAlert" className="custom-alert"></div>
                         <button className="btn btn-outline-danger" aria-label="Delete" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </>
            )}
            </div>
            </div>
        );
  }
  return(
    <div style={{ padding: '2rem' }}>
        <section>
                <Navbar />
        </section>
        <section>
            <h2>Contact Us</h2>
            <ContactForm />
        </section>
    </div>
  );
}
