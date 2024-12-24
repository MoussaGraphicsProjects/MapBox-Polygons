import React from 'react';
import { useNavigate } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
            <header style={{ background: '#333', color: '#fff', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: 'white', margin: 0 }}>Map Polygons</h2>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }}
                    style={{ background: 'red', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}
                >
                    Log out
                </button>
            </header>
            <div style={{ display: 'flex', flex: 1 }}>
                <aside style={{ width: '200px', background: '#f4f4f4', padding: '1rem', borderRight: '1px solid #ddd' }}>
                    <h3 style={{ marginTop: '20px', fontSize: '1.2rem', color: '#333' }}>Menu</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: '0.5rem', marginLeft: '30px' }}>
                            <a style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }} href="/users">Users</a>
                        </li>
                        <li style={{ marginBottom: '0.5rem', marginLeft: '30px' }}>
                            <a style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }} href="/map">Map</a>
                        </li>
                    </ul>
                </aside>
                <main style={{ flex: 1, padding: '1rem' }}>{children}</main>
            </div>
            <footer style={{ background: '#333', color: '#fff', padding: '0', textAlign: 'center' }}>
                <h3>Mohamed Moussa</h3>
            </footer>
        </div>
    );
};

export default Layout;