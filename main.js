import Remove from './module/remove.js';
import Add from './module/add.js';

const add = new Add();
const remove = new Remove();
const { DateTime } = luxon;
const now = DateTime.now();
const bookContainer = document.createElement('ul');
const mainContainer = document.querySelector('main');
const mainPage = document.querySelector('#main-page');
const createNewPage = document.querySelector('#create-new-page');
let allBooks = [];
if (localStorage.getItem('bookList') === null) {
  localStorage.setItem('bookList', []);
}
if (localStorage.getItem('id') === null) {
  localStorage.setItem('id', JSON.stringify(0));
}
const refreshDOM = () => {
  console.log(now.c.year);
  console.log(now.c.hour);
  console.log(now.c.minute);
  mainContainer.innerHTML = '';
  allBooks = JSON.parse(localStorage.getItem('bookList'));
  allBooks.forEach((book) => {
    const bookTitle = book.name;
    const bookAuthor = book.author;
    const bookId = book.id;
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.addEventListener('click', (e) => {
      const { id } = e.target.parentNode;
      remove.remove(id);
    });
    const newBook = document.createElement('li');
    const newTitle = document.createElement('p');
    newBook.classList += 'd-flex w-50 justify-content-between pb-4';
    newTitle.innerHTML = `${bookTitle} by ${bookAuthor}`;
    newBook.id = bookId;
    newBook.appendChild(newTitle);
    newBook.appendChild(removeBtn);
    bookContainer.appendChild(newBook);
    bookContainer.id = 'book-container';
    bookContainer.classList += 'w-50 d-flex flex-column align-items-center';
    mainContainer.appendChild(bookContainer);
  });
};
window.onload = refreshDOM;

// Create main page with books list

mainPage.addEventListener('click', () => {
  refreshDOM();
});

// Create the form and adding books logic on the Add page

createNewPage.addEventListener('click', (e) => {
  e.preventDefault();
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
  form.appendChild(addBTN);

  mainContainer.appendChild(form);

  addBTN.addEventListener('click', () => {
    add.add(titleInput.value, authorInput.value);
    titleInput.value = '';
    authorInput.value = '';
  });
});
