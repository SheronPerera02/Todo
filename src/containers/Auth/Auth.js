import React, { useState } from 'react';
import classes from './Auth.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

const Auth = (props) => {
  const [signUpActive, setActive] = useState(false);

  const [open, setOpen] = useState(false);

  const onCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onOpenSnackBar = () => {
    setOpen(true);
  };

  const [username, setUsername] = useState({
    value: '',
    isValid: false,
    validation: {
      required: true,
      minLength: 3,
    },
    dirty: false,
  });
  const [email, setEmail] = useState({
    value: '',
    isValid: false,
    validation: {
      required: true,
      isEmail: true,
    },
    dirty: false,
  });

  const [password, setPassword] = useState({
    value: '',
    isValid: false,
    validation: {
      required: true,
      minLength: 6,
      maxLength: 6,
    },
    dirty: false,
  });

  const onChangeHandler = (fieldName, value) => {
    switch (fieldName) {
      case 'username':
        setUsername({
          ...username,
          value,
          isValid: checkValidity(value, username.validation),
          dirty: true,
        });
        break;
      case 'email':
        setEmail({
          ...email,
          value,
          isValid: checkValidity(value, email.validation),
          dirty: true,
        });
        break;
      case 'password':
        setPassword({
          ...password,
          value,
          isValid: checkValidity(value, password.validation),
          dirty: true,
        });
        break;
      default:
        return;
    }
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      let atposition = value.indexOf('@');
      let dotposition = value.lastIndexOf('.');

      isValid = atposition !== -1 && dotposition !== -1 && isValid;

      if (atposition !== -1 && dotposition !== -1) {
        isValid =
          !(
            atposition < 1 ||
            dotposition < atposition + 2 ||
            dotposition + 2 >= value.length
          ) && isValid;
      }
    }

    return isValid;
  };

  const toggleSignUpActive = () => {
    setActive(!signUpActive);
    clearFields();
  };

  const clearFields = () => {
    setUsername({
      ...username,
      value: '',
      dirty: false,
      isValid: false,
    });
    setEmail({
      ...email,
      value: '',
      dirty: false,
      isValid: false,
    });
    setPassword({
      ...password,
      value: '',
      dirty: false,
      isValid: false,
    });
  };

  const shouldMountInvalidClass = (fieldName) => {
    switch (fieldName) {
      case 'username':
        return username.dirty && !username.isValid;
      case 'email':
        return email.dirty && !email.isValid;
      case 'password':
        return password.dirty && !password.isValid;
      default:
        return false;
    }
  };

  const signInHandler = (event) => {
    event.preventDefault();
    if (!(email.isValid && password.isValid)) {
      onOpenSnackBar();
    } else {
      props.onAuth(null, email.value, password.value, false, onOpenSnackBar);
    }
  };

  const signUpHandler = (event) => {
    event.preventDefault();
    if (!(username.isValid && email.isValid && password.isValid)) {
      onOpenSnackBar();
    } else {
      props.onAuth(
        username.value,
        email.value,
        password.value,
        true,
        onOpenSnackBar
      );
    }
  };

  let formContainerClasses = [classes.FormContainer];
  if (signUpActive) {
    formContainerClasses.push(classes.SignUpActive_Form);
  }

  let panelContainerClasses = [classes.PanelContainer];
  if (signUpActive) {
    panelContainerClasses.push(classes.SignUpActive_Panel);
  }

  let signInForm = (
    <>
      <h1>Sign In</h1>
      <input
        placeholder='Email'
        onChange={(event) => onChangeHandler('email', event.target.value)}
        value={email.value}
        type='email'
        className={shouldMountInvalidClass('email') ? classes.Invalid : null}
      />
      <input
        placeholder='Password'
        onChange={(event) => onChangeHandler('password', event.target.value)}
        value={password.value}
        type='password'
        className={shouldMountInvalidClass('password') ? classes.Invalid : null}
      />
      <button>SIGN IN</button>
    </>
  );

  if (props.loading) {
    signInForm = <Spinner />;
  }

  let signUpForm = (
    <>
      <h1>Sign Up</h1>
      <input
        placeholder='Username'
        onChange={(event) => onChangeHandler('username', event.target.value)}
        value={username.value}
        type='text'
        className={shouldMountInvalidClass('username') ? classes.Invalid : null}
      />
      <input
        placeholder='Email'
        onChange={(event) => onChangeHandler('email', event.target.value)}
        value={email.value}
        type='email'
        className={shouldMountInvalidClass('email') ? classes.Invalid : null}
      />
      <input
        placeholder='Password'
        onChange={(event) => onChangeHandler('password', event.target.value)}
        value={password.value}
        type='password'
        className={shouldMountInvalidClass('password') ? classes.Invalid : null}
      />
      <button>SIGN UP</button>
    </>
  );

  if (props.loading) {
    signUpForm = <Spinner />;
  }

  return (
    <div className={classes.Auth}>
      <Snackbar open={open} autoHideDuration={1000} onClose={onCloseSnackBar}>
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={onCloseSnackBar}
          severity={!(email.isValid && password.isValid) ? 'warning' : 'error'}
        >
          {!(email.isValid && password.isValid)
            ? 'Invalid form'
            : props.error
            ? props.error.message
            : null}
        </MuiAlert>
      </Snackbar>
      <div className={classes.MainContainer}>
        <div className={formContainerClasses.join(' ')}>
          <form className={classes.SignInForm} onSubmit={signInHandler}>
            {signInForm}
          </form>
          <form className={classes.SignUpForm} onSubmit={signUpHandler}>
            {signUpForm}
          </form>
        </div>
        <div className={panelContainerClasses.join(' ')}>
          <div>
            <div className={classes.SignInPanel}>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login
                <br />
                with your personal info
              </p>
              <button onClick={toggleSignUpActive}>Sign In</button>
            </div>
            <div className={classes.SignUpPanel}>
              <h1>Hello, There!</h1>
              <p>Enter your personal details and start</p>
              <button onClick={toggleSignUpActive}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password, isSignUp, openSnackBar) =>
      dispatch(actions.auth(username, email, password, isSignUp, openSnackBar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
