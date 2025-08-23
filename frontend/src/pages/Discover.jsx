// // import React, { useState, useEffect } from 'react';
// // import { useAuth } from '../contexts/AuthContext';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';
// // import styles from '../styles/Auth.module.css'; // Reusing styles for consistency

// // function Discover() {
// //     const { currentUser } = useAuth();
// //     const [suggestions, setSuggestions] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         const fetchSuggestions = async () => {
// //             if (!currentUser) return;
// //             try {
// //                 const idToken = await currentUser.getIdToken();
// //                 const response = await axios.get(
// //                     'http://localhost:3000/api/users/suggestions',
// //                     { headers: { Authorization: `Bearer ${idToken}` } }
// //                 );
// //                 setSuggestions(response.data);
// //             } catch (error) {
// //                 toast.error(error.response?.data?.message || 'Could not fetch suggestions.');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchSuggestions();
// //     }, [currentUser]);

// //     const handleSendRequest = (userId) => {
// //         // We will implement this logic in the next step
// //         toast.info(`Friend request functionality to be added for user: ${userId}`);
// //     };

// //     if (loading) {
// //         return <div className={styles.container}><p>Finding new friends for you...</p></div>;
// //     }

// //     return (
// //         <div className={styles.container}>
// //             <h1 className={styles.title}>Discover New People</h1>
// //             {suggestions.length > 0 ? (
// //                 <div className="suggestions-list">
// //                     {suggestions.map(user => (
// //                         <div key={user._id} className={styles.form} style={{ marginBottom: '15px', textAlign: 'left' }}>
// //                             <p><strong>{user.username}</strong> (★ {user.starRating})</p>
// //                             <p style={{ fontSize: '0.9em', color: '#666' }}>
// //                                 Common Interests: {user.commonInterests.join(', ')}
// //                             </p>
// //                             <button 
// //                                 onClick={() => handleSendRequest(user._id)} 
// //                                 className={styles.submitButton}
// //                                 style={{marginTop: '10px'}}
// //                             >
// //                                 Send Friend Request
// //                             </button>
// //                         </div>
// //                     ))}
// //                 </div>
// //             ) : (
// //                 <p>No suggestions found. Try adding more interests to your profile!</p>
// //             )}
// //         </div>
// //     );
// // }

// // export default Discover;




// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import styles from '../styles/Auth.module.css';

// function Discover() {
//     const { currentUser } = useAuth();
//     const [suggestions, setSuggestions] = useState([]);
//     const [page, setPage] = useState(1);
//     const [hasNextPage, setHasNextPage] = useState(true);
//     const [loading, setLoading] = useState(true);

//     const fetchSuggestions = useCallback(async (currentPage) => {
//         if (!currentUser) return;
//         setLoading(true);
//         try {
//             const idToken = await currentUser.getIdToken();
//             const response = await axios.get(
//                 `http://localhost:3000/api/users/suggestions?page=${currentPage}&limit=10`,
//                 { headers: { Authorization: `Bearer ${idToken}` } }
//             );
//             // Append new suggestions to the existing list
//             setSuggestions(prev => [...prev, ...response.data.suggestions]);
//             setHasNextPage(response.data.hasNextPage);
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Could not fetch suggestions.');
//         } finally {
//             setLoading(false);
//         }
//     }, [currentUser]);

//     // Fetch initial suggestions on component mount
//     useEffect(() => {
//         fetchSuggestions(1);
//     }, [fetchSuggestions]);

//     const handleLoadMore = () => {
//         const nextPage = page + 1;
//         setPage(nextPage);
//         fetchSuggestions(nextPage);
//     };

//     const handleSendRequest = (userId) => {
//         toast.info(`Friend request functionality to be added for user: ${userId}`);
//     };

//     if (loading && page === 1) {
//         return <div className={styles.container}><p>Finding new friends for you...</p></div>;
//     }

