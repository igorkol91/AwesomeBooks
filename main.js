import Remove from './module/remove.js';
import Add from './module/add.js';

const add = new Add();
const remove = new Remove();
// eslint-disable-next-line
const { DateTime } = luxon;
const now = DateTime.now();
const bookContainer = document.createElement('ul');
const mainContainer = document.querySelector('main');
const mainPage = document.querySelector('#main-page');
const createNewPage = document.querySelector('#create-new-page');
const aboutPage = document.querySelector('#about-page');
const h1 = document.querySelector('h1');
const time = document.querySelector('#time-p');

let allBooks = [];
if (localStorage.getItem('bookList') === null) {
  localStorage.setItem('bookList', []);
}
if (localStorage.getItem('id') === null) {
  localStorage.setItem('id', JSON.stringify(0));
}

const titleCase = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();


const refreshDOM = () => {
  h1.innerText = 'All Awesome Books';
  bookContainer.innerHTML = '';
  mainContainer.innerHTML = '';
  allBooks = JSON.parse(localStorage.getItem('bookList'));
  allBooks.forEach((book) => {
    const bookTitle = book.name;
    const bookAuthor = book.author;
    const bookId = book.id;
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.classList += 'enter-btn';
    removeBtn.addEventListener('click', (e) => {
      const { id } = e.target.parentNode;
      remove.remove(id);
    });
    const newBook = document.createElement('li');
    const newTitle = document.createElement('p');
    newBook.classList += 'd-flex w-100 justify-content-between py-2 my-1';
    newTitle.innerHTML = `"${titleCase(bookTitle)}" by ${titleCase(bookAuthor)}`;
    newBook.id = bookId;
    newBook.appendChild(newTitle);
    newBook.appendChild(removeBtn);
    bookContainer.appendChild(newBook);
    bookContainer.id = 'book-container';
    bookContainer.classList += 'd-flex flex-column align-items-center book-storage';
    mainContainer.appendChild(bookContainer);
  });
};

window.onload = () => {
  refreshDOM();
  time.innerHTML = `${now.c.month} ${now.c.day} ${now.c.year}, ${now.c.hour}:${now.c.minute}:${now.c.second}`;
};

// Create main page with books list

mainPage.addEventListener('click', () => {
  refreshDOM();
});

// Create the form and adding books logic on the Add page

createNewPage.addEventListener('click', (e) => {
  e.preventDefault();
  h1.innerHTML = 'Add a New Book';
  mainContainer.innerHTML = '';
  const form = document.createElement('form');
  form.classList += 'd-flex flex-column';

  const titleInput = document.createElement('input');
  titleInput.classList += 'my-3';
  titleInput.type = 'text';
  titleInput.name = 'bookname';
  titleInput.id = 'bookname';
  titleInput.placeholder = 'Title';
  form.appendChild(titleInput);

  const authorInput = document.createElement('input');
  authorInput.classList += 'my-3';
  authorInput.type = 'text';
  authorInput.name = 'authorname';
  authorInput.id = 'authorname';
  authorInput.placeholder = 'Author';
  form.appendChild(authorInput);

  const addBTN = document.createElement('button');
  addBTN.id = 'createNewButton';
  addBTN.type = 'button';
  addBTN.innerText = 'Submit';
  addBTN.classList += 'enter-btn';
  form.appendChild(addBTN);

  mainContainer.appendChild(form);

  addBTN.addEventListener('click', () => {
    add.add(titleInput.value, authorInput.value);
    titleInput.value = '';
    authorInput.value = '';
  });
});

aboutPage.addEventListener('click', (e) => {
  e.preventDefault();
  h1.innerHTML = 'Contact Information';
  mainContainer.innerHTML = '';
  const paragraph = document.createElement('p');
  paragraph.innerHTML = 'For more information please contact us on: ';
  const list = document.createElement('li');
  list.innerHTML = 'munsamibenge65@gmail.com';
  const list2 = document.createElement('li');
  list2.innerHTML = '+2609657676761';
  const list3 = document.createElement('li');
  const ull = document.createElement('ul');
  ull.classList += 'info text-left';
  list3.innerHTML = 'Welcome to our address';
  list.classList += 'myList';
  list2.classList += 'myList';
  list3.classList += 'myList';
  mainContainer.appendChild(paragraph);
  ull.appendChild(list);
  ull.appendChild(list2);
  ull.appendChild(list3);
  mainContainer.appendChild(ull);
});