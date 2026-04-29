import { initialTodos, validationConfig } from "../utils/constants.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
//import
//instantiate
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template"); -> remove
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (data) => {
    console.log(data);
    // TODO - move code from existing submission handlerto here

    const name = data.name;
    const dateInput = data.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);
    // Add this line to increment the counter
    todoCounter.updateTotal(true); // true = increment by 1
    formValidator.resetValidation();

    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos, // pass initial todos
  renderer: (item) => {
    const todo = generateTodo(item);
    return todo; // ← Just return, don't append
  },

  containerSelector: ".todos__list",
});

console.log(section);

function deleteFunction(completed) {
  // Always decrement total (every deleted todo reduces the total)
  todoCounter.updateTotal(false);

  // Only decrement completed if the deleted todo was completed
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function updateTodoCounter(completed) {
  todoCounter.updateCompleted(completed);
  console.log(completed);
}

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    updateTodoCounter,
    deleteFunction,
  );
  const todoElement = todo.getView();
  return todoElement;

};

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    document.addEventListener("keydown", handleEscapeClose);
    addTodoPopup.close();
  }
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});


const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

initialTodos.forEach((item) => {
  renderTodo(item); // just one line of code instead of the 2 lines
});

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

//const newFormValidator = new FormValidator(validationConfig, addTodoForm);
//newFormValidator.enableValidation();
