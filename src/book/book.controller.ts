import BookService from './book.service';
import BookView from './book.view';
import Book from './book.model';
import { createUniqueNumber } from '../shared/helpers/number';

export default class BookController {
  private books: Book[];
  private bookView: BookView;
  private bookService: BookService;

  constructor(bookView: BookView, bookService: BookService) {
    this.bookView = bookView;
    this.bookService = bookService;
    this.add = this.add.bind(this);
    this.get = this.get.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  init():void {
    // Get Data Default
    this.bookService.initData();

    // Render Books
    this.renderBooks();

    // Handling Add Book
    this.bookView.handleAddBook(this.add);

    // Handling Get Book
    this.bookView.handleGetBook(this.get);

    // Handling Edit Book
    this.bookView.handleEditBook(this.edit);

    // Handling Delete Book
    this.bookView.handleDeleteBook(this.delete);
  }

  /**
  * Handling To Render Books
  */
  renderBooks(): void {
    const books: Book[] = this.bookService.getBookList();
    this.bookView.renderBooks(books);
  }

  /**
  * Handling To Create Id
  */
  createUniqueId(): string {
    return createUniqueNumber().toString();
  }

  /**
  * Handling To Create New Book Then Render It
  */
  add(book: Book): void {
    const id: string = this.createUniqueId();
    const newBook: Book = {
      id: id,
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      date: book.date,
      location: book.location,
      edition: book.edition
    }
    this.bookService.add(newBook);
    const books: Book[] = this.bookService.getBookList(); 
    this.bookView.renderBooks(books);
  }

  /**
  * Handling Get Book To Update
  */
  get(id: string): void {
    const book: Book = this.bookService.get(id);
    if (book) {
      this.bookView.showBook(book);
    };
  };

  /**
  * Handling Edit Book Then Render It
  */
  edit(book: Book): void {
    this.bookService.edit(book);
    const books: Book[] = this.bookService.getBookList();
    this.bookView.renderBooks(books);
  }

  /**
  * Handling To Delete New Book Then Render It
  */
  delete(id: string): void {
    this.bookService.delete(id);
    const books: Book[] = this.bookService.getBookList();
    this.bookView.renderBooks(books);
  }
}