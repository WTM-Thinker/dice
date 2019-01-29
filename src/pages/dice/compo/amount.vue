<template>
  <div class="amount-container">
    <div class="flex wrapper">
      <div class="amount flex right large-en">
        <div><img src="~assets/dice/reward.png"/></div>
        <div class="amount_value">Rewards <span class="value">{{ reward }}</span>VITE</div>
      </div>
      <div class="amount flex right">
        <div><img src="~assets/dice/loss_percent.png"/></div>
        <div class="amount_value">Odds <span class="value">{{ lossPercent }}X</span></div>
      </div>
    </div>
    <div class="flex wrapper mt16">
      <div class="amount flex right large-en">
        <div><img src="~assets/dice/hit_percent.png"/></div>
        <div class="amount_value">Odds of Winning <span class="value">{{ hitPercent }}%</span></div>
      </div>
      <div class="amount flex right">
        <div><img src="~assets/dice/charge.png"/></div>
        <div class="amount_value">Charge <span class="value">{{ charge }}</span>VITE</div>
      </div>
    </div>
  </div>
</template>
<script>

export default{
  components: { 
  },
  props: {
    amount: {
      type: [Number, String]
    },
    betType: {
      type: Array,
      default: ()=> []
    }
  },
  data(){
    return {
    }
  },
  computed: {
    reward() {
      return (this.amount * this.lossPercent * 0.95 + this.amount * 0.05).toFixed(3);
    },
    charge() {
      return ((this.amount * this.lossPercent - this.amount) * 0.05).toFixed(4);
    },
    betTypeLength() {
      return this.betType.length || 0;
    },
    lossPercent() {
      switch(this.betTypeLength) {
        case 1: return 6; break;
        case 2: return 3; break;
        case 3: return 2; break;
        case 4: return 6/4; break;
        case 5: return 6/5; break;
        default: return 0;
      }
    },
    hitPercent() {
      let data = 0;
      switch(this.betTypeLength) {
        case 1: data = 1/6; break;
        case 2: data = 2/6; break;
        case 3: data = 3/6; break;
        case 4: data = 4/6; break;
        case 5: data = 5/6; break;
        default: data = 0;
      }
      return (data * 100).toFixed(1);
    }
  },
  mounted(){
    
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.amount-container {
  font-family: PingFangSC-Regular;
  .mt16 {
    margin-top: 16px;
  }
  .flex {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }
  .right {
    justify-content: flex-start;
  }
  .value {
    font-family: PingFangSC-Semibold;
    font-weight: 600;
  }
  .wrapper {
    .amount_value {
      margin-left: 4px;
      padding: 3px;
      line-height: 16px;
      background:rgba(255,255,255,0.2);
      border-radius:2px;
    }
    .amount {
      width: 140px;
    }
    .large-en {
      width: 165px;
    }
  }
}
</style>