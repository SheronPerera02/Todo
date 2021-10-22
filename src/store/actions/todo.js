import * as actionTypes from './actionTypes';
import todoAxios from '../../todo-axios';

const createTodoStart = () => {
  return {
    type: actionTypes.CREATE_TODO_START,
  };
};

const createTodoSuccess = () => {
  return {
    type: actionTypes.CREATE_TODO_SUCCESS,
  };
};

const createTodoFail = (error) => {
  return {
    type: actionTypes.CREATE_TODO_FAIL,
    error,
  };
};

export const createTodo = (todo, token, openSnackBar) => {
  return (dispatch) => {
    dispatch(createTodoStart());
    todoAxios
      .post('/todoos.json?auth=' + token, { ...todo, done: false })
      .then(() => {
        dispatch(createTodoSuccess());
        openSnackBar();
      })
      .catch((error) => {
        dispatch(createTodoFail(error));
        openSnackBar();
      });
  };
};

const fetchTodosStart = () => {
  return {
    type: actionTypes.FETCH_TODOS_START,
  };
};

const fetchTodosSuccess = (todos) => {
  return {
    type: actionTypes.FETCH_TODOS_SUCCESS,
    todos,
  };
};

const fetchTodosFail = (error) => {
  return {
    type: actionTypes.FETCH_TODOS_FAIL,
    error,
  };
};

export const fetchTodos = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchTodosStart());
    const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    todoAxios
      .get('/todoos.json' + queryParams)
      .then((response) => {
        let todos = [];

        if (response.data) {
          todos = Object.keys(response.data).map((key) => {
            return {
              todoId: key,
              ...response.data[key],
            };
          });
        }
        dispatch(fetchTodosSuccess(todos));
      })
      .catch((error) => {
        dispatch(fetchTodosFail(error));
      });
  };
};

const saveListNameStart = () => {
  return {
    type: actionTypes.SAVE_LIST_NAME_START,
  };
};

const saveListNameFail = (error) => {
  return {
    type: actionTypes.SAVE_LIST_NAME_FAIL,
    error,
  };
};

export const saveListName = (listName, token, openSnackBar) => {
  return (dispatch) => {
    dispatch(saveListNameStart());
    todoAxios
      .post('/listName.json?auth=' + token, listName)
      .then(() => {
        openSnackBar();
        dispatch(fetchListNames(token, listName.userId, openSnackBar));
      })
      .catch((error) => {
        dispatch(saveListNameFail(error));
        openSnackBar();
      });
  };
};

const deleteListNameStart = () => {
  return {
    type: actionTypes.DELETE_LIST_NAME_START,
  };
};

const deleteListNameFail = (error) => {
  return {
    type: actionTypes.DELETE_LIST_NAME_FAIL,
    error,
  };
};

export const deleteListName = (id, token, userId, openSnackBar) => {
  return (dispatch) => {
    dispatch(deleteListNameStart());
    todoAxios
      .delete('listName/' + id + '.json?auth=' + token)
      .then(() => {
        openSnackBar();
        dispatch(fetchListNames(token, userId, openSnackBar));
      })
      .catch((error) => {
        dispatch(deleteListNameFail(error));
        openSnackBar();
      });
  };
};

const fetchListNamesSuccess = (listNameList) => {
  return {
    type: actionTypes.FETCH_LIST_NAMES_SUCCESS,
    listNameList,
  };
};

const fetchListNamesFail = (error) => {
  return {
    type: actionTypes.FETCH_LIST_NAMES_FAIL,
    error,
  };
};

export const fetchListNames = (token, userId, openSnackBar) => {
  return (dispatch) => {
    const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    todoAxios
      .get('/listName.json' + queryParams)
      .then((response) => {
        let listNames = [];

        if (response.data) {
          listNames = Object.keys(response.data).map((key) => {
            return {
              listNameId: key,
              ...response.data[key],
            };
          });
        }

        dispatch(fetchListNamesSuccess(listNames));
      })
      .catch((error) => {
        dispatch(fetchListNamesFail(error));
        openSnackBar();
      });
  };
};

const deleteTodoStart = () => {
  return {
    type: actionTypes.DELETE_TODO_START,
  };
};

const deleteTodoFail = (error) => {
  return {
    type: actionTypes.DELETE_TODO_FAIL,
    error,
  };
};

export const deleteTodo = (id, token, userId, openSnackBar) => {
  return (dispatch) => {
    dispatch(deleteTodoStart());
    todoAxios
      .delete('todoos/' + id + '.json?auth=' + token)
      .then(() => {
        openSnackBar();
        dispatch(fetchTodos(token, userId));
      })
      .catch((error) => {
        dispatch(deleteTodoFail(error));
        openSnackBar();
      });
  };
};

const updateTodoStart = () => {
  return {
    type: actionTypes.UPDATE_TODO_START,
  };
};

const updateTodoFail = (error) => {
  return {
    type: actionTypes.UPDATE_TODO_FAIL,
    error,
  };
};

export const updateTodo = (id, token, userId, openSnackBar) => {
  return (dispatch) => {
    dispatch(updateTodoStart());
    todoAxios
      .patch('todoos/' + id + '.json?auth=' + token, { done: true })
      .then(() => {
        openSnackBar();
        dispatch(fetchTodos(token, userId));
      })
      .catch((error) => {
        dispatch(updateTodoFail(error));
        openSnackBar();
      });
  };
};

export const showDrawer = () => {
  return {
    type: actionTypes.SHOW_DRAWER,
  };
};

export const hideDrawer = () => {
  return {
    type: actionTypes.HIDE_DRAWER,
  };
};
