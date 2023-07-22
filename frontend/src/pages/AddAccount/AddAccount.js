import React, { useState } from "react";
import axios from "axios";

import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "./AddAccount.css";
import useUsernamesData from "../../hooks/useUsernamesData";

import { BsFillPersonCheckFill } from "react-icons/bs";

function AddAccount() {
  const URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailDisplayError, setEmailDisplayError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { data: allUsernames } = useUsernamesData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const atIndex = value.indexOf("@");
      const username = atIndex !== -1 ? value.substring(0, atIndex) : value;
      setFormData({ ...formData, [name]: value, username });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "email") {
      setEmailError(!validateEmail(value));
    } else if (name === "username") {
      setUsernameError(allUsernames.includes(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && !usernameError) {
      axios
        .post(`${URL}/accounts/add-new`, {
          ...formData,
        })
        .then((response) => {
          setOpenDialog(true);
          resetForm();
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setEmailDisplayError(error.response.data.detail);
          }
          if (error.response && error.response.status === 422) {
            setEmailDisplayError("Please enter the correct email.");
          }
        });
    }
  };

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUsernameError(allUsernames.includes(value));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      username: "",
      password: "",
    });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const validateEmail = (email) => {
    return email.includes("@");
  };

  const handleMouseClick = () => {
    if (emailDisplayError !== "") {
      setEmailDisplayError("");
    }
  };

  return (
    <Container
      maxWidth="md"
      className="form-container"
      onClick={handleMouseClick}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Add New Account
      </Typography>
      <form onSubmit={handleSubmit} className="form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              error={emailError}
              helperText={emailError ? "Incorrect email" : ""}
              className="form-field"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleUsernameChange}
              fullWidth
              required
              variant="outlined"
              error={usernameError}
              helperText={usernameError ? "Username already exists" : ""}
              className="form-field"
              InputProps={{
                readOnly: false,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              className="form-field"
            />
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-btn"
            >
              Add Account
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Display information */}
      {emailDisplayError && (
        <Typography variant="body1" color="error" gutterBottom>
          {emailDisplayError}
        </Typography>
      )}

      {/* Success Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle className>
          Success
        <BsFillPersonCheckFill icon="fa-solid fa-check" className="ms-2" />
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
          The account has been successfully added!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AddAccount;
