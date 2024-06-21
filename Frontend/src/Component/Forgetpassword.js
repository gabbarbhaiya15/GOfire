import React, { useState } from 'react';
import axios from 'axios';
import '../Css/Forgetpassword.css';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://gofirebackend.onrender.com/forgetpassword', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="forget-password-container">
            <h2 className="forget-password-title">Forget Password</h2>
            <form className="forget-password-form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="forget-password-input"
                    required 
                />
                <button className="forget-password-button" type="submit">Submit</button>
            </form>
            {message && <p className="forget-password-message">{message}</p>}
        </div>
    );
};

export default ForgetPassword;
