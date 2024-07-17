const myLibrary = [
  {
    author: "Arthur Conan Doyle",
    title: "Sherlock Holmes",
    pages: 332,
    read: true,
  },
  { author: "J.K. Rowling", title: "Harry Potter", pages: 3122, read: true },
  { author: "Frank Herbert", title: "Dune", pages: 343, read: false },
];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function Book() {
  this.author = "Default";
  this.title = "Default";
  this.pages = 0;
  this.read = false;
}

const addBook = document.getElementById("add-book");
const form = document.getElementById("input-book");

form.addEventListener("submit", addBookToLibrary);

addBook.addEventListener("click", () => {
  if (form.style.visibility === "visible") {
    form.style.visibility = "hidden";
  } else {
    form.style.visibility = "visible";
  }
});

function checkLibrary(myLibrary) {
  if (!myLibrary) return;

  myLibrary.forEach((book) => {
    const bookOnLibrary = bookDisplay(book);
    addEditButton(bookOnLibrary, book);
  });
}

function bookDisplay(book) {
  const library = document.getElementById("library");
  const newBook = document.createElement("div");
  newBook.className = "book";
  const bookAuthor = document.createElement("h4");
  bookAuthor.textContent = `Author: ${book.author}`;
  const bookTitle = document.createElement("h4");
  bookTitle.textContent = `Title: ${book.title}`;
  const bookPages = document.createElement("h4");
  bookPages.textContent = `Pages: ${book.pages}`;
  // const bookRead = document.createElement("h4");
  // bookRead.textContent = book.read ? "Read: True" : "Read: False";
  newBook.appendChild(bookAuthor);
  newBook.appendChild(bookTitle);
  newBook.appendChild(bookPages);
  //newBook.appendChild(bookRead);
  library.appendChild(newBook);

  return newBook;
}

function addBookToLibrary(form) {
  form.preventDefault();
  const book = new Book();

  const author = document.getElementById("author");
  const title = document.getElementById("book-title");
  const pages = document.getElementById("pages");
  const read = document.getElementById("yes");

  book.author = author.value;
  book.title = title.value;
  book.pages = pages.value;
  book.read = read.checked ? true : false;

  myLibrary.push(book);
  addOneBook(book);
}

function addEditButton(bookOnLibrary, bookOnArray) {
  const modifyRead = document.createElement("button");
  modifyRead.className = "modify-read";
  modifyRead.id = `${myLibrary.findIndex(
    (P) => P.author === bookOnArray.author
  )}`;
  modifyRead.innerText = bookOnArray.read ? "Read" : "Not Read";
  if(bookOnArray.read){
    modifyRead.style.backgroundColor = "#96e35b";
  }else{
    modifyRead.style.backgroundColor = "#f76060";
  }
  bookOnLibrary.appendChild(modifyRead);
  return modifyRead;
}

checkLibrary(myLibrary);

function addOneBook(singleBook) {
  const bookOnLibrary = bookDisplay(singleBook);
  const newButton = addEditButton(bookOnLibrary, singleBook);
  modifyReadButtons = document.querySelectorAll(".modify-read");
  newButton.addEventListener("click", ()=>{
    changeButtonState(newButton);
  });
}

let modifyReadButtons = document.querySelectorAll(".modify-read");

modifyReadButtons.forEach((button) => {
  button.addEventListener("click", ()=>{
    changeButtonState(button);
  });
});

function changeButtonState(button) {
  const buttonText = button.textContent;
  const buttonId = button.id;

  if (buttonText === "Read") {
    myLibrary[parseInt(buttonId)].read = false;
    button.textContent = "Not Read";
    button.style.backgroundColor = "#f76060";
  } else {
    myLibrary[parseInt(buttonId)].read = true;
    button.textContent = "Read";
    button.style.backgroundColor = "#96e35b";
  }
}
