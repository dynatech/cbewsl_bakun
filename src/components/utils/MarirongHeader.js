import React, {Fragment, useState, useEffect} from 'react';
import {
  Grid,
  IconButton,
  Typography,
  Tab,
  Tabs,
  AppBar,
  Toolbar,
  Tooltip,
  Avatar,
} from '@mui/material';
import DostSeal from '../../assets/phivolcs_seal.png';
import DynaslopeSealMini from '../../assets/dynaslope_seal_mini.png';
import benguet_provincial_seal from '../../assets/benguet_province_seal.png';
import bakun_municipal_seal from '../../assets/bakun_municipal_seal.png';
import bakun_brgy_seal from '../../assets/brgy_seal.png';
import bakun_lewc_seal from '../../assets/bak_lewc_seal.png';
import HazardMap from '../../assets/hazard_map.jpg'

import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';
import { STORAGE_URL } from '../../config';

const MarirongHeader = () => {
  let navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [server_time, setServerTime] = useState('');
  const [profilePicture] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/opcen');
        break;
      case 1:
        event.preventDefault();
        break;
      case 2:
        event.preventDefault();
        break;
      case 3:
        event.preventDefault();
        break;
      case 4:
        navigate('/events');
        break;
      default:
        navigate('/assessment');
        break;
    }
  };

  useEffect(() => {
    const data = localStorage.getItem('credentials');
    const parse_data = JSON.parse(data);
    const profile_picture = parse_data.profile.pic_path !== "" ? `${STORAGE_URL}/${parse_data.profile.pic_path}` : "";
    setImageUrl(profile_picture)
  }, []);

  useEffect(() => {
    if (profilePicture) {
      const file = URL.createObjectURL(profilePicture);
      setImageUrl(file);
    }
  }, [profilePicture]);

  const a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElCRA, setAnchorElCRA] = React.useState(null);
  const [anchorElAnalysis, setAnchorElAnalysis] = React.useState(null);
  const [anchorElGroundData, setAnchorElGroundData] = React.useState(null);
  const open = Boolean(anchorEl);
  const openCRA = Boolean(anchorElCRA);
  const openAnalysis = Boolean(anchorElAnalysis);
  const openGroundData = Boolean(anchorElGroundData);
  const openSettings = Boolean(anchorElSettings);

  const preventDefault = event => {
    event.preventDefault();
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickCRA = event => {
    setAnchorElCRA(event.currentTarget);
  };

  const handleClickAnalysis = event => {
    setAnchorElAnalysis(event.currentTarget);
  };

  const handleClickGroundData = event => {
    setAnchorElGroundData(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElCRA(null);
    setAnchorElAnalysis(null);
    setAnchorElGroundData(null);
    setAnchorElSettings(null);
  };

  const handleCurrentTab = () => {
    const path_name = window.location.pathname;
    if (path_name === '/opcen') {
      setValue(0);
    } else if (
      // path_name === '/hazard_mapping' ||
      path_name === '/cav'
    ) {
      setValue(1);
    } else if (
      path_name === '/analysis' ||
      path_name === '/rainfall' ||
      path_name === '/surficial' ||
      path_name === '/subsurface' ||
      path_name === '/earthquake'
    ) {
      setValue(2);
    } else if (
      path_name === '/surficial_markers' ||
      path_name === '/moms'
    ) {
      setValue(3);
    } else if (path_name === '/events') {
      setValue(4);
    } else {
      setValue(-1);
    }
  };

  const handleOpen = () => {
    window.open(HazardMap, '_blank');
  }

  useEffect(() => {
    handleCurrentTab()
  })

  useEffect(() => {
    setInterval(() => {
      let dt = moment().format('ddd DD-MMM-YYYY hh:mm:ss A');
      setServerTime(dt);
    }, 1000);
    
  }, []);

  return (
    <Fragment>
      <Grid container spacing={0} style={{background: 'white'}}>

      <Grid item xs={4} md={4} lg={3.5} sx={{marginTop: 1, marginBottom: 2}}>
          <div
            style={{
              textAlign: 'left',
              height: 'auto',
              width: '100%',
              marginTop: 10,
              marginLeft: 40
            }}>
            <img
              src={DostSeal}
              alt="dost-seal-png"
              style={{
                objectFit: 'contain',
                height: 75,
                width: 75,
                marginRight: 8,
              }}
            />
            <img
              src={DynaslopeSealMini}
              alt="dynaslope-seal-mini-png"
              style={{
                objectFit: 'contain',
                height: 75,
                width: 75,
                marginRight: 8,
              }}
            />
            <img
              src={benguet_provincial_seal}
              alt="benguet_provincial_seal"
              style={{
                objectFit: 'cover',
                height: 70,
                width: 70,
                marginRight: 8,
              }}
            />
            <img
              src={bakun_municipal_seal}
              alt="bakun_municipal_seal"
              style={{
                objectFit: 'contain',
                height: 70,
                width: 70,
                marginRight: 8,
              }}
            />
            <img
              src={bakun_brgy_seal}
              alt="bakun_brgy_seal"
              style={{
                objectFit: 'contain',
                height: 70,
                width: 70,
                marginRight: 8,
              }}
            />
            <img
              src={bakun_lewc_seal}
              alt="bakun_lewc_seal"
              style={{
                objectFit: 'contain',
                height: 70,
                width: 70,
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={6} lg={6.5}>
          <div
            style={{
              textAlign: 'left',
              height: 'auto',
              width: '100%',
              marginTop: 30,
            }}>
            <Typography
              variant="h5"
              style={{fontWeight: '600', color: '#16526D'}}>
              COMMUNITY-BASED EARLY WARNING SYSTEM FOR LANDSLIDES
            </Typography>
            <Typography
              variant="h6"
              style={{fontWeight: '300', color: '#16526D'}}>
              Brgy. Poblacion, Bakun, Benguet
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} md={12} lg={2}>
          <div style={{textAlign: 'end'}}>
            <Tooltip title="Notification">
              <IconButton onClick={() => {}} sx={{p: 2, mt: 4}}>
                <NotificationsNoneIcon
                  alt="Notification"
                  style={{color: '#16526D'}}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
              <IconButton onClick={(e) => { setAnchorElSettings(e.currentTarget) }} sx={{p: 2, mt: 4}}>
                <Avatar src={imageUrl} alt="Profile photo" />
              </IconButton>
            </Tooltip>

            <Menu
              id="menu-settings"
              anchorEl={anchorElSettings}
              open={openSettings}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'button',
              }}>
              <MenuItem
                onClick={() => {
                  navigate('/profile-settings');
                  handleClose();
                }}>
                Profile Settings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/change-password');
                  handleClose();
                }}>
                Change Password
              </MenuItem>
            </Menu>

            <IconButton
              id="button"
              aria-controls={open ? 'menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{p: 2, mt: 4}}>
              <MenuIcon alt="Menu" style={{color: '#16526D'}} />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'button',
              }}>
              <MenuItem
                onClick={() => {
                  navigate('/feedback');
                  handleClose();
                }}>
                Feedback
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  localStorage.removeItem('credentials')
                  (window.location = '/')
                }}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
          }}>
          <AppBar position="static" color="inherit">
            <Grid container style={{backgroundColor: '#16526D'}}>
              <Grid item md={10}>
                <Toolbar style={{justifyContent: 'center'}}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example">
                    <Tab
                      label={
                        <span style={{color: 'white', fontWeight: 'bold'}}>
                          DASHBOARD
                        </span>
                      }
                      {...a11yProps(0)}
                    />
                    <Tab
                      label={
                        <span style={{color: 'white', fontWeight: 'bold'}}>
                          COMMUNITY RISK ASSESSMENT
                        </span>
                      }
                      onClick={e => {
                        handleClickCRA(e);
                        preventDefault(e);
                      }}
                    />
                    <Tab
                      label={
                        <span style={{color: 'white', fontWeight: 'bold'}}>
                          DATA ANALYSIS
                        </span>
                      }
                      onClick={e => {
                        handleClickAnalysis(e);
                        preventDefault(e);
                      }}
                    />
                    <Tab
                      label={
                        <span style={{color: 'white', fontWeight: 'bold'}}>
                          GROUND DATA
                        </span>
                      }
                      onClick={e => {
                        handleClickGroundData(e);
                        preventDefault(e);
                      }}
                    />
                    <Tab
                      label={
                        <span style={{color: 'white', fontWeight: 'bold'}}>
                          SCHEDULE
                        </span>
                      }
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Toolbar>
              </Grid>
              <Grid item md={2} style={{ alignSelf: 'center' }}>
                <Typography variant="body1" style={{color: 'white'}}>
                  {server_time.toUpperCase()}
                </Typography>
              </Grid>
            </Grid>
          </AppBar>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Menu
          id="menu"
          anchorEl={anchorElCRA}
          open={openCRA}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'button',
          }}>
          <MenuItem
            onClick={() => {
              handleOpen();
              handleClose();
            }}>
            Hazard Map
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/cav');
              handleClose();
            }}>
            Household Data
          </MenuItem>
        </Menu>
      </Grid>
      <Grid item xs={12}>
        <Menu
          id="menu"
          anchorEl={anchorElAnalysis}
          open={openAnalysis}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'button',
          }}>
          <MenuItem
            onClick={() => {
              navigate('/analysis');
              handleClose();
            }}>
            Summary
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/rainfall');
              handleClose();
            }}>
            Rainfall Plot
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/surficial');
              handleClose();
            }}>
            Surficial Plot
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/subsurface');
              handleClose();
            }}>
            Subsurface Plot
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/earthquake');
              handleClose();
            }}>
            Earthquake Data
          </MenuItem>
        </Menu>
        <Menu
          id="menu"
          anchorEl={anchorElGroundData}
          open={openGroundData}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'button',
          }}>
          <MenuItem
            onClick={() => {
              navigate('/surficial_markers');
              handleClose();
            }}>
            Surficial Markers
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/moms');
              handleClose();
            }}>
            Manifestations of movement
          </MenuItem>
        </Menu>
      </Grid>
    </Fragment>
  );
};

export default MarirongHeader;
