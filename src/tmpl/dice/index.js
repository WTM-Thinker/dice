import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import 'normalize.css';
import '../../styles';
import '../../styles/dice';
import App from "pages/dice";
import i18nConfig from "i18n/dice";
import {getUrlKey} from "utils/platform";
import MessageBox from 'components/message-box/main.js';
import Message from 'components/message/main.js';
import LoadingDirective from 'components/loading/directive.js';
import plugin from 'pages/dice/plugins/addPlugin';
import help from 'pages/dice/help';
import game from "pages/dice/game";
Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.use(plugin);
Vue.use(LoadingDirective);
Vue.prototype.$confirm = MessageBox;
Vue.prototype.$message = Message;


let localize = getUrlKey('localize')
window.selfDefinedI18n = localize

const i18n = new VueI18n(i18nConfig());
const routes=[
  {name: "game", path: '/', component: game }, {name:"help", path: '/help', component: help }
]
const router = new VueRouter({routes});
  
document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
});
document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    router,
    i18n,
});