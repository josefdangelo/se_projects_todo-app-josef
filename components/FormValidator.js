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
  enableValidation() {}
}

export default FormValidator;
