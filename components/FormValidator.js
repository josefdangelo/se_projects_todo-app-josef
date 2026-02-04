class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings._inputSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._errorClass = settings._errorClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._formElement = formElement;
  }

  // implent other mthods

  _toggleButtonState(inputList, buttonElement) {
    if (inputList.every((inputElement) => inputElement.validity.valid)) {
      buttonElement.classList.remove(this._inactiveButtonClass);
    } else {
      buttonElement.classList.add(this._inactiveButtonClass);
    }
  }

  _checkInputValidity(inputElement) {
    // TODO - IMPLEMENT THIS METHOD
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorMessage);
    } else {
      _hideInputError(this._formElement, this._inputElement);
    }
    // copy (a) body of existing function
    // work through errors in console as we did in the video
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );

    // TODO - FINISH SETTING UP LISTENERS

    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector,
    );
    this._toggleButtonState(this._inputList, this._buttonElement);

    // const buttonElement = formElement.querySelector(
    //   settings.submitButtonSelector,
    // );

    // toggleButtonState(inputList, buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        _checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
        // toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
