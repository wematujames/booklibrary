//new Book Ui
function addBook(el, book) {
  const bookTr = document.createElement("tr");
  bookTr.classList = "book";
  bookTr.innerHTML = `
    <p>${book.title}</p>
    <p>${book.genre}</p>
    <p>${book.author}</p>
    <p>
    ${book.isRead ? "" : `<button class="book-read">Read</button>`}
    </p>
  `;
  el.appendChild(bookTr);
}
//function on book added
function clearForm(arr) {
  arr.forEach((el) => {
    el.value = "";
  });
}
//class for Book
class Book {
  constructor(title, genre, author, read) {
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.isRead = read;
  }
}
function renderItems(display) {
  //Init localstorage for books
  if (!localStorage.getItem("books")) {
    // int Books obj
    localStorage.setItem(
      "books",
      JSON.stringify({
        readBooks: [],
        unReadBooks: []
      })
    );
  }
  //display books
  const unReadBooksArr = JSON.parse(localStorage.getItem("books")).unReadBooks;
  unReadBooksArr.forEach((book) => {
    addBook(display, book);
  });
}
