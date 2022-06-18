import FormValue from './form-value';
export const setFormValue = (form: HTMLFormElement, formVale: FormValue) => {
  const listInput: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');
  for (const item of listInput) {
    item.setAttribute('value',formVale[item.name]);
  }
};