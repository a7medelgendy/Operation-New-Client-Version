import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarButton from '../components/sidebar/SideBarButton';
import '../styles/layout/sidebar.css';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { Avatar } from '@mui/material';
import user from '../shared/user';
import cache from '../shared/cache';

export default function SideBarButtonList() {
  const navigate = useNavigate();

  const SideBarList = [
    {
      name: 'Dashboard',
      icon: <DashboardRoundedIcon style={{ marginLeft: '30px' }} />,
      callBack: (id) => {
        cache.set('activeIndex', id);
        navigate('dashboard');
      }
    },
    {
      name: 'Work Orders',
      icon: <PendingActionsIcon sx={{ fontSize: 27 }} style={{ marginLeft: '30px' }} />,
      callBack: (id) => {
        cache.set('activeIndex', id);
        navigate('shiftlog');
      }
    }
  ];

  const SideBarListComponent = SideBarList.map((ele, idx) => {
    return (
      <div className='row sidebar-button-container ' key={idx}>
        <SideBarButton id={idx} buttonName={ele.name} startIcon={ele.icon} callBack={ele.callBack} isActive={cache.get('activeIndex') === idx ? true : false} />
      </div>
    );
  });
  return (
    <div className='container-fluid p-0 d-flex flex-column justify-content-center align-items-center'>
      {SideBarListComponent}

      <div className='row sidebar-avatar-container mt-auto'>
        <div className='container-fluid d-flex align-items-center sidebar-avatr'>
          <div className='col'>
            <Avatar
              sx={{
                width: 45,
                height: 45,
                bgcolor: '#dcd189',
                color: '#323484'
              }}
            >
              {user.userData.USER_NAME.split('.')[0][0] + user.userData.USER_NAME.split('.')[1][0]}
            </Avatar>
          </div>

          <div className='col-9 mt-0 p-2 d-flex align-items-center'>
            <span style={{ color: 'rgb(255 215 6)', fontSize: '18px' }}>{user.userData.USER_NAME.split('.')[0] + ' ' + user.userData.USER_NAME.split('.')[1]}</span>
          </div>
        </div>
      </div>
      <div className='row sidebar-button-container'>
        <SideBarButton
          buttonName={'Logout'}
          startIcon={<LogoutRoundedIcon sx={{ transform: 'rotate(180deg) !important' }} style={{ marginLeft: '30px' }} />}
          callBack={() => {
            user.logout();
            navigate('/');
          }}
          isActive={false}
        />
      </div>

      {!user.hasGroup('limit') && (
        <div className='row w-100'>
          <div className='d-flex  justify-content-center align-items-center' style={{ backgroundColor: '#f0f0f0' }}>
            <span style={{ fontSize: '12px', color: '#e53935', fontWeight: 'bold' }}>Copyright © Eng. Ahmed Elgendy @ 2022</span>
          </div>
        </div>
      )}
    </div>
  );
}
