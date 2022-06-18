export default class Storage {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  /**
   * Method to set data into local storage
   * @param {string} key
   * @param {TaskModel[]} value
   */
  setData<T>(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  /**
   * Method to get data from local storage
   * @param {string} key
   */
  getData<T>(): T {
    return JSON.parse(localStorage.getItem(this.key) || '{}');
  }
}
