import Toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Spinner } from 'spin.js';
import 'spin.js/spin.css';
import * as NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const toastr = () => {
  return Toastr;
};
Toastr.options.closeButton = true;
Toastr.options.hideDuration = 200;

export const spinner = () => {
  return new Spinner({scale: 0.5});
};

export const apiCommonError = (error, spinner) => {
  console.log(error);
  console.log(error.response);
  const errMessage = (error.response && error.response.data && (error.response.data.message || error.response.data.errMessage || error.response.data.sqlMessage)) || error;
  toastr().error(errMessage);
  if (spinner) {
    spinner.stop();
  }
  nProgress.done();
};


export const nProgress = {

  start: () => NProgress.start(),
  done: () => NProgress.done()
};

//NProgress.configure({ minimum: 1 });  