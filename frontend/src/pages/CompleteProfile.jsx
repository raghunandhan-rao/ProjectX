// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';
// // import styles from '../styles/Auth.module.css';
// // import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// // import { auth } from '../components/firebase';

// // const interestOptions = ["dance", "sports", "music", "art", "technology", "travel", "food", "fashion", "gaming", "reading"];

// // function CompleteProfile() {
// //     const { currentUser, refreshUserProfile } = useAuth();
// //     const navigate = useNavigate();
// //     const [formData, setFormData] = useState({
// //         gender: '',
// //         selectedInterests: [],
// //     });
// //     const [kycImageFile, setKycImageFile] = useState(null);
// //     const [phone, setPhone] = useState('');
// //     const [otp, setOtp] = useState('');
// //     const [confirmationResult, setConfirmationResult] = useState(null);
// //     const [otpSent, setOtpSent] = useState(false);
// //     const [phoneVerified, setPhoneVerified] = useState(false);
// //     const [loading, setLoading] = useState(false);
    
// //     // Use a ref to hold the reCAPTCHA instance to prevent re-initialization
// //     const recaptchaVerifierRef = useRef(null);

// //     // Initialize reCAPTCHA verifier only once
// //     useEffect(() => {
// //         if (!recaptchaVerifierRef.current) {
// //             recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
// //                 'size': 'invisible',
// //             });
// //         }
// //     }, []);

// //     const handleImageSelect = (e) => {
// //         setKycImageFile(e.target.files[0]);
// //     };

// //     const handlePhoneSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         try {
// //             const formattedPhoneNumber = `+${phone}`;
// //             const appVerifier = recaptchaVerifierRef.current;
// //             const result = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
// //             setConfirmationResult(result);
// //             setOtpSent(true);
// //             toast.success("OTP sent to your phone!");
// //         } catch (error) {
// //             toast.error("Failed to send OTP. Please check the number and try again.");
// //             console.error("Firebase OTP Error:", error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleOtpSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         try {
// //             await confirmationResult.confirm(otp);
// //             setPhoneVerified(true);
// //             toast.success("Phone number verified!");
// //         } catch (error) {
// //             toast.error("Invalid OTP. Please try again.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         if (formData.selectedInterests.length < 3) {
// //             toast.error("Please select at least 3 interests.");
// //             return;
// //         }
// //         setLoading(true);

// //         try {
// //             const idToken = await currentUser.getIdToken();
            
// //             if (kycImageFile) {
// //                 const imageFormData = new FormData();
// //                 imageFormData.append('kycImage', kycImageFile);
// //                 await axios.post('http://localhost:3000/api/users/upload-kyc', imageFormData, {
// //                     headers: { 
// //                         Authorization: `Bearer ${idToken}`,
// //                         'Content-Type': 'multipart/form-data'
// //                     }
// //                 });
// //             }

// //             await axios.patch('http://localhost:3000/api/users/profile', { ...formData, phoneVerified }, {
// //                 headers: { Authorization: `Bearer ${idToken}` }
// //             });

// //             await refreshUserProfile();
// //             toast.success("Profile updated successfully!");
// //             navigate('/profile');

// //         } catch (error) {
// //             toast.error(error.response?.data?.message || "Failed to update profile.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
    
// //     return (
// //         <div className={styles.container}>
// //             <h2 className={styles.title}>Complete Your Profile</h2>
            
// //             {/* This div is essential for the invisible reCAPTCHA */}
// //             <div id="recaptcha-container"></div>

// //             <form onSubmit={handleSubmit} className={styles.form}>
// //                 {/* ... other form inputs ... */}
// //                 <label>KYC Photo (Optional)</label>
// //                 <input type="file" onChange={handleImageSelect} className={styles.inputField} />
// //                 <select
// //                     className={styles.inputField}
// //                     value={formData.gender}
// //                     onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
// //                 >
// //                     <option value="">Select Gender (Optional)</option>
// //                     <option value="male">Male</option>
// //                     <option value="female">Female</option>
// //                     <option value="other">Other</option>
// //                 </select>
// //                 <div className={styles.interestGrid}>
// //                     <h3>Your Interests (Select at least 3)</h3>
// //                     {interestOptions.map(interest => (
// //                         <div key={interest}>
// //                             <input
// //                                 type="checkbox"
// //                                 id={interest}
// //                                 value={interest}
// //                                 checked={formData.selectedInterests.includes(interest)}
// //                                 onChange={() => setFormData(prev => ({ ...prev, selectedInterests: prev.selectedInterests.includes(interest) ? prev.selectedInterests.filter(i => i !== interest) : [...prev.selectedInterests, interest] }))}
// //                             />
// //                             <label htmlFor={interest}>{interest}</label>
// //                         </div>
// //                     ))}
// //                 </div>
// //                 <button type="submit" className={styles.submitButton} disabled={loading}>
// //                     {loading ? 'Saving...' : 'Save and Continue'}
// //                 </button>
// //             </form>

