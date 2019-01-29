
<template>
  <div class="dice-action-container">
    <div>
      <div class="flex vertical">
        <div>Wagering Amount</div>
        <div class="flex"><img src="~assets/dice/dice_amount.png" class="amount-img"/><span class="balance">{{ balance || 0 }}VITE</span></div>
      </div>
      <div class="flex bottom">
        <input :value="inputAmount" @input="changeInput($event.target.value)" type="text" class="amount-input"/>
        <div 
          class="dice-item __pointer" 
          @click="changeInput(item)" 
          v-for="(item, index) in quickInputs" 
          :key="index">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="btn btn_bet" :class="{'disabled': disabled}" @click="bet">Wager</div>
  </div>
</template>

<script>
import { getContractData,  base64UrlSafeEncodeHexStr } from 'utils/encoder.js';
import bridge from '../bridge';
import { testContractAddr } from "../config.js";
import { handleBigNum } from 'utils/stringFormatter.js';
import { mySetInterval } from 'utils/myInterval.js';

export default{
  components: { 
  },
  props: {
    value: {
      type:[Number, String]
    },
    betType: {
      type: Array,
      default: ()=> []
    },
    currentAddress: {
      type: String,
      default: ""
    }
  },
  data(){
    return {
      inputAmount: null,
      quickInputs: [10, 50, 100],
      balance: null,
      disabled: false
    }
  },
  computed: {
    betNum() {
      return this.betType.join("");
    }
  },
  mounted(){
    this.changeInput(this.value);
    this.loopBalance();
  },
  methods: {
    loopBalance() {
      this.fetchBalance();
      mySetInterval(()=> {
        this.fetchBalance();
      }, 15000);
    },
    fetchBalance() {
      this.$ledger.getBalance(this.currentAddress).then(data=> {
        this.balance = handleBigNum(data, 18)
      }).catch(err=> {
        console.log(err);
      });
    },
    bet() {
      if (this.disabled) return;
      let uri = `vite:${testContractAddr}/?amount=${this.inputAmount}&data=${base64UrlSafeEncodeHexStr(getContractData(`${this.betNum}`))}`;
      let address = this.currentAddress;
      bridge["wallet.sendTxByURI"]({ uri, address }).then(data=> {
        this.fetchBalance();
        setTimeout(()=> {
          this.$confirm({
            title: "Wagering Success",
            content: `<div>You have completed the wagering. Please check your wagering result in Wagering Records. Your Wagering Address: </div><div style="margin-top: 6px; font-family:PingFangSC-Semibold;">${this.currentAddress}</div>`,
            singleBtn:{
              text: "Close"
            }
          });
        }, 1000);
      }).catch(err=> {
        console.log(err);
      })
    },
    integer(str) {
      if (!(/^-?\d+$/).test(str)) {
        return false;
      }
      return true;
    },
    positiveIntNum(str) {
      return this.integer(str) && parseInt(str) > 0;
    },
    validateInput(val) {
      val = val && (val+"").trim() || "";
      if (!val) {
        this.disabled = true;
        this.$message("Your input cannot be empty");
        return false;
      }
      if(!this.positiveIntNum(val) || val > 100) {
        this.disabled = true;
        this.$message("Wagering amount must be an integer within 1~100");
        return false;
      }
      this.disabled = false;
      return true;
    },
    changeInput(val) {
      this.inputAmount = val;
      if (this.validateInput(val)) {
        this.$emit('input', val);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dice-action-container {
  margin-top: 25px;
  .flex {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }
  .balance {
    font-family: PingFang-SC-Regular;
  }
  .vertical {
    line-height: 20px;
  }
  .amount-img {
    margin-right: 4px;
  }
  input {
    border: none;
    border-radius:4px;
  }
  .amount-input {
    box-sizing: border-box;
    color: #009F36;
    padding-left: 10px;
    background-image: url("~assets/dice/amount_input.png");
    background-repeat:no-repeat;
    background-size:101% 100%;
    height: 36px;
    width: 153px;
    min-width: 120px;
  }
  .dice-item {
    color: #009F36;
    width: 42px;
    height: 36px;
    border-radius:4px;
    background: rgba(255,255,255,1);
    line-height: 36px;
    text-align: center;
    background-image: url("~assets/dice/amount_btn_unchoice.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
  }
  .bottom {
    margin-top: 20px;
  }
  .btn {
    background-image: url("~assets/dice/dice_btn.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    margin-top: 25px;
    text-align: center;
    font-size:14px;
    line-height: 38px;
    height:44px;
    font-weight:600;
    &.disabled {
      background-image: url("~assets/dice/dice_btn_disabled.png");
    }
  }
}
</style>
