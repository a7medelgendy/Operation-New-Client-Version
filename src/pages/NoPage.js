import React from 'react';

const NoPage = () => {
  return (
    <div className='container vh-100 d-flex flex-column justify-content-center align-items-center'>
      <div className='text-center'>
        <h1 style={{ fontSize: '5rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page Not Found</p>
        <a
          href='/'
          style={{
            fontSize: '1.25rem',
            color: '#007bff',
            textDecoration: 'none',
            backgroundColor: '#f8f9fa',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e2e6ea'; // Lighter background on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f8f9fa'; // Original background
          }}
        >
          Back to Home
        </a>
      </div>
      <div className='mt-5 text-center'>
        <h2 style={{ fontSize: '2rem', fontWeight: '600' }}>Need Help?</h2>
        <p style={{ fontSize: '1rem' }}>
          Contact our admin for assistance:
          <br />
          <strong>Name:</strong> Ahmed
          <br />
          <strong>Email:</strong> ahmed@ANRPC.com
          <br />
          <strong>Phone:</strong> 1234
        </p>
      </div>
    </div>
  );
};

export default NoPage;
