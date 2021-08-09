const bookTitle = document.querySelector('#bookname');
const bookAuthor = document.querySelector('#authorname');
const createNew = document.querySelector('#createNewButton');
const bookContainer = document.querySelector('#book-container');

let allBooks = [];
let id = 0;
class Book {
    id = this.id;
    name = this.name;
    author = this.author;
}

const refreshDOM = () => {
    allBooks.forEach(book => {
        const bookTitle = book.name;
        const bookAuthor = book.author;
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        const newBook = document.createElement('li');
        const newTitle = document.createElement('p');
        const newAuthor = document.createElement('p');
        newTitle.innerText = bookTitle;
        newAuthor.innerText = bookAuthor;
        newBook.id = id;
        newBook.appendChild(newTitle);
        newBook.appendChild(newAuthor);
        newBook.appendChild(removeBtn);
        bookContainer.appendChild(newBook);
        });
}

createNew.addEventListener('click', (e) => {
    e.preventDefault();
    let name = bookTitle.value;
    let author = bookAuthor.value;
    id+=1;
    newBook = new Book();
    newBook.id = id;
    newBook.name = name;
    newBook.author = author;
    allBooks.unshift(newBook);
    bookContainer.innerHTML = '';
    refreshDOM();
})
