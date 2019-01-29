<template>
  <div class="msgbox-container" :class="{ 'gray': showMask }">
    <div class="msgbox-wrapper">
        <div class="msgbox-wrapper_title">
            {{ title }}
            <span v-show="closeIcon" @click="close" class="close-icon __pointer"></span>
        </div>
        <div class="content-wrapper" >
            <div v-if="content" v-html="content"></div>
            <slot></slot>
        </div>
        <div class="bottom">
            <div v-show="singleBtnTxt" class="btn_single" 
                  @click="_singleBtnClick">{{ singleBtnTxt }}</div>
            <div v-show="leftBtnTxt" class="__btn __pointer" 
                  @click="_leftBtnClick">{{ leftBtnTxt }}</div>
            <div v-show="rightBtnTxt" class="__btn btn-right __pointer" 
                  @click="_rightBtnClick">{{ rightBtnTxt }}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showMask: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    closeIcon: {
      type: Boolean,
      default: false
    },
    close: {
      type: Function,
      default: ()=>{}
    },
    leftBtnTxt: {
      type: String,
      default: ''
    },
    rightBtnTxt: {
      type: String,
      default: ''
    },
    singleBtnTxt: {
      type: String,
      default: ''
    },
    leftBtnClick: {
      type: Function,
      default: ()=>{}
    },
    rightBtnClick: {
      type: Function,
      default: ()=>{}
    },
    singleBtnClick: {
      type: Function,
      default: ()=>{}
    },
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    _rightBtnClick() {
        this.rightBtnClick && this.rightBtnClick();
    },
    _leftBtnClick() {
        this.leftBtnClick && this.leftBtnClick();
    },
    _singleBtnClick() {
        this.singleBtnClick && this.singleBtnClick();
    }
  }
};
</script>
<style lang="scss" scoped>
.msgbox-container {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    &.gray {
        background: rgba(0, 0, 0, 0.6);
    }
}
.msgbox-wrapper {
    max-width: 270px;
    display: flex;
    flex-direction: column;
    text-align: center;
    background: #FFFFFF;
    border-radius: 2px;
    .msgbox-wrapper_title{
        box-sizing: border-box;
        padding-top: 24px;
        font-size:17px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(36,39,40,1);
        line-height: 22px;
        .close-icon {
            box-sizing: border-box;
            display: block;
            float: right;
            padding: 30px;
            width: 20px;
            height: 20px;
            background: url('../../assets/dice/close.svg') no-repeat center;
            background-size: 20px 20px;
        }
    }
    .content-wrapper {
        box-sizing: border-box;
        word-break:break-all;
        padding: 12px 16px;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(62,74,89,1);
        line-height:18px;
        position: relative;
    }
    .bottom {
        border-top:1px solid rgba(211,223,239,1);
        color: #0960FE;
        background: #fff;
        text-align: right;
        line-height: 22px;
        font-size: 17px;
        .btn_single {
            box-sizing: border-box;
            padding: 11px 16px;
            text-align: center;
        }
        .__btn {
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            border: 1px solid #dcdfe6;
            border-color: #dcdfe6;
            color: #606266;
            -webkit-appearance: none;
            text-align: center;
            box-sizing: border-box;
            outline: none;
            margin: 0;
            transition: .1s;
            font-weight: 500;
            &.btn-left {
            }
            &.btn-right {
                margin-left: 10px;
                color: #fff;
                background-color: #409eff;
                border-color: #409eff;
            }
        }
        .btn-single {
            width: 100%;
            max-width: 100%;
        }
    }
}
</style>
