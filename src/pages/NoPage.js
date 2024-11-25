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
            e.target.style.backgroundColor = '#e2e6ea';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f8f9fa';
          }}
        >
          Back to Home
        </a>
      </div>
      <div className='mt-5'>
        <div className='text-center'>
          <h2 style={{ fontSize: '2rem', fontWeight: '600' }}>Need Help?</h2>
          <p style={{ fontSize: '1.2rem' }}>
            Contact our admin for assistance:
            <br />
          </p>
        </div>
        <div className='d-flex justify-content-center'>
          <div className='fw-normal '>
            <div>
              <i className='fa-solid fa-user' style={{ color: '#e53935', marginRight: '12px' }} />
              Eng. Ahmed Elgendy
            </div>
            <div>
              <i className='fa-solid fa-code fa-sm' style={{ color: '#e53935', marginRight: '8px' }} />
              Software Engineer
            </div>
            <div>
              <i className='fa-solid fa-phone' style={{ color: '#e53935', marginRight: '12px' }}></i>
              Tel: 5634
            </div>

            <div>
              <i className='fas fa-solid fa-mobile-alt  ' style={{ color: '#e53935', marginRight: '14px' }}></i>
              Mobile: 01212205882
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
