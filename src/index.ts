import BookController from './book/book.controller';
import BookService from './book/book.service';
import BookView from './book/book.view';

const app: BookController = new BookController(new BookView(), new BookService());

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