// //             <div className={styles.form} style={{marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px'}}>
// //                 {phoneVerified ? (
// //                     <p style={{color: 'green', fontWeight: 'bold'}}>✓ Phone Number Verified</p>
// //                 ) : (
// //                     <form onSubmit={otpSent ? handleOtpSubmit : handlePhoneSubmit}>
// //                         <input 
// //                             type="tel" 
// //                             value={phone} 
// //                             onChange={(e) => setPhone(e.target.value)} 
// //                             placeholder="Phone with country code (e.g., 91...)" 
// //                             className={styles.inputField} 
// //                             disabled={otpSent}
// //                         />
// //                         {otpSent && (
// //                             <input 
// //                                 type="text" 
// //                                 value={otp} 
// //                                 onChange={(e) => setOtp(e.target.value)} 
// //                                 placeholder="Enter OTP" 
// //                                 className={styles.inputField} 
// //                             />
// //                         )}
// //                         <button type="submit" className={styles.submitButton} disabled={loading}>
// //                             {loading ? '...' : (otpSent ? 'Verify OTP' : 'Send OTP')}
// //                         </button>
// //                     </form>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }

// // export default CompleteProfile;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import styles from '../styles/Auth.module.css';

// const interestOptions = ["dance", "sports", "music", "art", "technology", "travel", "food", "fashion", "gaming", "reading"];

// function CompleteProfile() {
//     const { currentUser, refreshUserProfile } = useAuth();
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: '', // Add username field
//         gender: '',
//         selectedInterests: [],
//     });
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleInterestChange = (interest) => {
//         setFormData(prev => {
//             const newInterests = prev.selectedInterests.includes(interest)
//                 ? prev.selectedInterests.filter(i => i !== interest)
//                 : [...prev.selectedInterests, interest];
//             return { ...prev, selectedInterests: newInterests };
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.username) {
//             toast.error("Please enter a username.");
//             return;
//         }
//         if (formData.selectedInterests.length < 3) {
//             toast.error("Please select at least 3 interests.");
//             return;
//         }
//         setLoading(true);
//         try {
//             const idToken = await currentUser.getIdToken();
//             await axios.patch(
//                 'http://localhost:3000/api/users/profile',
//                 formData,
//                 { headers: { Authorization: `Bearer ${idToken}` } }
//             );
//             await refreshUserProfile();
//             toast.success("Profile created successfully!");
//             navigate('/profile');
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to update profile.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <h2 className={styles.title}>Complete Your Profile</h2>
//             <form onSubmit={handleSubmit} className={styles.form}>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Choose a Username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     className={styles.inputField}
//                     required
//                 />
//                 <select
//                     name="gender"
//                     className={styles.inputField}
//                     value={formData.gender}
//                     onChange={handleChange}
//                 >
//                     <option value="">Select Gender (Optional)</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                 </select>

//                 <div style={{textAlign: 'left'}}>
//                     <h3 style={{marginBottom: '1rem'}}>Select at least 3 interests:</h3>
//                     {interestOptions.map(interest => (
//                         <div key={interest}>
//                             <input
//                                 type="checkbox"
//                                 id={interest}
//                                 value={interest}
//                                 checked={formData.selectedInterests.includes(interest)}
//                                 onChange={() => handleInterestChange(interest)}
//                             />
//                             <label htmlFor={interest} style={{marginLeft: '0.5rem'}}>{interest}</label>
//                         </div>
//                     ))}
//                 </div>

//                 <button type="submit" className={styles.submitButton} disabled={loading}>
//                     {loading ? <div className={styles.loader} style={{height: '20px', width: '20px', borderTopColor: 'white'}}></div> : 'Save and Continue'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default CompleteProfile;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../styles/Auth.module.css';

const interestOptions = ["dance", "sports", "music", "art", "technology", "travel", "food", "fashion", "gaming", "reading"];

function CompleteProfile() {
    const { currentUser, refreshUserProfile } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        gender: '',
        selectedInterests: [],
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleInterestChange = (interest) => {
        setFormData(prev => ({
            ...prev,
            selectedInterests: prev.selectedInterests.includes(interest)
                ? prev.selectedInterests.filter(i => i !== interest)
                : [...prev.selectedInterests, interest]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username.trim()) {
            toast.error("Please enter a username.");
            return;
        }
        if (formData.selectedInterests.length < 3) {
            toast.error("Please select at least 3 interests.");
            return;
        }
        setLoading(true);
        try {
            const idToken = await currentUser.getIdToken();
            await axios.patch(
                'http://localhost:3000/api/users/profile',
                formData,
                { headers: { Authorization: `Bearer ${idToken}` } }
            );
            await refreshUserProfile();
            toast.success("Profile created successfully!");
            navigate('/profile');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>One Last Step...</h2>
            <p>Choose a unique username and select your interests to start connecting.</p>
            <form onSubmit={handleSubmit} className={styles.form} style={{marginTop: '1.5rem'}}>
                <input
                    type="text"
                    name="username"
                    placeholder="Choose a Username"
                    value={formData.username}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
                <select
                    name="gender"
                    className={styles.inputField}
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender (Optional)</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <div style={{textAlign: 'left'}}>
                    <h3 style={{marginBottom: '1rem'}}>Select at least 3 interests:</h3>
                    {interestOptions.map(interest => (
                        <div key={interest}>
                            <input
                                type="checkbox"
                                id={interest}
                                value={interest}
                                checked={formData.selectedInterests.includes(interest)}
                                onChange={() => handleInterestChange(interest)}
                            />
                            <label htmlFor={interest} style={{marginLeft: '0.5rem'}}>{interest}</label>
                        </div>
                    ))}
                </div>

                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? <div className={styles.loader}></div> : 'Save and Continue'}
                </button>
            </form>
        </div>
    );
}

export default CompleteProfile;
