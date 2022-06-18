import FormValue from './form-value';
export const getFormValue = (form: HTMLFormElement): FormValue => {
  const listInput: NodeListOf<HTMLInputElement>  = form.querySelectorAll('input');
  let formVale: FormValue = {};
  for (const item of listInput) {
    const name: string = item.getAttribute('name');
    const value: string = item.value;
    formVale[name] = value;
  }
  return formVale;
};