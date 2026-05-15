import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Home() {
    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchArtists();
        fetchSongs();
    }, []);

    const fetchArtists = async () => {
        try {
            const response = await api.get('/artists');
            setArtists(response.data);
        } catch (err) {
            navigate('/login');
        }
    };

    const fetchSongs = async () => {
        try {
            const response = await api.get('/songs');
            setSongs(response.data);
        } catch (err) {
            navigate('/login');
        }
    };

    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <div style={styles.navbar}>
                <h1 style={styles.logo}>SOUNDIFY</h1>
                <button style={styles.logoutBtn} onClick={logout}>
                    Odhlásiť sa
                </button>
            </div>

            <div style={styles.content}>
                {/* Umelci */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Umelci</h2>
                    <div style={styles.grid}>
                        {artists.map(artist => (
                            <div key={artist.id} style={styles.card}>
                                <div style={styles.artistIcon}>🎤</div>
                                <p style={styles.cardTitle}>{artist.name}</p>
                                <p style={styles.cardSubtitle}>{artist.genre}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skladby */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Skladby</h2>
                    {songs.map(song => (
                        <div
                            key={song.id}
                            style={{
                                ...styles.songRow,
                                backgroundColor: currentSong?.id === song.id ? '#eff6ff' : 'white'
                            }}
                            onClick={() => playSong(song)}
                        >
                            <div style={styles.songInfo}>
                                <p style={styles.songTitle}>{song.title}</p>
                                <p style={styles.songDuration}>
                                    {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}
                                </p>
                            </div>
                            <button style={styles.playBtn}>
                                {currentSong?.id === song.id && isPlaying ? '⏸' : '▶'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Audio Player */}
            {currentSong && (
                <div style={styles.player}>
                    <audio
                        ref={audioRef}
                        src={currentSong.audioUrl}
                        autoPlay
                        onEnded={() => setIsPlaying(false)}
                    />
                    <div style={styles.playerInfo}>
                        <p style={styles.playerTitle}>{currentSong.title}</p>
                    </div>
                    <button style={styles.playerBtn} onClick={togglePlay}>
                        {isPlaying ? '⏸ Pauza' : '▶ Prehrať'}
                    </button>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f0f4ff',
        display: 'flex',
        flexDirection: 'column',
    },
    navbar: {
        backgroundColor: 'white',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    logo: {
        color: '#2563eb',
        margin: 0,
        fontSize: '24px',
        letterSpacing: '2px',
    },
    logoutBtn: {
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#ef4444',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    content: {
        padding: '32px',
        flex: 1,
        paddingBottom: '100px',
    },
    section: {
        marginBottom: '32px',
    },
    sectionTitle: {
        color: '#1e293b',
        marginBottom: '16px',
    },
    grid: {
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        width: '150px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        cursor: 'pointer',
    },
    artistIcon: {
        fontSize: '40px',
        marginBottom: '8px',
    },
    cardTitle: {
        color: '#1e293b',
        fontWeight: 'bold',
        margin: '4px 0',
        fontSize: '14px',
    },
    cardSubtitle: {
        color: '#64748b',
        margin: 0,
        fontSize: '12px',
    },
    songRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '8px',
        cursor: 'pointer',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    },
    songInfo: {
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
    },
    songTitle: {
        color: '#1e293b',
        margin: 0,
        fontWeight: '500',
    },
    songDuration: {
        color: '#64748b',
        margin: 0,
        fontSize: '14px',
    },
    playBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#2563eb',
    },
    player: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
    },
    playerInfo: {
        flex: 1,
    },
    playerTitle: {
        color: '#1e293b',
        margin: 0,
        fontWeight: 'bold',
    },
    playerBtn: {
        padding: '10px 24px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#2563eb',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
};

export default Home;