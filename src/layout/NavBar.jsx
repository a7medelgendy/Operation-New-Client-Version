import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import user from '../shared/user';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function NavBar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [activePage, setActivePage] = React.useState(''); // State to track active page
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogOut = () => {
    user.logout();
    navigate('/');
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onToggleSidebar();
  };

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{user.userData.USER_NAME}</MenuItem>
      <MenuItem onClick={handleMenuClose}>Reset Password</MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size='large' aria-label='account of current user' aria-controls='primary-search-account-menu' aria-haspopup='true' color='inherit'>
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton size='large' edge='start' color='inherit' aria-label={isSidebarOpen ? 'hide sidebar' : 'show sidebar'} sx={{ mr: 2 }} onClick={handleToggleSidebar}>
            {isSidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Box sx={{ display: 'flex', mr: 2 }}>
            {!user.hasGroup('limit') && (
              <>
                <Button
                  sx={{
                    mr: 1,
                    fontSize: '1.1rem',
                    fontFamily: 'amiri !important',
                    color: activePage === 'about' ? '#ffffff' : '#b0bec5',
                    borderBottom: activePage === 'about' ? '4px solid #e53935' : 'none',
                    '&:hover': {
                      color: activePage === 'about' ? '#ffffff' : 'inherit'
                    }
                  }}
                  component={Link}
                  to='/app/about-us'
                  color='inherit'
                  onClick={() => handlePageClick('about')}
                >
                  About Project
                </Button>

                <Button
                  sx={{
                    mr: 1,
                    fontSize: '1.05rem',
                    fontFamily: 'amiri !important',
                    color: activePage === 'work-orders' ? '#ffffff' : '#b0bec5',
                    borderBottom: activePage === 'work-orders' ? '4px solid #e53935' : 'none',
                    '&:hover': {
                      color: activePage === 'work-orders' ? '#ffffff' : 'inherit'
                    }
                  }}
                  component={Link}
                  to='/app/work-orders' // Added route for consistency
                  color='inherit'
                  onClick={() => handlePageClick('work-orders')}
                >
                  Work Orders
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size='large' aria-label='show 1 new mails' color='inherit'>
              <Badge badgeContent={1} color='error'>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size='large' aria-label='show 1 new notifications' color='inherit'>
              <Badge badgeContent={1} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size='large' edge='end' aria-label='account of current user' aria-controls={menuId} aria-haspopup='true' onClick={handleProfileMenuOpen} color='inherit'>
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size='large' aria-label='show more' aria-controls={mobileMenuId} aria-haspopup='true' onClick={handleMobileMenuOpen} color='inherit'>
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
