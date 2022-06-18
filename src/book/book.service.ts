import Book from './book.model';
import DB from '../shared/constant/db';
import Storage from '../shared/storage/storage';
import { defaultData } from '../shared/helpers/default-data';

/**
 * Create New Storage for Books
 */
const booksStorage: Storage = new Storage(DB.DATABASES.BOOKS);

export default class BookService {
  private books: Book[];

  constructor() {
    this.books = [];
  }

  /**
   * Initializing Data From Storage
   */
  initData(): void {
    booksStorage.setData(defaultData);
  }

  /**
  * Handle Get Books
  */
  getBookList(): Book[] {
    const bookList: Book[] = booksStorage.getData();
    return bookList;
  }

  /**
  * Handle Add New Book
  */
  add(book: Book): void {
    const bookList: Book[] = this.getBookList();
    bookList.push(book);
    booksStorage.setData(bookList);
  }

  /**
  * Handle Get Book
  */
  get(id: string): Book {
    const bookList: Book[] = this.getBookList();
    const book: Book = bookList.find((book: Book) => book.id === id);

    return book;
  };

  /**
  * Handle Edit Book
  */
  edit(editBook: Book): void {
    const bookList: Book[] = (this.getBookList() || []).filter(
      (book) => book.id !== editBook.id);
    bookList.push(editBook);
    booksStorage.setData(bookList);
  }

  /**
  * Handle Delete Book
  */
  delete(id: string): void {
    const bookList: Book[] = (this.getBookList() || []).filter(
      (book) => book.id !== id
    );
    booksStorage.setData(bookList);
  };
}
