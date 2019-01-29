import Vue from "vue";
import msgboxVue from "./main.vue";

const MessageBox = Vue.extend(msgboxVue);

let instance = new MessageBox({
  el: document.createElement("div")
});

export default function({
  showMask = true,
  title,
  closeBtn = {
    show: true,
    click: () => {}
  },
  leftBtn = {
    text: "",
    click: () => {}
  },
  rightBtn = {
    text: "",
    click: () => {}
  },
  singleBtn = {
    text: "",
    click: () => {}
  },
  content = ''
}) {
  let _close = (cb) => {
    document.body.removeChild(instance.$el);
    cb && cb();
  };
  instance.showMask = showMask;
  instance.title = title;
  instance.close = () => {
    _close(closeBtn ? closeBtn.click : null)
  };
  instance.leftBtnTxt = leftBtn.text;
  instance.leftBtnClick = () => {
    _close(leftBtn ? leftBtn.click : null)
  }
  instance.rightBtnTxt = rightBtn.text;
  instance.rightBtnClick = () => {
    _close(rightBtn ? rightBtn.click : null)
  }
  instance.singleBtnTxt = singleBtn.text;
  instance.singleBtnClick = () => {
    _close(singleBtn ? singleBtn.click : null)
  }
  instance.content = content;

  document.body.appendChild(instance.$el);
  return true;
}