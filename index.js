let myLibrary = [];
const libraryContainer = document.querySelector('.library-container');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
};

function addBookToLibrary (title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

addBookToLibrary('Game of Thrones', 'George R.R. Martin', 694, true);
addBookToLibrary('Where the Crawdads Sing', 'Delia Owens', 368, false);
addBookToLibrary('A Clash of Kings', 'George R.R. Martin', 768, true);
addBookToLibrary('The Principles of Object-Oriented JavaScript', 'Nicholas C. Zakas', 120, false);


function BookHtml (object) {
    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('class', 'book-card');
    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'book-title');
    const authorDiv = document.createElement('div');
    authorDiv.setAttribute('class', 'book-author');
    const pagesDiv = document.createElement('div');
    pagesDiv.setAttribute('class', 'book-pages');
    const readDiv = document.createElement('div');
    readDiv.setAttribute('class', 'book-read');
    containerDiv.appendChild(titleDiv);
    containerDiv.appendChild(authorDiv);
    containerDiv.appendChild(pagesDiv);
    containerDiv.appendChild(readDiv);
    libraryContainer.appendChild(containerDiv);
    titleDiv.textContent = object.title;
    authorDiv.textContent = object.author;
    pagesDiv.textContent = object.pages + ' pages';
    if (object.read === true) {
        readDiv.textContent = 'Read'
    } else {
        readDiv.textContent = 'Unread'
        readDiv.setAttribute('class', 'book-unread')
    }
}

function renderLibrary () {
    for (let i = 0; i < myLibrary.length; i++ ) {
        BookHtml(myLibrary[i]);
    }
}

renderLibrary();