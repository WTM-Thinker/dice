<template>
  <div class="tab-list-container">
    <div class="game-table">
      <div class="tab-wrapper">
        <div class="tab-wrapper__header whole-record" :class="{'is-active': tabParams === 'whole'}" @click="clickTab('whole')">Wagering Records</div>
        <div class="tab-wrapper__header my-record" 
             :class="{'is-active': tabParams === 'single'}" 
              @click="clickTab('single')">
              My Records
        </div>
      </div>
      <div class="tab-content">
        <table-list 
          :content-list="historyRecordList"
          :head-list="headList"
          v-if="tabParams === 'whole'">
        </table-list>
        <table-list 
          :content-list="myRecordList"
          :head-list="headList"
          v-if="tabParams === 'single'">
        </table-list>
      </div>
    </div>
  </div>
</template>
<script>
import tableList from './tableList';
import { toShort } from 'utils/shortify.js';
import { mySetInterval, myClearInterval } from 'utils/myInterval.js';

const headList = [{
  class: "betAddr",
  text: "Player",
  cell: "betAddr"
}, {
  class: "bet",
  text: "Bet",
  cell: "bet"
}, {
  class: "rollNum",
  text: "Result",
  cell: "rollNum"
}, {
  class: "winAmount",
  text: "Rewards",
  cell: "winAmount"
}];

export default{
  components: { 
    tableList
  },
  props: {
    currentAddress: {
      type: String,
      default: ""
    }
  },
  data(){
    return {
      historyLoading: false,
      myLoading: false,
      tabParams: "whole",
      headList,
      historyRecordList: [],
      myRecordList: [],
      historyInterval: null,
      myRecordInterval: null
    }
  },
  watch: {
    tabParams(val) {
      if (this.historyInterval) {
        myClearInterval(this.historyInterval);
      }
      if (this.myRecordInterval) {
        myClearInterval(this.myRecordInterval);
      }
      if (val === "whole") {
        this.loopHistoryRecord(); // 获取投注记录
      } else {
        this.loopMyRecord(); // 获取我的投注记录
      }
    }
  },
  created(){
    this.loopHistoryRecord();
  },
  methods: {
    loopHistoryRecord() {
      this.getHistoryRecord();
      this.historyInterval = mySetInterval(()=> {
        this.getHistoryRecord();
      }, 5000);
    },
    loopMyRecord() {
      this.getMyRecord();
      this.myRecordInterval = mySetInterval(()=> {
        this.getMyRecord();
      }, 5000);
    },
    clickTab(str) {
      this.tabParams = str;
    },
    showList(netData) {
      return netData.map(item => {
        return {
          ...item,
          rollNum: this.mapPic(item.rollNum),
          betAddr: toShort(item.betAddr),
          bet: `<span style="display:inline-block; min-width:20px;">${item.betAmount}</span> ` + this.mapPicArr(item.rollTarget),
          winAmount: (!item.winAmount || item.winAmount === "0") ? `<span style="color: #FF9CFB">${item.winAmount}</span>` : `<span style="color: #FAD133">${item.winAmount}</span>`
        }
      });
    },
    mapPicArr(num) {
      let str = num.toString();
      let arr = str.split("");
      arr = arr.map(item=> {
        return this.mapPic(item);
      })
      return arr.join("");
    }, 
    mapPic(num) {
      num = +num;
      switch(num) {
        case 1: return `<img style="vertical-align: middle" src="${require('../../../assets/dice/1-1.png')}"/>`; break;
        case 2: return `<img style="vertical-align: middle" src="${require('../../../assets/dice/2-2.png')}"/>`; break;
        case 3: return `<img style="vertical-align: middle" src="${require('../../../assets/dice/3-3.png')}"/>`; break;
        case 4: return `<img style="vertical-align: middle" src="${require('../../../assets/dice/4-4.png')}"/>`; break;
        case 5: return `<img style="vertical-align: middle" src="${require('../../../assets/dice/5-5.png')}"/>`; break;
        case 6: return `<img style="vertical-align: middle" src="${require('../../../assets/dice/6-6.png')}"/>`; break;
        default: return 0; break;
      }
    },
    getHistoryRecord() {
      this.$ledger.filterHistoryRecord().then(data=> {
        let netData = data || [];
        this.historyRecordList = this.showList(netData);
      }).catch(err=> {
        console.log(err);
      });
    },
    getMyRecord() {
      this.$ledger.filterMySendBlocksToBetResults(this.currentAddress).then(data=> {
        let netData = data || [];
        this.myRecordList = this.showList(netData);
      }).catch(err=> {
        console.log(err);
      });
    }
  }
}
</script>
<style lang="scss">
.tab-list-container {
  .dice-small-pic {

  }
  .whole-record {
    border-radius: 4px 0 0 4px;
  }
  .my-record {
    border-radius: 0 4px 4px 0;
  }
  .betAddr {    
    // min-width: 120px;
    width: 37%;
  }
  .bet {
      // min-width: 120px;
      width: 35%;
  }
  .rollNum {
      // min-width: 40px;
      width: 13%;
  }
  .winAmount {
      // min-width: 50px;
      width: 12%;
  }
}
</style>