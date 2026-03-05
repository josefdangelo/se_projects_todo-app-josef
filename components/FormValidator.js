class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings._errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formElement = formElement;
  }

  // implent other mthods

  _toggleButtonState() {
    if (this._inputList.every((inputElement) => inputElement.validity.valid)) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

  _checkInputValidity(inputElement) {
    this._errorMessage = inputElement.validationMessage;
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
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`,
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`,
    );
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _setEventListeners() {
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

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
        // toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }

  resetValidation() {
    this._formElement.reset(); // reset
    this._toggleButtonState(); // this will disable the button
  }

  //Rebuild what is below here:

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
