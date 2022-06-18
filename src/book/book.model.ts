export default interface Book {
  readonly id: string;
  isbn: string
  title: string;
  author: string;
  date: Date;
  location: string;
  edition: string;
}
