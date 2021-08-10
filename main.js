import Remove from './module/remove.js';
import Add from './module/add.js';

const add = new Add();
const remove = new Remove();
const createNew = document.querySelector('#createNewButton');
const bookContainer = document.querySelector('#book-container');
let allBooks = [];
if (localStorage.getItem('bookList') === null) {
  localStorage.setItem('bookList', []);
}
if (localStorage.getItem('id') === null) {
  localStorage.setItem('id', JSON.stringify(0));
}
const refreshDOM = () => {
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
    const newAuthor = document.createElement('p');
    newTitle.innerText = bookTitle;
    newAuthor.innerText = bookAuthor;
    newBook.id = bookId;
    newBook.appendChild(newTitle);
    newBook.appendChild(newAuthor);
    newBook.appendChild(removeBtn);
    bookContainer.appendChild(newBook);
  });
};
window.onload = refreshDOM;
createNew.addEventListener('click', (e) => {
  e.preventDefault();
  add.add();
  bookContainer.innerHTML = '';
  refreshDOM();
});