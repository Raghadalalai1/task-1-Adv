class Book {
    #title
    #author
    #category
    #isAvailable
    constructor(title,
        author,
        category,
        isAvailable,) {
        this.#title = title
        this.#author = author
        this.#category = category
        this.#isAvailable = isAvailable
    }
    getTitle() {
        return this.#title
    }
    getAuthor() {
        return this.#author
    }
    getCategory() {
        return this.#category
    }
    getIsAvailable() {
        return this.#isAvailable
    }
    setTitle(title) {
        this.#title = title
    }
    setAuthor(auther) {
        this.#author = auther
    }
    setCategory(category) {
        this.#category = category
    }
    setIsAvailable(isavilable) {
        this.#isAvailable = isavilable
    }
    displayInfo() {
        return {
            title: this.#title,
            author: this.#author,
            category: this.#category,
            state: this.#isAvailable ? 'Avilable' : 'not Avilable',
            isAvailable: this.#isAvailable,

        }



    }
    toggleAvailability() {
        this.#isAvailable = !this.#isAvailable
    }
}
class ReferenceBook extends Book {
    #locationCode

    constructor(title, author, category, isAvailable, locationCode) {
        super(title, author, category, isAvailable)
        this.#locationCode = locationCode

    }
    getLocationCode() {
        return this.#locationCode
    }
    setLocationCode(locCode) {
        this.#locationCode = locCode
    }
    displayInfo() {
        let parentConstructorInfo = super.displayInfo()
        return {
            ...parentConstructorInfo,
            locationCode: this.#locationCode,
            type: 'Reference Book'
        }
    }
}
class Library {
    #books = []
    constructor(books = []) {
        this.#books = books
    }


