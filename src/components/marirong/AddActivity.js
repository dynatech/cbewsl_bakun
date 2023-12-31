import React, { useMemo, div, useState, useEffect, Fragment } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  Button,
  Typography,
  Divider,
  Stack,
  TextField,
  IconButton,
  Tooltip,
  DialogContent,
} from "@mui/material";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import Dialog from "@mui/material/Dialog";

import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { addEvent } from '../../apis/EventsManagement'
import PromptModal from './modals/PromptModal';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Swal from 'sweetalert2'
import { CBEWSL_SITE } from "../../host";

const localizer = momentLocalizer(moment);
const AddActivity = (props) => {
  const {
    slotInfo,
    openModal,
    setOpenModal,
    action,
    calendarEvent,
    getAllEvents,
    setEditElement,
  } = props;

  const [eventName, setEventName] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventNote, setEventNote] = useState("");
  const [eventStartDate, setEventStartDate] = useState();
  const [eventEndDate, setEventEndDate] = useState();
  const [eventID, setEventID] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [isConfirm, setIsConfirm] = useState(false);

  const [openPrompt, setOpenPrompt] = useState(false);
  const [promptTitle, setPromptTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [errorPrompt, setErrorPrompt] = useState(false);

  useEffect(() => {
    if (action == "add") {
      resetValues();
    } else if (action == "edit") {
      setEventName(calendarEvent.title);
      setEventPlace(calendarEvent.place);
      setEventNote(calendarEvent.note);
      setEventStartDate(new Date(calendarEvent.start));
      setEventEndDate(new Date(calendarEvent.end));
      setEventID(calendarEvent.id);
      setImageUrl(calendarEvent.file);
      setIsConfirm(false);
    }
  }, [props]);

  useEffect(() => {
    if (selectedImage) {
      const file = URL.createObjectURL(selectedImage);
      setImageUrl(file);
    }
  }, [selectedImage]);

  const handleOpen = () => {
    setOpenModal(true);
    setIsConfirm(false);
  };

  const resetValues = () => {
    setEventID(0);
    setEventName("");
    setEventPlace("");
    setEventNote("");
    setImageUrl(null);
    setEventStartDate(slotInfo.start);
    setEventEndDate(slotInfo.start);
  };

  const handleClose = () => {
    setOpenModal(false);
    resetValues();
    setEditElement(null);
  };

  const handleSubmit = () => {
    setIsConfirm(!isConfirm);
  };

  const handleActivity = () => {
    const formData = new FormData();
        formData.append('activity_id', action === "add" ? 0 : eventID);
        formData.append('start_date', moment(eventStartDate).format('YYYY-MM-DD HH:mm:ss'));
        formData.append('end_date', moment(eventEndDate).format('YYYY-MM-DD HH:mm:ss'))
        formData.append('activity_name', eventName);
        formData.append('activity_place', eventPlace);
        formData.append('activity_note', eventNote);
        formData.append('site_id', CBEWSL_SITE);
        formData.append('file', selectedImage);
        console.log(formData)
        setIsConfirm(false)

    addEvent(formData, (response) => {
      if (response.status) {
        getAllEvents();
        setEditElement(null);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.feedback,
        });
        setOpenModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.feedback,
        });
        setOpenModal(false);
        setEditElement(null);
      }
    });
  };


  return (
    <Fragment>
      <PromptModal
        isOpen={openPrompt}
        error={errorPrompt}
        title={promptTitle}
        setOpenModal={setOpenPrompt}
        notifMessage={notifMessage}
      />

      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="title"
        aria-describedby="description"
      >
        {!isConfirm ? (
          <div>
            <DialogContent>
              <Stack direction="row" spacing={20}>
                <Typography id="title" variant="h5" component="h4">
                  Activity for{" "}
                  {action === "add"
                    ? moment(slotInfo.start).format("LL")
                    : moment(calendarEvent.start).format("LL")}
                </Typography>
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                <Tooltip title="Add a photo">
                  <IconButton color="primary">
                    <label htmlFor="select-image">
                      <AddPhotoAlternateIcon fontSize="medium" />
                    </label>
                  </IconButton>
                </Tooltip>
              </Stack>
              <Divider />
              <Stack spacing={1} paddingTop={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box flexDirection={"row"} style={{ paddingTop: 10 }}>
                    <DateTimePicker
                      label="Event Start"
                      value={eventStartDate}
                      onChange={(e) => {
                        setEventStartDate(
                          moment(new Date(e)).format("YYYY-MM-DD hh:mm A")
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          style={{ width: "49%", marginRight: "2%" }}
                          {...params}
                        />
                      )}
                    />
                    <DateTimePicker
                      label="Event End"
                      value={eventEndDate}
                      onChange={(e) => {
                        setEventEndDate(
                          moment(new Date(e)).format("YYYY-MM-DD hh:mm A")
                        );
                      }}
                      renderInput={(params) => (
                        <TextField style={{ width: "49%" }} {...params} />
                      )}
                    />
                  </Box>
                </LocalizationProvider>
                <TextField
                  id="outlined-required"
                  placeholder="Ex: CBEWS-L Seminar"
                  label="Name of Activity"
                  variant="outlined"
                  value={eventName}
                  // style={{width: '100%', paddingBottom: 10}}
                  onChange={(e) => {
                    e.preventDefault();
                    setEventName(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-required"
                  placeholder="Ex: Brgy. Hall"
                  label="Place of Activity"
                  variant="outlined"
                  value={eventPlace}
                  // style={{width: '100%', paddingBottom: 10}}
                  onChange={(e) => {
                    setEventPlace(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-required"
                  placeholder="**additional info**"
                  label="Description"
                  variant="outlined"
                  value={eventNote}
                  multiline
                  rows={3}
                  // style={{width: '100%', paddingBottom: 10}}
                  onChange={(e) => {
                    setEventNote(e.target.value);
                  }}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                paddingTop={5}
              >
                <Button
                  variant="text"
                  color="error"
                  startIcon={<DoNotDisturbIcon />}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  endIcon={<AddCircleOutlined />}
                  onClick={handleSubmit}
                >
                  {action == "add" ? "Add Activity" : "Edit Activity"}
                </Button>
              </Stack>
              {imageUrl && selectedImage && (
                <div>
                  <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                  <div style={{ marginBottom: 10 }}>Attached Image:</div>
                  <Box mt={2} textAlign="center">
                    <img
                      src={imageUrl}
                      alt={selectedImage.name}
                      height="auto"
                      width="50%"
                    />
                  </Box>
                </div>
              )}
            </DialogContent>
          </div>
        ) : (
          <div style={{ overflowWrap: "anywhere", width: 500 }}>
            <DialogContent>
              <h1>Are you sure?</h1>
              <Divider />
              <h3>Start Date and Time: </h3>
              {`${moment(eventStartDate).format("LL h:mm A")}`}
              <h3>End Date and Time: </h3>
              {`${moment(eventEndDate).format("LL h:mm A")}`}
              <h3>Activity Name: </h3>
              {eventName}
              <h3>Activity Place: </h3>
              {eventPlace}
              <h3>Activity Description:</h3>
              <Typography variant="body1" gutterBottom>
                {eventNote}
              </Typography>
              <Divider />
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                paddingTop={2}
              >
                <Button
                  onClick={() => {
                    handleActivity();
                  }}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  No
                </Button>
              </Stack>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </Fragment>
  );
};

export default AddActivity;
