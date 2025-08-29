const add_book_button = document.getElementById('add-book');
const all = document.getElementById('all');
const dialog = document.querySelector('#inputs');
const form = dialog.querySelector('form');
const cards  = document.getElementById('books-cards');
const cardscontainer = document.getElementById('cardscontainer');
// const remove_button = document.getElementById('');

class Book {
    title;
    author ;
    pages;
    read;
    constructor(t ,a, p, r)
    {
        this.title = t;
        this.author = a;
        this.pages = p;
        this.read = r;
    }
}

add_book_button.addEventListener('click', function () {
    dialog.showModal();
    all.classList.add('blur');
});

document.addEventListener('DOMContentLoaded', () =>{
    let books = JSON.parse(localStorage.getItem('books')) || [];
    show_books(books);
});

function check_title(title) {
    const books = JSON.parse(localStorage.getItem('books')) || []
    let exists = books.some(this_book => this_book.title.toLowerCase() == title.toLowerCase())
    if (exists)
        return true
    return false
}

function  show_books(books) {
    cardscontainer.innerHTML = '';
    for (let i = 0;i < books.length;i++)
    {
        const node = cards.content.cloneNode(true);
        node.querySelector('#_title').textContent = '"' + books[i].title + '"';
        node.querySelector('#_author').textContent = books[i].title;
        node.querySelector('#_pages').textContent = `${books[i].pages} pages`;
        node.querySelector('#read').textContent = books[i].read ? "it's read" : "have not read yet";


        node.querySelector('.remove button').addEventListener('click', ()=>{
            books.splice(i, 1)
            localStorage.setItem('books', JSON.stringify(books))
            show_books(books);
        })
        cardscontainer.appendChild(node);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('.check-box').checked;
    if (form.reportValidity() && !check_title(title)) {
        const book  = new Book(title, author, pages, read)
        dialog.classList.add('closing');
        setTimeout(function() {
            dialog.classList.remove('closing');
            dialog.close();
            all.classList.remove('blur');
            form.reset()
            add_new_book_array(book);
        }, 300);
    }
});

function add_new_book_array(book) {

    let books = JSON.parse(localStorage.getItem('books')) || [];
    let exists  = books.some(new_book => new_book.title.toLowerCase() === book.title.toLowerCase())
    if (!exists)
    {
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        show_books(books)
    }
}

dialog.addEventListener('mousedown', (e) => {
    const rect = dialog.getBoundingClientRect();
    const clickedOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;
    if (clickedOutside) {
        dialog.classList.add('closing');
        setTimeout(() => {
            dialog.classList.remove('closing'); // Clean up the class
            dialog.close();
            all.classList.remove('blur');
            form.reset()
        }, 300)
    }
});


