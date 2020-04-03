import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SignIn from './SignIn';
import { GOOGLE_AUTH_URL } from '../constants';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 600,
    height: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const chooseLogin = (
  <div>
    <div>
      Login com Google: <a href={GOOGLE_AUTH_URL}>click here</a>
    </div>
  </div>
);

const LoginModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    props.onchange(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>

          {chooseLogin}

          {/* <LoginForm /> */}

          <SignIn onChange={handleClose}/>
        </div>

        
      </Modal>
    </div>
  );
}

export default LoginModal;