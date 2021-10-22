export const checkValidity = (val, rules, isADatePicker) => {
  if (isADatePicker) {
    return val.toString() !== 'Invalid Date' && val !== null;
  }

  let isValid = true;
  if (rules.required) {
    isValid = val !== '' && isValid;
  }

  return isValid;
};

export const onChangeHandler = (
  key,
  event,
  controls,
  setControls,
  setFormValidity
) => {
  let updatedControls = {
    ...controls,
  };

  updatedControls[key] = {
    ...updatedControls[key],
    value: key === 'date' ? new Date(event) : event.target.value,
    dirty: true,
    isValid: checkValidity(
      key === 'date' ? event : event.target.value,
      controls[key].validation,
      key === 'date' ? true : false
    ),
  };

  let formIsValid = true;

  for (let key in updatedControls) {
    if (!updatedControls[key].isValid && formIsValid) {
      formIsValid = updatedControls[key].isValid;
    }
  }

  setFormValidity(formIsValid);
  setControls(updatedControls);
};

export const updateObject = (object, updatedProperties) => {
  return {
    ...object,
    ...updatedProperties,
  };
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};

export const getAuthErrorMessage = (error) => {
  console.log();
  if (error.message && error.message === 'Network Error') {
    return 'Check your internet connection';
  } else {
    switch (error.response.data.error.message) {
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      case 'EMAIL_NOT_FOUND':
        return 'Invalid credentials';
      case 'INVALID_PASSWORD':
        return 'Invalid credentials';
      default:
        return 'Oops, something went wrong'
    }
  }
};
