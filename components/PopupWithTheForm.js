import Popup from "./Popup.js";

class PopupWithTheForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    //Save handleFormSubmit to the this object
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputlist = this._popupElement.querySelector(".popup__form");
    this._inputlist.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  } //get input values from the form and return them as an object

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector(".popup__form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        const inputValues = this._getInputValues();
        this._handleFormSubmit(evt);
      });
    //call handleFormSubmit
  }
}

export default PopupWithTheForm;
