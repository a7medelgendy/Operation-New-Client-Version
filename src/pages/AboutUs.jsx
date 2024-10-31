import React from 'react';

export default function AboutUs() {
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='about-image  '>
              <img className='w-100 img-fluid' src={require('../assets/images/aboutus.png')} alt='about us' />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-3 gx-5'>
            <div className='team'>
              <h6 className='fw-bolder my-2'>Mission</h6>
              <div className='fw-normal'>
                <p>The maintenance application was developed in 2022 at the request of the Technology and Operations departments to manage and document the ANRPC site's requirements for regular and emergency maintenance of the units.</p>
              </div>
            </div>
          </div>
          <div className='col-md-3 gx-5'>
            <div className='team'>
              <h6 className='fw-bolder my-2'>Progress</h6>
              <div>
                <p className='fw-normal pb-2'>
                  <span className='fw-bold' style={{ color: '#e53935' }}> Version 1 </span> 
                  was designed to record all ANRPC site work orders for a limited number of employees and records. Now,<span className='fw-bold' style={{ color: '#e53935' }}>Version 2 </span> can accommodate a larger scale of records and employees and also includes statistics and a dashboard Additionally, we have enhanced security.
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-3 gx-5'>
            <div className='team'>
              <h6 className='fw-bolder my-2'>Vision</h6>
              <div className='fw-normal'>
                <p>
                  <span className='fw-bold' style={{ color: '#e53935' }}> Version 3 </span>
                  will include site documents and the complete work order cycle to help operations teams, safety teams, and execution teams make decisions quickly and securely.
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-3 gx-5'>
            <div className='team'>
              <h6 className='fw-bolder my-2'>Designed & Developed</h6>
              <div className='fw-normal'>
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
      </div>
    </>
  );
}
