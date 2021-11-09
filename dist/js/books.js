class Books {
  constructor(display) {
    this.display = display;
    this.counter = !localStorage.getItem("counter")
      ? localStorage.setItem("counter", 1000)
      : localStorage.getItem("counter");
  }

  addBook(book) {
    let data = JSON.parse(localStorage.getItem("data"));

    !data.categories.includes(book.category) &&
      data.categories.push(book.category);

    this.currentId = 1; //get next id for books
    data.books.push({ id: `${this.currentId}`, ...book }); // add book
    data = localStorage.setItem("data", JSON.stringify(data)); //store new books
    console.log(JSON.parse(localStorage.getItem("data")));
    this.renderBooks();
  }

  renderBooks() {
    this.display.innerHTML = "";
    const data = JSON.parse(localStorage.getItem("data"));
    data.categories.forEach((cat) => {
      //filter by catergory
      const books = data.books.filter((book) => {
        return book.category === cat;
      });
      //render
      const booksContainer = document.createElement("div");
      booksContainer.classList = "books-container";
      booksContainer.innerHTML = `<h3 class="books-container-heading"> ${cat.toUpperCase()}`;
      books.forEach((item) => {
        const bookItem = document.createElement("div");
        bookItem.classList = "book";
        bookItem.setAttribute("data-id", item.id);
        bookItem.innerHTML = `
        <div class="book-title">${item.title}</div>
        <div class="book-author">${item.author}</div>
        <div class="book-genre">${item.genre}</div>
        <div class="book-category">${item.category}</div>
        <div class="book-status">${
          item.isRead ? "" : `<button class="book-read">Read</button>`
        }</div>
        `;
        const del = document.createElement("button");
        del.innerText = "remove";
        del.addEventListener("click", (e) => {
          const bookId = e.target.parentElement.dataset.id;
          this.removeBook(bookId, this.display);
        });
        bookItem.appendChild(del);
        booksContainer.appendChild(bookItem);
        this.display.appendChild(booksContainer);
      });
    });
  }

  removeBook(id) {
    let data = JSON.parse(localStorage.getItem("data"));
    data.books = data.books.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem("data", JSON.stringify(data));
    this.renderBooks();
  }
  set currentId(increment) {
    let counter = Number(localStorage.getItem("counter"));
    counter += increment;
    localStorage.setItem("counter", counter);
    this.counter = localStorage.getItem("counter");
  }
  get currentId() {
    return this.counter;
  }
}
