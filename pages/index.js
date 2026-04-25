import { initialTodos, validationConfig } from "../utils/constants.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithTheForm from "../components/PopupWithTheForm.js";
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

const addTodoPopup = new PopupWithTheForm({
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

  formValidator.resetValidation();

 addTodoPopup.close();

  },
}); 
addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos, // pass initial todos
  renderer: (item) => {
    const todo = generateTodo(item);
    todosList.append(todo);
  },

  renderItems() {
  
  },

  addItem(){

  },


  containerSelector: ".todos__list",
});

console.log(section);

// call the renderItems section

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

function deleteFunction(completed) {
if (completed){}
  todoCounter.updateCompleted(false);
}

function updateTodoCounter(completed) {
todoCounter.updateCompleted(completed);
console.log(completed); 
}



// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", updateTodoCounter);
  const todoElement = todo.getView();
  return todoElement;

  //To be removed:
  // const todoElement = todoTemplate.content
  //   .querySelector(".todo")
  //   .cloneNode(true);
  // const todoNameEl = todoElement.querySelector(".todo__name");
  // const todoCheckboxEl = todoElement.querySelector(".todo__completed");
  // const todoLabel = todoElement.querySelector(".todo__label");
  // const todoDate = todoElement.querySelector(".todo__date");
  // const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

  // todoNameEl.textContent = data.name;
  // todoCheckboxEl.checked = data.completed;

  // // Apply id and for attributes.
  // // The id will initially be undefined for new todos.
  // todoCheckboxEl.id = `todo-${data.id}`;
  // todoLabel.setAttribute("for", `todo-${data.id}`);

  // // If a due date has been set, parsing this it with `new Date` will return a
  // // number. If so, we display a string version of the due date in the todo.
  // const dueDate = new Date(data.date);
  // if (!isNaN(dueDate)) {
  //   todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   })}`;
  // }

  // todoDeleteBtn.addEventListener("click", () => {
  //   todoElement.remove();
  // });
};

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
   document.addEventListener("keydown", handleEscapeClose);
    addTodoPopup.close();
  }

};


addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  
  
});

// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopup.close();
// });

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id };
//   renderTodo(values);

//   formValidator.resetValidation();

//  addTodoPopup.close();
// });

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
