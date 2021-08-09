const bookTitle = document.querySelector('#bookname');
const bookAuthor = document.querySelector('#authorname');
const createNew = document.querySelector('#createNewButton');
const bookContainer = document.querySelector('#book-container');
let allBooks = [];
let id;
class Book {
    id = this.id;
    name = this.name;
    author = this.author;
}
if (localStorage.getItem('bookList')===null){
    localStorage.setItem('bookList', []);
}
if (localStorage.getItem('id')===null){
    localStorage.setItem('id', JSON.stringify(0));
    id = JSON.parse(localStorage.getItem('id'));
}

const refreshDOM = () => {
    allBooks = JSON.parse(localStorage.getItem('bookList'));
    allBooks.forEach(book => {
        const bookTitle = book.name;
        const bookAuthor = book.author;
        const bookId = book.id;
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.addEventListener('click', (e) => {
            let id = e.target.parentNode.id;
            allBooks = allBooks.filter((book) => book.id.toString() !== id.toString());
            localStorage.setItem('bookList', JSON.stringify(allBooks));
            location.reload();
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
}
window.onload = refreshDOM;

createNew.addEventListener('click', (e) => {
    e.preventDefault();
    let name = bookTitle.value;
    bookTitle.value = '';
    let author = bookAuthor.value;
    bookAuthor.value = '';
    id = JSON.parse(localStorage.getItem('id'));
    id+=1;
    localStorage.setItem('id', JSON.stringify(id));
    newBook = new Book();
    newBook.id = id;
    newBook.name = name;
    newBook.author = author;
    if (localStorage.getItem('bookList').length !== 0){
        allBooks = JSON.parse(localStorage.getItem('bookList'));
    } else {
        allBooks = [];
    }
    allBooks.unshift(newBook);
    localStorage.setItem('bookList', JSON.stringify(allBooks));
    bookContainer.innerHTML = '';
    refreshDOM();
})