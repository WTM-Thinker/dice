<template>
    <transition name="mint-toast-pop">
        <div v-if="show" :class="'mint-toast ' + customClass">
            {{ message }}
        </div>
    </transition>
</template>

<script>
export default {
    name: 'toast',
    props: {
        message: String,
        type: {
            type: String,
            default: 'info'
        },
        position: {
            type: String,
            default: 'middle'
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        customClass() {
            let classes = [];
            switch (this.position) {
            case 'top':
                classes.push('top');
                break;
            case 'bottom':
                classes.push('bottom');
                break;
            default:
                classes.push('middle');
            }
            classes.push(this.type);

            return classes.join(' ');
        }
    }
};
</script>

<style lang="scss" scoped>

.mint-toast {
    box-sizing: border-box;
    position: fixed;
    background:rgba(0,3,1,1);
    box-shadow:0px 5px 20px 0px rgba(0,214,72,0.17);
    border-radius: 4px;
    min-width: 178px;
    text-align: center;
    padding: 6px 13px;
    z-index: 1000;
    word-break: keep-all;
    font-family:PingFang-SC-Regular;
    line-height: 20px;
    color: white;
    font-weight:400;
    font-size:14px;

    &.top {
        top: 20px;
        left: 50%;
        transform: translate(-50%, 0) scale(1);
        transition: transform .3s ease;
        &.mint-toast-pop-enter,  &.mint-toast-pop-leave-active{
            transform: translate(-50%, 0) scale(0);
        }
    }

    &.middle {
        margin-top: -10px;
        left: 50%;
        top: 50%;
        transition: opacity .4s ease;
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;

        &.mint-toast-pop-enter,  &.mint-toast-pop-leave-active{
            opacity: 0;
        }
    }

    &.bottom {
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0) scale(1);
        transition: transform .3s ease;

        &.mint-toast-pop-enter,  &.mint-toast-pop-leave-active{
            transform: translate(-50%, 0) scale(0);
        }
    }
}
@keyframes rotate {
    0%   { transform: rotate(0deg); }
    25%  { transform: rotate(90deg); }
    50%  { transform: rotate(180deg); }
    75%  { transform: rotate(270deg); }
    100% { transform: rotate(360deg); }
}
</style>


