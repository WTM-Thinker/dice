import { ledger } from '../vitejs/index';

export default {
  install(Vue) {
    Vue.prototype.$ledger = ledger;
  }
};