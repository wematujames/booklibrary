const form = document.querySelector(".new-book"),
  checkBoxforRead = document.querySelector("#read"),
  display = document.querySelector(".wrapper"),
  newBookFab = document.querySelector(".fab"),
  popup = document.querySelector(".popup"),
  closePopupBtn = document.querySelector(".close-btn");

//Init local storage from books
if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify({ categories: [], books: [] }));
}

//Global Vars
let isRead = false;

//Render books stored
const books = new Books(display);
books.renderBooks();

//Checkbox control
checkBoxforRead.addEventListener("click", () => {
  isRead = !isRead;
});

//New book FAB
newBookFab.addEventListener("click", () => {
  popup.classList += " show";
});
closePopupBtn.addEventListener("click", () => {
  popup.classList.remove("show");
});

//Add new book
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get book details from form
  const title = form.querySelector("#title"),
    genre = form.querySelector("#genre"),
    author = form.querySelector("#author"),
    category = form.querySelector("#category"),
    err = form.querySelector(".err");

  //Validate book
  if (!title.value || !author.value || !genre.value || !category.value) {
    return showError(err);
  }

  books.addBook({
    title: title.value,
    genre: genre.value,
    author: author.value,
    category: category.value,
    isRead,
  }); //Add new book

  books.renderBooks(); //Update books showing
  clearForm([title, genre, author]); //Clear form
});

//Clear form
function clearForm(fields) {
  fields.forEach((field) => {
    field.value = "";
  });
}

//Show error
function showError(el) {
  el.innerText = `Please complete all fields`;
  el.classList.add("error");
  setTimeout(() => {
    el.innerText = ``;
    el.classList.remove("error");
  }, 3000);
  return;
}
