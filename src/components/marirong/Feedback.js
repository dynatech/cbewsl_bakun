import React, {Fragment, useState, useEffect} from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PromptModal from './modals/PromptModal';
import { saveFeedback } from '../../apis/Misc';
import Swal from 'sweetalert2'

function Feedback() {
  const [concern, setConcern] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [sendButtonState, setSendButtonState] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLast, setCurrentUserLast] = useState(null);
  const [designation, setDesignation] = useState(null);
 

  const resetValues = () => {
    setConcern('');
    setSelectedImage('');
  };

  const handleSend = () => {

    const feedbackData ={
      id: 0,
      file_path: selectedImage,
      description: concern,
    };

    saveFeedback(feedbackData, data => {
      const {status, message} = data;
      if (status === true) {
        resetValues();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: message
      })
      }
    });
  };

  useEffect(() => {
    const data = localStorage.getItem('credentials');
    const parse_data = JSON.parse(data);
    const first_name = parse_data.user.first_name;
    const last_name = parse_data.user.last_name;
    const designation = parse_data.profile.designation_details.designation;
    setCurrentUser(first_name);
    setCurrentUserLast(last_name);
    setDesignation(designation);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      const file = URL.createObjectURL(selectedImage);
      setImageUrl(file);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (concern === '') {
      setSendButtonState(true);
    } else {
      setSendButtonState(false);
    }
    return;
  }, [sendButtonState, concern]);

  return (
    <Grid container sx={{padding: 8}}>
      <Grid item xs={12}>
        <Box elevato="true">
          <Typography variant="h4" sx={{marginBottom: 4}}>
            Feedback / Bug Report
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{minWidth: 275}}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>
                  Reporter:
                    <Typography style={{fontWeight: 'bold', display: 'inline-flex', paddingLeft: 5}}> {`${currentUser} ${currentUserLast}`}</Typography>
                </Typography>
                <Typography>
                  Stakeholder's Group:
                  <Typography style={{fontWeight: 'bold', display: 'inline-flex', paddingLeft: 5}}>{designation}</Typography>
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography style={{fontWeight: 'bold', display: 'inline-flex'}}>CBEWS-L Web app (concerns with the app, bugs, errors)</Typography>
              </Grid>
              <Grid item xs={2} justifyContent='flex-end' alignItems='flex-end'>
                <Fragment>
                  <input
                    accept="image/*"
                    type="file"
                    id="select-image"
                    style={{display: 'none'}}
                    onChange={e => setSelectedImage(e.target.files[0])}
                  />
                  <label htmlFor="select-image">
                    <Button
                      variant="outlined"
                      component="span"
                      endIcon={<AddPhotoAlternateIcon />}>
                      Attach Image
                    </Button>
                  </label>
                </Fragment>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-multiline-static"
                  label="Please describe/elaborate concern"
                  multiline
                  rows={10}
                  required
                  placeholder="E.g. Dashboard not working"
                  variant="outlined"
                  style={{width: '100%'}}
                  value={concern}
                  onChange={e => setConcern(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                {imageUrl && selectedImage && (
                  <Box mt={2} textAlign="center">
                    <div style={{marginBottom: 10}}>Preview:</div>
                    <img
                      src={imageUrl}
                      alt={selectedImage.name}
                      height="auto"
                      width="30%"
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{justifyContent: 'flex-end'}}>
            <Button
              size="small"
              variant="contained"
              sx={{backgroundColor: "#ffd400", color: "black"}}
              onClick={() => handleSend()}
              disabled={sendButtonState}>
              Submit Feedback
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Feedback;