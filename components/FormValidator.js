class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings._formSelector;
    this._inputSelector = settings._inputSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._errorClass = settings._errorClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._formElement = formElement;
    
  }

  // implent other methods

  _checkInputValidity(inputElement) {
    // TODO - IMPLEMENT THIS METHOD
    // copy (a) body of existing function
    // work through errors in console as we did in the video
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );

    // TODO - FINISH SETTING UP LISTENERS
    // const buttonElement = formElement.querySelector(
    //   settings.submitButtonSelector,
    // );

    // toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
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
