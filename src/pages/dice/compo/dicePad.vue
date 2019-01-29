<template>
  <div class="dice-container">
    <div class="content-title">Choose Your Bet</div>
    <div class="dice-wrapper">
      <div class="flex" v-for="(col, index) in dices" :key="index+ '0'">
        <div class="dice-wrapper__block flex" v-for="item in col" :key="item.value">
          <img :src="item.choice ? item.img : item.unchoiceImg" @click="clickType(item)"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default{
  components: { 
  },
  props: {},
  data(){
    return {
      dices: [
        [{
          value: 1,
          img: require("../../../assets/dice/1.png"),
          unchoiceImg: require("../../../assets/dice/1-unchoice.png"),
          choice: true
        }],
        [{
          value: 2,
          img: require("../../../assets/dice/2.png"),
          unchoiceImg: require("../../../assets/dice/2-unchoice.png"),
          choice: true
        }, {
          value: 3,
          img: require("../../../assets/dice/3.png"),
          unchoiceImg: require("../../../assets/dice/3-unchoice.png"),
          choice: true
        }],
        [{
          value: 4,
          img: require("../../../assets/dice/4.png"),
          unchoiceImg: require("../../../assets/dice/4-unchoice.png"),
          choice: false
        }, {
          value: 5,
          img: require("../../../assets/dice/5.png"),
          unchoiceImg: require("../../../assets/dice/5-unchoice.png"),
          choice: false
        }, {
          value: 6,
          img: require("../../../assets/dice/6.png"),
          unchoiceImg: require("../../../assets/dice/6-unchoice.png"),
          choice: false
        }]
      ],
      selectArray: [1, 2, 3]
    }
  },
  mounted(){
    this._emit();
  },
  methods: {
    clickType(item) {
      item.choice = !item.choice;
      let array = this.dices[0].concat(this.dices[1]).concat(this.dices[2]);
      let filterArray = array.filter(item=> {
        if (item.choice) {
          return item.value;
        }
      });
      this.selectArray = filterArray.map(item=> item.value);
      if (this.selectArray.length > 5) {
        this._validate(item);
        this.$message('You cannot select more than five dices');
        return;
      }
      if (this.selectArray.length < 1) {
        this._validate(item);
        this.$message('At least one dice');
        return;
      }
      this._emit();
    },
    _emit() {
      this.$emit('selectArray', this.selectArray);
    },
    _validate(item) {
      this.selectArray.pop();
      item.choice = !item.choice;
    }
  }
}
</script>
<style lang="scss" scoped>
.dice-container {
  margin-top: 20px;
  .content-title {
    text-align: center;
    height: 20px;
    font-size:14px;
    font-weight:600;
    line-height:20px;
    text-shadow:0px 2px 11px rgba(74,31,199,0.16);
  }
  .flex {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
  }
  .dice-wrapper__block {
    margin-top: 15px;
    width: 110px;
  }
  
  .dice-wrapper {
    padding: 10px 10px 0 10px;
    .bottom {
      margin-top: 20px;
    }
  }
}
    
</style>