<template>
    <div class="change-lang-wrapper">
        <span class="lang" @click="toggleLangList">{{ $t('langType') }}</span>
        <span class="iconfont icon" :class="showLang?'i-up':'i-down'" @click="toggleLangList"></span>
        <ul class="lang-list" v-show="showLang">
            <li v-for="(key, index) in messages" :class="{active:key.langType === $t('langType')}" :key="index" @click="changeLocale(index)">{{key.langType}}</li>
        </ul>
    </div>
</template>

<script>
import qs from "query-string";
export default {
  data() {
    return {
      showLang: false,
      messages: this.$i18n.messages
    };
  },
  beforeMount() {
    const lang = qs.parse(location.search)["language"];
    if (lang) {
      const l = /^zh/i.test(lang) ? "zh" : "en";
      this.$i18n.locale = l;
    }
  },
  methods: {
    toggleLangList() {
      this.showLang = !this.showLang;
    },
    changeLocale(locale) {
      const s = qs.parse(window.location.search);
      s["language"] = locale;
      if (history.pushState) {
        const l = window.location;
        const newurl = `${l.protocol}//${l.host}${l.pathname}?${qs.stringify(
          s
        )}`;
        window.history.pushState({ path: newurl }, "", newurl);
      }
      this.$i18n.locale = locale;
      this.toggleLangList();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "bulma/sass/utilities/mixins.sass";
.change-lang-wrapper {
  width: 56px;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  color: #fff;
  letter-spacing: 0;
  .icon {
    color: #fff;
  }
}
.lang-list {
  box-shadow: 0 4px 24px 0 rgba(211, 234, 255, 0.53);
  border-radius: 4px;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 16px;
  padding: 20px 0px;
  color: #919aa3;
  box-sizing: border-box;

  li {
    &.active {
      color: #007ee5;
    }
    list-style: none;
    padding: 5px;
    text-align: center;
    height: 14px;
    line-height: 14px;
  }
}
</style>
