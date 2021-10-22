const form = document.querySelector(".new-book"),
  checkBoxforRead = document.querySelector("#read"),
  bookList = document.querySelector(".booklist"),
  newBookFab = document.querySelector(".fab"),
  popup = document.querySelector(".popup"),
  closePopupBtn = document.querySelector(".close-btn");

//Global Vars
let unReadBooks;
let isRead = false;
//Render books already in local storage;
renderItems(bookList);
//Checkbos stuff
checkBoxforRead.addEventListener("click", () => {
  isRead = !isRead;
});
//new book show on fab
newBookFab.addEventListener("click", () => {
  popup.classList += " show";
});
closePopupBtn.addEventListener("click", () => {
  popup.classList.remove("show");
});
//on form sumbit
// localStorage.removeItem("books");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { target } = e;
  const title = target.querySelector("#title").value,
    genre = target.querySelector("#genre").value,
    author = target.querySelector("#author").value,
    read = isRead,
    msg = target.querySelector(".msg");

  if (!title || !author || !genre) {
    msg.innerText = `Please complete all field`;
    msg.classList.add("error");
    setTimeout(() => {
      msg.innerText = ``;
      msg.classList.remove("error");
    }, 3000);
    return;
  }
  const newBook = new Book(title, genre, author, read);
  const books = JSON.parse(localStorage.getItem("books"));
  if (!newBook.isRead) {
    books.unReadBooks.push(newBook);
  } else {
    books.readBooks.push(newBook);
  }
  localStorage.setItem("books", JSON.stringify(books));
  renderItems(bookList);
  clearForm([title, genre, author]);
});
