// import React from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import styles from '../styles/Auth.module.css';

// function Notifications() {
//     const { currentUser, friendRequests, fetchFriendRequests } = useAuth();

//     const handleResponse = async (requestId, action) => {
//         try {
//             const idToken = await currentUser.getIdToken();
//             await axios.post(
//                 `http://localhost:3000/api/friends/${action}/${requestId}`,
//                 {},
//                 { headers: { Authorization: `Bearer ${idToken}` } }
//             );
//             toast.success(`Request ${action === 'accept' ? 'accepted' : 'rejected'}!`);
//             fetchFriendRequests(); // Refresh the list of requests
//         } catch (error) {
//             toast.error('Failed to respond to request.');
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <h1 className={styles.title}>Notifications</h1>
//             {friendRequests.length > 0 ? (
//                 friendRequests.map(req => (
//                     <div key={req._id} className={styles.form} style={{ marginBottom: '15px' }}>
//                         <p><strong>{req.from.username}</strong> (★ {req.from.starRating}) sent you a friend request.</p>
//                         <div style={{ marginTop: '10px' }}>
//                             <button onClick={() => handleResponse(req._id, 'accept')} className={styles.submitButton} style={{ marginRight: '10px' }}>
//                                 Accept
//                             </button>
//                             <button onClick={() => handleResponse(req._id, 'reject')} className={styles.submitButton} style={{ backgroundColor: '#dc3545' }}>
//                                 Reject
//                             </button>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>You have no new notifications.</p>
//             )}
//         </div>
//     );
// }

// export default Notifications;





import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../styles/Auth.module.css';

function Notifications() {
    const { currentUser, friendRequests, fetchFriendRequests } = useAuth();
    const [loadingId, setLoadingId] = useState(null);

    const handleResponse = async (requestId, action) => {
        setLoadingId(requestId);
        try {
            const idToken = await currentUser.getIdToken();
            await axios.post(
                `http://localhost:3000/api/friends/${action}/${requestId}`,
                {},
                { headers: { Authorization: `Bearer ${idToken}` } }
            );
            toast.success(`Request ${action === 'accept' ? 'accepted' : 'rejected'}!`);
            // This will refetch the list from the server, automatically removing the handled request
            fetchFriendRequests();
        } catch (error) {
            toast.error('Failed to respond to request.');
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Friend Requests</h1>
            {friendRequests.length > 0 ? (
                friendRequests.map(req => (
                    <div key={req._id} className={styles.form} style={{ marginBottom: '15px', padding: '1rem' }}>
                        <p><strong>{req.from.username}</strong> (★ {req.from.starRating}) sent you a friend request.</p>
                        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={() => handleResponse(req._id, 'accept')} 
                                className={styles.submitButton}
                                disabled={loadingId === req._id}
                            >
                                {loadingId === req._id ? '...' : 'Accept'}
                            </button>
                            <button 
                                onClick={() => handleResponse(req._id, 'reject')} 
                                className={styles.submitButton} 
                                style={{ backgroundColor: '#6c757d' }}
                                disabled={loadingId === req._id}
                            >
                                {loadingId === req._id ? '...' : 'Reject'}
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>You have no new friend requests.</p>
            )}
        </div>
    );
}

export default Notifications;
