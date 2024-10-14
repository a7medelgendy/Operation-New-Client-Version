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
              <h6 className='fw-bolder my-3'>Mission</h6>
              <div className='fw-normal'>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio deleniti est ipsam eum reiciendis enim, reprehenderit accusamus sunt numquam. Dolores!</p>
              </div>
            </div>
          </div>
          <div className='col-md-3 gx-5'>
            <div className='team'>
              <h6 className='fw-bolder my-3'>Vision</h6>
              <div>
                <p className='fw-normal'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio deleniti est ipsam eum reiciendis enim, reprehenderit accusamus sunt numquam. Dolores!</p>
              </div>
            </div>
          </div>
          <div className='col-md-3 gx-5'>
            <div className='team'>
              <h6 className='fw-bolder my-3'>Mansour</h6>
              <div className='fw-normal'>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio deleniti est ipsam eum reiciendis enim, reprehenderit accusamus sunt numquam. Dolores!</p>
              </div>
            </div>
          </div>
          <div className='col-md-3 gx-5'>
            <div className='team'>
              <h6 className='fw-bolder my-3'>Designed & Developed</h6>
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
