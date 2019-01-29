import Vue from 'vue';
import Loading from './loading.vue';

const Mask = Vue.extend(Loading);

const loadingDirective = {};
loadingDirective.install = Vue => {
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      Vue.nextTick(()=> {
        el.originalPostion = el.style['position'];
        insertDom(el, el, binding);
      })
    } else {
      el.instance.visible = false;
    }
  };

  const insertDom = (parent, el, binding) => {
    parent.appendChild(el.mask);
    Vue.nextTick(() => {
      el.instance.visible = true;
    });
  }

  Vue.directive('loading', {
    bind: function(el, binding, vnode) {
      const mask = new Mask({
        el: document.createElement('div'),
      });
      el.instance = mask;
      el.mask = mask.$el;
      binding.value && toggleLoading(el, binding);
    },
    update: function(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },
    unbind: function(el, binding) {

    }
  })
}

export default loadingDirective;