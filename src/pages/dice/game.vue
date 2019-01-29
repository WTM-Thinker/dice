<template>
  <div class="app-container" v-if="loaded && currentAddress">
    <div class="game-content">
      <amount :amount="inputValue" :bet-type="betType"></amount>
      <router-link to="/help">
        <div class="btn-help">Help</div>
      </router-link>
      <dice-pad @selectArray="getDiceType"></dice-pad>
      <dice-input v-model="inputValue" :bet-type="betType" :current-address="currentAddress"></dice-input>
    </div>
    <div class="table-content">
      <tab-list :current-address="currentAddress" class="tab-list-content"></tab-list>
    </div>
  </div>
  <div class="pc-container" v-else-if="loaded && !currentAddress">
    <div class="pc-container__head flex">
      <img src="~assets/dice/pc.png"/>
      <div class="head__title">Dice Game</div>
    </div>
    <div class="flex flex-location">
      <pc></pc>
      <div class="pc-container__code">
        <div class="flex flex-location">
          <div class="pc-container__bg flex flex-location">
            <qrcode :text="currentAddress" 
                  :options="{ size:220 }" 
                  @genImage="getImage" class="qrcode"></qrcode>
          </div>
        </div>
        <div class="qr-scan">Please scan the QRcode and download <span style="color: #FFAC12;">「 Vite App 」</span>to play</div>
      </div>
    </div>
  </div>
  <div v-else class="not-version">Sorry, this game cannot be supported on current environment :(</div>
</template>

<script>
import qrcode from 'components/qrcode';
import tabList from './compo/tabList';
import dicePad from './compo/dicePad';
import diceInput from './compo/diceInput';
import amount from './compo/amount';
import pc from './help/pc';
import bridge from './bridge';

export default {
  components: { 
    qrcode,
    dicePad,
    diceInput,
    amount,
    tabList,
    pc
  },
  data(){
    return {
      qrcode: null,
      inputValue: 1,
      betType: [],
      currentAddress: null,
      loaded:false
    }
  },
  created() {
    bridge["app.setWebTitle"]({title: "Dice Game"});
    this.getCurrentAddr();
  },
  methods: {
    getCurrentAddr() {
      // let test = "vite_fb552ead179793d680d8ae3410ebbf4c6551cbef6ba4374edf";
      bridge["wallet.currentAddress"]().then(data=> {
        this.currentAddress = data;
        console.log("crr",data);
        this.loaded = true;
      }).catch(err=> {
        console.log(err);
        // this.currentAddress = test;
        this.loaded = true;
      });
    },
    getImage(i) {
      this.qrcode = i;
    },
    getDiceType(arr) {
      this.betType = arr;
    }
  }

}
</script>
<style lang="scss" scoped>
  .app-container {
    box-sizing: border-box;
    color: white;
    background-color: #007628;
    padding-bottom: 24px;
  }
  .flex {
    display: flex;
    display: -webkit-flex;
  }
  .flex-location {
    align-items: center;
    justify-content: center;
  }
  .game-content {
    box-sizing: border-box;
    background: url('~assets/dice/bg.png');
    background-position: 100% 0;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 14px 24px 18px 24px;
  }
  .table-content {
    box-sizing: border-box;
    border-radius: 4px;
    border: 2px solid white;
    margin: 0 24px 0px 24px;
    background:rgba(126,190,97,0.5);
    padding: 20px 0 0 0;
  }
  .pc-container {
    box-sizing: border-box;
    padding: 99px 124px 0 124px;
    color: white;
    background: url("~assets/dice/pc-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat; 
    width: 100%;
    height: 100%;
    .pc-container__head {
      height: 62px;
      font-size:24px;
      margin-bottom: 60px;
      .head__title {
        margin-left: 23px;
        line-height: 62px;
      }
    }
    .pc-container__code {
      margin-left: 120px;
      text-align: center;
      .pc-container__bg {
        width: 275px;
        height: 275px;
        background: url("~assets/dice/scan.png") no-repeat;
      }
      .qr-scan {
        margin-top: 28px;
        font-size:20px;
        line-height: 28px;
      }
    }
  }
 
  .btn-help {
    position: absolute;
    right: 0;
    top: 158px;
    width: 45px;
    height: 30px;
    line-height: 27px;
    color: white;
    text-align: center;
    background: url("~assets/dice/help.png") no-repeat;
  }
  .not-version {
    text-align: center;
    vertical-align: center;
  }
</style>




