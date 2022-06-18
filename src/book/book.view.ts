import Book from './book.model';
import FormValue from '../shared/helpers/form-value';
import { getFormValue } from '../shared/helpers/get-value-field';
import { setFormValue } from '../shared/helpers/set-value-field';
import ERROR from '../shared/constant/error';

export default class BookView {
  bookList: HTMLElement;
  btnAdd: HTMLButtonElement;
  btnUpdate: HTMLButtonElement;
  form: HTMLFormElement;
  notIsbn: HTMLElement;
  notTitle: HTMLElement;
  notAuthor: HTMLElement;
  notDate: HTMLElement;
  notLocation: HTMLElement;
  notEdition: HTMLElement;

  constructor() {
    this.bookList = document.querySelector('.list-book') as HTMLElement;
    this.btnAdd = document.getElementById('btn-add') as HTMLButtonElement;
    this.btnUpdate = document.getElementById('btn-update') as HTMLButtonElement;
    this.form = document.getElementById('book-form') as HTMLFormElement;
    this.notIsbn = document.getElementById('text-isbn') as HTMLElement;
    this.notTitle = document.getElementById('text-title') as HTMLElement;
    this.notAuthor = document.getElementById('text-author') as HTMLElement;
    this.notDate = document.getElementById('text-date') as HTMLElement;
    this.notLocation = document.getElementById('text-location') as HTMLElement;
    this.notEdition = document.getElementById('text-edition') as HTMLElement;
  }

  /**
  * Render Books
  */
  renderBooks(taskBooks: Book[]) {
    let tr: string = '';
    for (const book of taskBooks) {
      tr += `
      <tr>
        <td>${book.isbn}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.date}</td>
        <td>${book.location}</td>
        <td>${book.edition}</td>
        <td>
          <a class="btn btn-warning btn-edit" bookEdit='${book.id}'>Edit</a>
          <a class="btn btn-danger btn-del" bookDel='${book.id}'>Delete</a>
        </td>
      </tr>
      `;
    }

    // Add List Data Table To Body
    this.bookList.innerHTML = tr;
  };

  /**
  * Handling To Create Book
  */
  handleAddBook(handler: (book: Book) => void) {
    this.btnAdd.addEventListener('click', () => {

      // Get Value Form
      const book: Book = this.getValueForm();

      const validForm: boolean = this.checkValiDate(book);
      // CheckValidate Book
      if (!validForm) {
        handler(book);
        this.form.reset();
      };
    });
  };

  /**
  * Handling Get Book
  */
  handleGetBook(handler: (id: string) => void) {
    this.bookList.addEventListener('click', event => {
      const btnEdit: HTMLButtonElement = <HTMLButtonElement>event.target;
      const id: string = btnEdit.getAttribute('bookEdit');
      handler(id);
    });
  };

  /**
  * Handling To Show Book
  */
  showBook (book: Book): void {
    const formValue: FormValue = {};
    Object.keys(book).forEach( (key) => {
      formValue[key] = book[key];
    });

    setFormValue(this.form, formValue);
    this.btnUpdate.classList.remove('disabled');
    this.btnAdd.classList.add('disabled');
  };

  /**
  * Handling Edit Book
  */
  handleEditBook(handler: (book: Book) => void) {
    this.btnUpdate.addEventListener('click', () => {

      // Get Value Form
      const book: Book = this.getValueForm();

      const validForm: boolean = this.checkValiDate(book);
      // CheckValidate Book
      if(!validForm) {
        handler(book);
        this.form.reset();
        this.btnUpdate.classList.add('disabled');
        this.btnAdd.classList.remove('disabled');
      };
    });
  };

  /**
  * Handling To Delete Book
  */
  handleDeleteBook(handler: (id: string) => void) {
    this.bookList.addEventListener('click', (event) => {
      const btnDel: HTMLButtonElement = <HTMLButtonElement>event.target;
      const bookId: any = btnDel.getAttribute('bookDel');
      handler(bookId);
    });
  };

  /**
  * Get Value Form Book
  */
  getValueForm(): Book {
    const formValue: FormValue = getFormValue(this.form as HTMLFormElement);
    const book: Book = {
      id: formValue.id,
      isbn: formValue.isbn,
      title: formValue.title,
      author: formValue.author,
      date: new Date(formValue.date),
      location: formValue.location,
      edition: formValue.edition
    }
    return book;
  }

  /**
  * CheckValidate Book
  */
  checkValiDate(book: Book): boolean {
    let checkErrorIsbn: boolean;
    let checkErrorTitle: boolean;
    let checkErrorAuthor: boolean;
    let checkErrorDate: boolean;
    let checkErrorLocation: boolean;
    let checkErrorEdition: boolean;

    if (book.isbn === '') {
      this.notIsbn.textContent = ERROR.MESSAGES.ERROR_ISBN;
    } else {
      this.notIsbn.textContent = '';
      checkErrorIsbn = true;
    }

    if (book.title === '') {
      this.notTitle.textContent = ERROR.MESSAGES.ERROR_TITLE;
    } else {
      this.notTitle.textContent = '';
      checkErrorTitle = true;
    }

    if (book.author === '') {
      this.notAuthor.textContent = ERROR.MESSAGES.ERROR_AUTHOR
    } else {
      this.notAuthor.textContent = '';
      checkErrorAuthor = true;
    }

    if (book.date.getTime().toString() == 'NaN') {
      this.notDate.textContent = ERROR.MESSAGES.ERROR_DATE;
    } else {
      this.notDate.textContent = '';
      checkErrorDate = true;
    }

    if (book.location === '') {
      this.notLocation.textContent = ERROR.MESSAGES.ERROR_LOCATION;
    } else {
      this.notLocation.textContent = '';
      checkErrorLocation = true;
    }

    if (book.edition === '') {
      this.notEdition.textContent = ERROR.MESSAGES.ERROR_EDITION
    } else {
      this.notEdition.textContent = '';
      checkErrorEdition = true;
    }

    return (!(checkErrorIsbn &&
      checkErrorTitle &&
      checkErrorAuthor &&
      checkErrorLocation &&
      checkErrorEdition
      ));
  };
}

