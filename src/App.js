import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ComputerIcon from "@material-ui/icons/Computer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import CameraRoundedIcon from "@material-ui/icons/CameraRounded";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import blueGrey from "@material-ui/core/colors/blueGrey";

// Declare styles.
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1440,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  buttonsSection: {
    padding: theme.spacing(2),
    display: "flex",
    gap: theme.spacing(2),
  },
  contentsSection: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    height: 570,
  },
  cardContent: {
    width: "100%",
    height: 536,
    background: blueGrey[50],
  },
  imageContainer: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
  },
}));

/**
 * Declare 'Capture options' object.
 */
const captureOptions = {
  audio: false,
  video: { facingMode: "environment" },
};

/**
 * Declare 'App' component.
 */
export default function App() {
  // Declare canvas ref.
  const canvasRef = useRef(null);

  // Declare video ref.
  let videoRef = useRef(null);

  const classes = useStyles();
  const [convertedCanvasData, setConvertedCanvasData] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /**
   * Setup a side effect that will set the 'Video ref' properties.
   */
  useEffect(() => {
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
      return;
    }

    // Execute clean up function.
    return () => {
      if (Boolean(mediaStream)) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [mediaStream]);

  /**
   * Toggle menu display.
   */
  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Close secondary menu.
   */
  const closeMenu = () => {
    setAnchorEl(null);
  };

  /**
   * Enable stream.
   */
  async function enableStream() {
    try {
      // Generate 'Media stream' data.
      const stream = await navigator.mediaDevices.getUserMedia(captureOptions);
      setMediaStream(stream);
    } catch (err) {
      console.error("Media stream error", err);
    }
  }

  /**
   * Start streaming.
   */
  const startStreaming = () => {
    if (!mediaStream) {
      enableStream();
    }
  };

  /**
   * Stop streaming.
   */
  const stopStreaming = () => {
    if (Boolean(mediaStream)) {
      // Stop each 'track' from the 'Media stream'.
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });

      setMediaStream(null);
      setConvertedCanvasData(null);
    }
  };

  /**
   * Capture snapshot.
   */
  const captureSnapshot = () => {
    if (Boolean(mediaStream)) {
      // Create a '2D canvas context'.
      const canvasContext = canvasRef?.current?.getContext("2d");

      // Generate image.
      canvasContext?.drawImage(
        videoRef?.current,
        0,
        0,
        canvasRef?.current?.width,
        canvasRef?.current?.height
      );

      // Generate 'PNG' image.
      setConvertedCanvasData(canvasRef?.current?.toDataURL("image/png"));
    }
  };

  return (
    <div className={classes.root}>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          {/* Menu button */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          {/* Application title */}
          <Typography variant="h6" className={classes.title}>
            Image Capture
          </Typography>

          {/* Account menu */}
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={closeMenu}
            >
              <ListItem button onClick={closeMenu}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={closeMenu}>
                <ListItemIcon>
                  <ComputerIcon />
                </ListItemIcon>
                <ListItemText primary="My account" />
              </ListItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Buttons section */}
      <section className={classes.buttonsSection}>
        {/* Start streaming button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PlayCircleFilledRoundedIcon />}
          onClick={startStreaming}
        >
          Start streaming
        </Button>

        {/* Stop streaming button */}
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<StopRoundedIcon />}
          onClick={stopStreaming}
        >
          Stop streaming
        </Button>

        {/* Capture image button */}
        <Button
          variant="contained"
          color="default"
          size="large"
          startIcon={<CameraRoundedIcon />}
          onClick={captureSnapshot}
        >
          Capture snapshot
        </Button>
      </section>

      {/* Content section */}
      <section className={classes.contentsSection}>
        <Grid container spacing={2}>
          {/* Stream card */}
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Stream</Typography>
              {mediaStream ? (
                <video ref={videoRef} className={classes.cardContent}></video>
              ) : (
                <div className={classes.cardContent}></div>
              )}
            </Paper>
          </Grid>

          {/* Capture card */}
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Capture</Typography>
              {convertedCanvasData ? (
                <img
                  src={convertedCanvasData}
                  className={classes.cardContent}
                  alt="The screen capture will appear in this box."
                />
              ) : (
                <canvas ref={canvasRef} className={classes.cardContent} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </section>
    </div>
  );
}