//     return (
//         <div className={styles.container}>
//             <h1 className={styles.title}>Discover New People</h1>
//             {suggestions.length > 0 ? (
//                 <div className="suggestions-list">
//                     {suggestions.map(user => (
//                         <div key={user._id} className={styles.form} style={{ marginBottom: '15px', textAlign: 'left' }}>
//                             <p><strong>{user.username}</strong> (★ {user.starRating})</p>
//                             <p style={{ fontSize: '0.9em', color: '#666' }}>
//                                 Common Interests: {user.commonInterests.join(', ')}
//                             </p>
//                             <button 
//                                 onClick={() => handleSendRequest(user._id)} 
//                                 className={styles.submitButton}
//                                 style={{marginTop: '10px'}}
//                             >
//                                 Send Friend Request
//                             </button>
//                         </div>
//                     ))}
//                     {/* "Load More" button */}
//                     {hasNextPage && (
//                         <button onClick={handleLoadMore} disabled={loading} className={styles.submitButton}>
//                             {loading ? 'Loading...' : 'Load More'}
//                         </button>
//                     )}
//                 </div>
//             ) : (
//                 <p>No suggestions found. Try adding more interests to your profile!</p>
//             )}
//         </div>
//     );
// }

// export default Discover;




import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../styles/Auth.module.css';

function Discover() {
    const { currentUser } = useAuth();
    const [suggestions, setSuggestions] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    // This effect handles the initial fetch when the component mounts
    useEffect(() => {
        const fetchInitialSuggestions = async () => {
            if (!currentUser) return;
            setLoading(true);
            try {
                const idToken = await currentUser.getIdToken();
                const response = await axios.get(
                    `http://localhost:3000/api/users/suggestions?page=1&limit=10`,
                    { headers: { Authorization: `Bearer ${idToken}` } }
                );
                // Set the initial list of suggestions, replacing any old data
                setSuggestions(response.data.suggestions);
                setHasNextPage(response.data.hasNextPage);
                setPage(1); // Ensure page count is reset
            } catch (error) {
                toast.error(error.response?.data?.message || 'Could not fetch suggestions.');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialSuggestions();
    }, [currentUser]); // Reruns only if the user changes

    // This function handles fetching subsequent pages
    const handleLoadMore = async () => {
        if (!hasNextPage || loadingMore) return;

        const nextPage = page + 1;
        setLoadingMore(true);
        try {
            const idToken = await currentUser.getIdToken();
            const response = await axios.get(
                `http://localhost:3000/api/users/suggestions?page=${nextPage}&limit=10`,
                { headers: { Authorization: `Bearer ${idToken}` } }
            );
            // Append the new suggestions to the existing list
            setSuggestions(prev => [...prev, ...response.data.suggestions]);
            setHasNextPage(response.data.hasNextPage);
            setPage(nextPage);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Could not fetch more suggestions.');
        } finally {
            setLoadingMore(false);
        }
    };

    const handleSendRequest = (userId) => {
        toast.info(`Friend request functionality to be added for user: ${userId}`);
    };

    // Show a loading indicator only for the initial page load
    if (loading) {
        return <div className={styles.container}><p>Finding new friends for you...</p></div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Discover New People</h1>
            {suggestions.length > 0 ? (
                <div className="suggestions-list">
                    {suggestions.map(user => (
                        <div key={user._id} className={styles.form} style={{ marginBottom: '15px', textAlign: 'left' }}>
                            <p><strong>{user.username}</strong> (★ {user.starRating})</p>
                            <p style={{ fontSize: '0.9em', color: '#666' }}>
                                Common Interests: {user.commonInterests.join(', ')}
                            </p>
                            <button 
                                onClick={() => handleSendRequest(user._id)} 
                                className={styles.submitButton}
                                style={{marginTop: '10px'}}
                            >
                                Send Friend Request
                            </button>
                        </div>
                    ))}
                    {/* "Load More" button, with its own loading state */}
                    {hasNextPage && (
                        <button onClick={handleLoadMore} disabled={loadingMore} className={styles.submitButton}>
                            {loadingMore ? 'Loading...' : 'Load More'}
                        </button>
                    )}
                </div>
            ) : (
                <p>No suggestions found. Try adding more interests to your profile!</p>
            )}
        </div>
    );
}

export default Discover;
