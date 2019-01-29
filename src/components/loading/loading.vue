<template>
  <transition name="loading-fade" @after-leave="afterLeave">
    <div 
      class="loading-mask"
      v-show="visible">
      <div class="loading-spinner">
        <svg class="loading-circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    afterLeave() {

    }
  }
}
</script>
<style lang="scss" scoped>
  $--loading-spinner-size: 42px !default;
  $common-color: #195BDD;

  .loading-mask {
    position: absolute;
    z-index: 2000;
    background-color: rgba(255, 255, 255, 0.9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.3s;
  }
  .loading-spinner {
    top: 50%;
    width: 100%;
    margin-top: #{- $--loading-spinner-size / 2};
    text-align: center;
    position: absolute;
    .loading-circular {
      height: $--loading-spinner-size;
      width: $--loading-spinner-size;
      animation: loading-rotate 2s linear infinite;
    }
    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: $common-color;
      stroke-linecap: round; 
    }
  }


  .loading-fade-enter, 
  .loading-fade-leave-active {
    opacity: 0;
  }

  @keyframes loading-rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }

</style>
