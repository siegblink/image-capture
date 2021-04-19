import React from "react";
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

// Declare styles.
const useStyles = makeStyles((theme) => ({
  root: {
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
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    height: 570,
  },
}));

/**
 * Declare 'App' component.
 */
export default function App() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
        >
          Start streaming
        </Button>

        {/* Stop streaming button */}
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<StopRoundedIcon />}
        >
          Stop streaming
        </Button>

        {/* Capture image button */}
        <Button
          variant="contained"
          color="default"
          size="large"
          startIcon={<CameraRoundedIcon />}
        >
          Capture image
        </Button>
      </section>

      {/* Content section */}
      <section className={classes.contentsSection}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Stream</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Capture</Typography>
            </Paper>
          </Grid>
        </Grid>
      </section>
    </div>
  );
}
