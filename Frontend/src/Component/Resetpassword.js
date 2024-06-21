import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Css/Resetpassword.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = new URLSearchParams(location.search).get('token');
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`https://gofirebackend.onrender.com/resetpassword?token=${token}`, { password });
            setMessage(response.data.message);
            navigate('/login'); // Redirect to login page after successful reset
        } catch (error) {
            setMessage(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="reset-password-container">
            <h2 className="reset-password-title">Reset Password</h2>
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <input 
                    type="password" 
                    placeholder="Enter new password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="reset-password-input"
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Confirm new password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="reset-password-input"
                    required 
                />
                <button className="reset-password-button" type="submit">Submit</button>
            </form>
            {message && <p className="reset-password-message">{message}</p>}
        </div>
    );
};

export default ResetPassword;
