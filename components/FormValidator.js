class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings._errorClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._formElement = formElement;
  }

  // implent other mthods

_toggleButtonState(inputList, buttonElement) {
  if (inputList.every((inputElement) => inputElement.validity.valid)) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }
}

_checkInputValidity(inputElement) {
    this._errorMessage = 'Please fill out this field.';
    // TODO - IMPLEMENT THIS METHOD
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, this._errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
    // copy (a) body of existing function
    // work through errors in console as we did in the video
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    console.log(errorElement);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
     errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    console.log(inputElement);
  }

  _setEventListeners() {
    console.log(this._inputSelector)
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );

    // TODO - FINISH SETTING UP LISTENERS

    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector,
    );
    //this._toggleButtonState (Rebuild)

    // const buttonElement = formElement.querySelector(
    //   settings.submitButtonSelector,
    // );

    // toggleButtonState(inputList, buttonElement)

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
        // toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }

  //Rebuild what is below here:
  
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    console.log("Form validation enabled");
  }
}

export default FormValidator;
