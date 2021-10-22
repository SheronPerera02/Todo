import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  todos: [],
  loading: false,
  error: null,
  listNameList: [],
  listNamesLoading: false,
  drawerVisible: false,
};

const createTodoStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const createTodoSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};

const createTodoFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const fetchTodosStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const fetchTodosSuccess = (state, action) => {
  return updateObject(state, { loading: false, todos: action.todos });
};

const fetchTodosFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const saveListNameStart = (state, action) => {
  return updateObject(state, { listNamesLoading: true, error: null });
};

const saveListNameFail = (state, action) => {
  return updateObject(state, { listNamesLoading: false, error: action.error });
};

const fetchListNamesSuccess = (state, action) => {
  return updateObject(state, {
    listNamesLoading: false,
    listNameList: action.listNameList,
  });
};

const fetchListNamesFail = (state, action) => {
  return updateObject(state, { listNamesLoading: false, error: action.error });
};

const deleteListNameStart = (state, action) => {
  return updateObject(state, { error: null });
};

const deleteListNameFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const deleteTodoStart = (state, action) => {
  return updateObject(state, { error: null });
};

const deleteTodoFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const updateTodoStart = (state, action) => {
  return updateObject(state, { error: null });
};

const updateTodoFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const showDrawer = (state, action) => {
  return updateObject(state, { drawerVisible: true });
};

const hideDrawer = (state, action) => {
  return updateObject(state, { drawerVisible: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_TODO_START:
      return createTodoStart(state, action);
    case actionTypes.CREATE_TODO_SUCCESS:
      return createTodoSuccess(state, action);
    case actionTypes.CREATE_TODO_FAIL:
      return createTodoFail(state, action);
    case actionTypes.FETCH_TODOS_START:
      return fetchTodosStart(state, action);
    case actionTypes.FETCH_TODOS_SUCCESS:
      return fetchTodosSuccess(state, action);
    case actionTypes.FETCH_TODOS_FAIL:
      return fetchTodosFail(state, action);
    case actionTypes.SAVE_LIST_NAME_START:
      return saveListNameStart(state, action);
    case actionTypes.SAVE_LIST_NAME_FAIL:
      return saveListNameFail(state, action);
    case actionTypes.FETCH_LIST_NAMES_SUCCESS:
      return fetchListNamesSuccess(state, action);
    case actionTypes.FETCH_LIST_NAMES_FAIL:
      return fetchListNamesFail(state, action);
    case actionTypes.DELETE_LIST_NAME_START:
      return deleteListNameStart(state, action);
    case actionTypes.DELETE_LIST_NAME_FAIL:
      return deleteListNameFail(state, action);
    case actionTypes.DELETE_TODO_START:
      return deleteTodoStart(state, action);
    case actionTypes.DELETE_TODO_FAIL:
      return deleteTodoFail(state, action);
    case actionTypes.UPDATE_TODO_START:
      return updateTodoStart(state, action);
    case actionTypes.UPDATE_TODO_FAIL:
      return updateTodoFail(state, action);
    case actionTypes.SHOW_DRAWER:
      return showDrawer(state, action);
    case actionTypes.HIDE_DRAWER:
      return hideDrawer(state, action);
    default:
      return state;
  }
};

export default reducer;
