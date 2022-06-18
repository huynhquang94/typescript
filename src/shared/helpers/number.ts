/**
* Create a unique number
*/
export const createUniqueNumber = (): number => {
  return new Date().getTime();
};