    addBook(book) {
        this.#books.push(book)
    }
    removeBook(title) {
        return this.#books = this.#books.filter(book => book.getTitle() !== title)
    }
    searchBooks(title) {
        let lowerCaseTitel = title.toLowerCase()
        return this.#books.filter(book => book.getTitle().toLowerCase().includes(lowerCaseTitel) || book.getAuthor().toLowerCase().includes(lowerCaseTitel))
    }
    filterByCategory(category) {

        if (category === 'All' || category === '') {
            return this.#books;
        } else {
            return this.#books.filter(book => book.getCategory().toLowerCase() === category.toLowerCase());
        }
    }
    toggleAvailability(title) {
        let bookToggle = this.#books.find(book => book.getTitle() === title)
        if (bookToggle) {
            bookToggle.toggleAvailability()
            return true
        }
        else {
            return false
        }

    }
    getAllBooks() {
        return [...this.#books]
    }


}


let myLibrary = new Library()
const bookForm = document.getElementById('add-book-form')
const inputTitle = document.getElementById('book-title')
const inputAuthor = document.getElementById('book-author')
const inputCategory = document.getElementById('bookCategory')
const inputLocationGroup = document.getElementById('location-code-group')
const inputLocation = document.getElementById('location-code')
const inputButton = document.getElementById('form-btn')
const inputCheckBox = document.getElementById('isAvilabileBookCheckbox')
const inputSearch = document.getElementById('search-input')
const inputSelectCategory = document.getElementById('bookCategory1')
const cardsCategories = document.getElementById('cardsbooks-container')

function renderBooks(booksToRender) {
    cardsCategories.innerHTML = " "
    if (booksToRender.length === 0) {
        return cardsCategories.innerHTML = `<div style="display:flex;  align-items: center;justify-content: center; width:100%" ><p style=" color: #dc143c; font-weight:700 ;font-size:30px;">There are not any book ! </p></div>`
    }
    booksToRender.forEach(book => {
        const bookInfo = book.displayInfo()
        const card = document.createElement('div')
        card.classList.add('card-book')
        card.setAttribute('data-title', bookInfo.title)
        let additionalInfo = '';
        if (bookInfo.type === 'Reference Book') {
            additionalInfo = ` <p><i class="fa-solid fa-location-crosshairs" style="color: #ffffff;"></i><span> the LocationCode :</span>${bookInfo.locationCode}</p>`;
        }
        card.innerHTML = `
    <div class='card-con'>
   <div class='title-icon'>

   <i class="fa-solid fa-book" style="color: #ffffff; font-size:24px"></i> 
   <h3>${bookInfo.title}</h3>
   </div>
<div class='card-info'>
    <p><i class="fa-solid fa-user" style="color: #ffffff;"></i><span> the Author :</span>${bookInfo.author}</p>
    <p><i class="fa-solid fa-layer-group" style="color: #ffffff;"></i><span> the Category :</span>${bookInfo.category}</p>
   ${additionalInfo}
    
 <div style="display: flex;align-items: center;justify-content: flex-start; gap:7px">
 ${bookInfo.isAvailable ? '<i class="fa-solid fa-check" style="color: #ffffff;"></i>' : '<i class="fa-solid fa-xmark" style="color: #ffffff;"></i>'}   <p class=${bookInfo.isavilable ? 'avillable' : 'notavilabel'}><span> the state :</span>${bookInfo.state}</p>
</div>
 </div>
    <div class='button-group'>
    <button class=${bookInfo.isAvailable ? 'toggle-availability-btn':'toggle-notavailability-btn'} data-book-title="${bookInfo.title}">${bookInfo.isAvailable ? 'Available' : 'Not Available'}</button>
    <button class="remove-button" data-book-title="${bookInfo.title}">Remove</button>
    </div>


    
    </div>
    
    
    `
        cardsCategories.appendChild(card)



    });
    document.querySelectorAll('.toggle-availability-btn').forEach(
        button => {
            button.addEventListener('click', (event) => {
                const title = event.target.dataset.bookTitle
                myLibrary.toggleAvailability(title)
                renderBooks(myLibrary.getAllBooks())
            })
        }
    )
    document.querySelectorAll('.toggle-notavailability-btn').forEach(
        button => {
            button.addEventListener('click', (event) => {
                const title = event.target.dataset.bookTitle
                myLibrary.toggleAvailability(title)
                renderBooks(myLibrary.getAllBooks())
            })
        }
    )
    document.querySelectorAll(".remove-button").forEach(button => {
        button.addEventListener('click', (event) => {
            const title = event.target.dataset.bookTitle
            myLibrary.removeBook(title)
            renderBooks(myLibrary.getAllBooks())

        })
    })

}

function filterAndsearching() {
    const searchValue = inputSearch.value.trim();
    const categoryValue = inputSelectCategory.value;

    let filteredBooks = myLibrary.filterByCategory(categoryValue);
    let searchedBooks = myLibrary.searchBooks(searchValue);


    let finalResultBook = filteredBooks.filter(fbook =>
        searchedBooks.some(sbook => sbook.getTitle() === fbook.getTitle())
    );
    renderBooks(finalResultBook);
}
bookForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const titleValue = inputTitle.value.trim()
    const authorValue = inputAuthor.value.trim()
    const categoryValue = inputCategory.value
    const isAvailableValue = inputCheckBox.checked
    const locationCodeValue = inputLocation.value.trim()
    let newBook
    if (categoryValue === 'Reference') {
        newBook = new ReferenceBook(titleValue, authorValue, categoryValue, isAvailableValue, locationCodeValue)

    } else {
        newBook = new Book(titleValue, authorValue, categoryValue, isAvailableValue)

    }
    myLibrary.addBook(newBook)
    bookForm.reset()
    inputLocationGroup.style.display = 'none';
    renderBooks(myLibrary.getAllBooks())
})
inputCategory.addEventListener('change', () => {
    if (inputCategory.value === 'Reference') {
        inputLocationGroup.style.display = 'flex'
        inputLocation.setAttribute('required', 'required')

    }
    else {
        inputLocationGroup.style.display = 'none'
        inputLocation.removeAttribute('required')
        inputLocation.value = ''
    }
})

inputSearch.addEventListener('input', filterAndsearching)
inputSelectCategory.addEventListener('change', filterAndsearching)

myLibrary.addBook(new Book('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', true));
myLibrary.addBook(new ReferenceBook('Advanced Algorithms', 'Thomas Cormen', 'Computer Science', true, 'CS-A101'));
myLibrary.addBook(new Book('1984', 'George Orwell', 'Dystopian', false));
myLibrary.addBook(new Book('To Kill a Mockingbird', 'Harper Lee', 'Fiction', true));
myLibrary.addBook(new ReferenceBook('Physics and Engineers', 'Serway', 'Science', false, 'PH-B205'));
myLibrary.addBook(new Book('Pride and Prejudice', 'Jane Austen', 'Romance', true));


renderBooks(myLibrary.getAllBooks());





