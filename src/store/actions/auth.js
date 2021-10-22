import * as actionTypes from './actionTypes';
import authAxios from '../../auth-axios';
import axios from 'axios';
import { getAuthErrorMessage } from '../../shared/utility';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, userId, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
    username,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expiry');
  localStorage.removeItem('username');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkLogoutTimeout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiresIn * 1000);
  };
};

export const auth = (username, email, password, isSignUp, openSnackBar) => {
  return (dispatch) => {
    dispatch(authStart());
    if (isSignUp) {
      let signUpUrl =
        'accounts:signUp?key=AIzaSyDm223aTyJAw-2Qp8staDajI_cGYDDEgmg';

      authAxios
        .post(signUpUrl, {
          email,
          password,
          returnSecureToken: true,
        })
        .then((response) => {
          const data = response.data;
          axios
            .post(
              'https://todoo-16959-default-rtdb.asia-southeast1.firebasedatabase.app/usernames.json?auth=' +
                data.idToken,
              {
                userId: data.localId,
                username,
              }
            )
            .then(() => {
              dispatch(
                authSuccess(
                  data.idToken,
                  data.localId,
                  username,
                  data.expiresIn
                )
              );

              dispatch(checkLogoutTimeout(+data.expiresIn));

              localStorage.setItem('token', data.idToken);
              localStorage.setItem('userId', data.localId);
              localStorage.setItem(
                'expiry',
                new Date(new Date().getTime() + data.expiresIn * 1000)
              );
              localStorage.setItem('username', username);
            });
        })
        .catch((error) => {
          const err = {};
          err.message = getAuthErrorMessage(error);
          dispatch(authFail(err));
          openSnackBar();
        });
    } else {
      let signInUrl =
        'accounts:signInWithPassword?key=AIzaSyDm223aTyJAw-2Qp8staDajI_cGYDDEgmg';

      authAxios
        .post(signInUrl, {
          email,
          password,
          returnSecureToken: true,
        })
        .then((response) => {
          const data = response.data;

          const queryParams =
            '?auth=' +
            data.idToken +
            '&orderBy="userId"&equalTo="' +
            data.localId +
            '"';
          axios
            .get(
              'https://todoo-16959-default-rtdb.asia-southeast1.firebasedatabase.app/usernames.json' +
                queryParams
            )
            .then((response) => {
              const username =
                response.data[Object.keys(response.data)[0]].username;

              dispatch(
                authSuccess(
                  data.idToken,
                  data.localId,
                  username,
                  data.expiresIn
                )
              );

              dispatch(checkLogoutTimeout(+data.expiresIn));

              localStorage.setItem('token', data.idToken);
              localStorage.setItem('userId', data.localId);
              localStorage.setItem(
                'expiry',
                new Date(new Date().getTime() + data.expiresIn * 1000)
              );
              localStorage.setItem('username', username);
            });
        })
        .catch((error) => {
          const err = {};
          err.message = getAuthErrorMessage(error);
          dispatch(authFail(err));
          openSnackBar();
        });
    }
  };
};

export const tryAutoLogin = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expiry = localStorage.getItem('expiry');
    const username = localStorage.getItem('username');

    if (!token) {
      dispatch(authLogout());
    } else {
      if (new Date().getTime() >= new Date(expiry).getTime()) {
        dispatch(authLogout());
      } else {
        dispatch(
          authSuccess(
            token,
            userId,
            username,
            (new Date(expiry).getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
