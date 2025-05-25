import React from 'react';

function Soon() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: '#74abb4',
            color: '#222',
            fontFamily: 'Oswald, sans-serif',
        }}>
            <h1 style={{ fontSize: '3rem', margin: 0 }}>Coming Soon!</h1>
            <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>This project will be available soon. Stay tuned!</p>
        </div>
    );
}

export default Soon;