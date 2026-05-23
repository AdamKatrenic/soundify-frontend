import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (err) {
            setError('Nesprávne meno alebo heslo!');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.logo}>Soundify</h1>
                <h2 style={styles.title}>Prihlásiť sa</h2>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                
                <input
                    style={styles.input}
                    placeholder="Heslo"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button style={styles.button} onClick={handleLogin}>
                    Prihlásiť sa
                </button>
                <p style={styles.link} onClick={() => navigate('/register')}>
                    Nemáš účet? Registruj sa.
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f4ff',
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
    },
    logo: {
        color: '#2563eb',
        textAlign: 'center',
        margin: 0,
        fontSize: '28px',
        fontWeight: 'bold',
        letterSpacing: '2px',
    },
    title: {
        color: '#1e293b',
        textAlign: 'center',
        margin: 0,
        fontSize: '18px',
    },
    input: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        fontSize: '16px',
        outline: 'none',
    },
    button: {
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#2563eb',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    error: {
        color: '#ef4444',
        textAlign: 'center',
        margin: 0,
        fontSize: '14px',
    },
    link: {
        color: '#2563eb',
        textAlign: 'center',
        cursor: 'pointer',
        margin: 0,
        fontSize: '14px',
    },
};

export default Login;