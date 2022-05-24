let myLibrary = [];
const libraryContainer = document.querySelector('.library-container');
const newBookBtn = document.querySelector('.new-book');
const modal = document.querySelector('.modal');
const submitBtn = document.querySelector('#submit');


// Adds a new book to the library based on user input
submitBtn.addEventListener('click', () => {
    let newTitle = document.querySelector('#new-title').value;
    let newAuthor = document.querySelector('#new-author').value;
    let newPages = document.querySelector('#new-pages').value;
    let newRead = document.querySelector('#new-read').value;
    console.log(newRead);
    let newData = myLibrary.length;

    addBookToLibrary(newTitle, newAuthor, newPages, isRead(newRead), newData);
    renderPage()
});

// Toggles visibility of the +new book form
newBookBtn.addEventListener('click', () => {
    modal.classList.toggle('visible');
    renderPage();
});

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.data = myLibrary.length;
    }
};


function addBookToLibrary (title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

// Helper function to convert textContent to boolean
function isRead (status) {
    if (status === 'read') {
        return true;
    } else {
        return false
    }
};

// Removes a book from the library
function removeBook (index) {
    myLibrary.splice(index, 1);
};

// addBookToLibrary('Game of Thrones', 'George R.R. Martin', 694, true);
addBookToLibrary('Where the Crawdads Sing', 'Delia Owens', 368, false);
addBookToLibrary('The Lightning Thief', 'Rick Riordan', 416, true);
addBookToLibrary('The Sea of Monsters', 'Rick Riordan', 320, true);
// addBookToLibrary('A Clash of Kings', 'George R.R. Martin', 768, true);
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
    readDiv.classList.add('book-read');
    readDiv.classList.add('status');
    readDiv.classList.add('book-unread')
    const dataDiv = document.createElement('div');
    dataDiv.setAttribute('class', 'book-data');
    const removeDiv = document.createElement('div');
    removeDiv.setAttribute('class', 'book-remove');
    containerDiv.appendChild(titleDiv);
    containerDiv.appendChild(authorDiv);
    containerDiv.appendChild(pagesDiv);
    containerDiv.appendChild(readDiv);
    containerDiv.appendChild(removeDiv);
    containerDiv.appendChild(dataDiv);
    libraryContainer.appendChild(containerDiv);
    titleDiv.textContent = object.title;
    authorDiv.textContent = object.author;
    pagesDiv.textContent = object.pages + ' pages';
    dataDiv.textContent = object.data;
    removeDiv.textContent = 'remove';
    if (object.read === true) {
        readDiv.textContent = 'read';
        readDiv.classList.toggle('book-unread');
    } else {
        readDiv.textContent = 'unread';
        readDiv.classList.toggle('book-read');
    }
};

function renderPage () {
    clearHtml();
    renderLibrary();
    removeSelect();
    statusListener();
};

function renderLibrary () {
    for (let i = 0; i < myLibrary.length; i++ ) {
        BookHtml(myLibrary[i]);
    }
};

function clearHtml () {
    let bookCards = document.querySelectorAll('.book-card');
    for (let i = 0; i < bookCards.length; i++) {
        libraryContainer.removeChild(libraryContainer.lastElementChild);
    }
};

function removeSelect () {
    let removeBtn = document.querySelectorAll('.book-remove');
    let dataReset = document.querySelectorAll('.book-data');
    let x = 0;

    [...dataReset].forEach(item => {
        item.textContent = x;
        x++;
    });

    [...removeBtn].forEach(item => {
        item.addEventListener('click', () => {
            console.log(item.nextSibling.textContent);
            removeBook(item.nextSibling.textContent);
            renderPage();
            }
        )}
    )
};

function changeStatus(index, status) {
    let tempBook = new Book(myLibrary[index].title, myLibrary[index].author, myLibrary[index].pages, !status)
    tempBook.data = parseInt(index);
    myLibrary.splice(index, 1, tempBook);
    renderPage();
    console.log(myLibrary[index]);
};

function statusListener () {
    let statusBtn = document.querySelectorAll('.status');

    [...statusBtn].forEach(item => {
        item.addEventListener('click', () => {
            if (item.textContent === 'read') {
            changeStatus(item.nextSibling.nextSibling.textContent, true);
        } else {
            changeStatus(item.nextSibling.nextSibling.textContent, false);
        }
        })
    });
};

renderPage();