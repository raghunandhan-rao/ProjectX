import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // This useEffect hook will run when the component mounts
    useEffect(() => {
        // Set up an interval to check the verification status every 3 seconds
        const interval = setInterval(async () => {
            if (currentUser) {
                // Reload the user's data to get the latest emailVerified status
                await currentUser.reload();
                
                // If the email is now verified, redirect the user
                if (currentUser.emailVerified) {
                    clearInterval(interval); // Stop the interval
                    toast.success("Email verified successfully! Please log in.");
                    navigate('/login'); // Redirect to the login page
                }
            }
        }, 3000); // Check every 3 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, [currentUser, navigate]); // Dependencies for the effect

    const handleResend = async () => {
        if (!currentUser) return;
        try {
            await sendEmailVerification(currentUser, {
                url: 'http://localhost:5173/profile',
            });
            toast.success('A new verification email has been sent!');
        } catch (error) {
            toast.error("Failed to resend verification email.");
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h1>Verify Your Email</h1>
            <p>A verification link has been sent to your email address:</p>
            <p><strong>{currentUser?.email}</strong></p>
            <p>Please check your inbox and click the link. This page will automatically redirect you once your email is verified.</p>
            <button onClick={handleResend} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Resend Verification Email
            </button>
        </div>
    );
}

export default VerifyEmail;