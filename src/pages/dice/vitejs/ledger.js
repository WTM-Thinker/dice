
import { testContractAddr, myAddr, ViteId, contractWin, contractLose } from "../config";
import { newHexAddrFromRealAddr, base64ToHex } from 'utils/encoder.js';
import { handleBigNum } from 'utils/stringFormatter.js';
class Ledger {
    constructor(client) {
        this._client = client;
        this._cacheObj = {}
    }

    async getTxList(addr, pageCount) {
      return this._client.buildinLedger.getTxList({
        addr,
        index: 0,
        pageCount
      });
    }

    getTableData(betResult, winOrNot, hash) {
      let betAddr = newHexAddrFromRealAddr(betResult[0].topics[1]); // 下注地址  hexstring betResult[0].topics[1] 
      let hexStr = base64ToHex(betResult[0].data);  // 
      let rollTarget = parseInt(hexStr.slice(0, 64), 16); // 下注点数 1,2,3
      let betAmount = parseInt(hexStr.slice(64,128), 16); // 下注金额
      let rollNum = parseInt(hexStr.slice(128,192), 16); // 筛子结果
      let winAmount = winOrNot === "win" ? parseInt(hexStr.slice(192, 256), 16) : 0;   // 奖励
      return {
        hash,
        betAddr,
        rollTarget,
        betAmount: handleBigNum(betAmount, 18),
        rollNum,
        winAmount: handleBigNum(winAmount, 18)
      }
    }
    // 获取投注列表
    async filterHistoryRecord() {
      let data = await this.getTxList(testContractAddr, 40);
      let receiveBlocks = data.list && data.list.filter(item=> {
        return item.blockType === 4 && item.logHash
      }) || [];
      let filters = [];
      let resultObj = {};
      for (let i = 0; i < receiveBlocks.length; i++) {
        let betResult = await this.getVmLogList(receiveBlocks[i].hash);
        resultObj = this.judgeWinOrLose(betResult, receiveBlocks[i].hash);
        if (resultObj.hash) {
          filters.push(resultObj);
        }
      }
      return filters;
    }

    judgeWinOrLose(betResult, hash) {
      let resultObj = {};
      if (betResult && betResult.length) {
        if (betResult[0].topics[0] === contractWin) {
          resultObj = this.getTableData(betResult, "win", hash);
        } else if (betResult[0].topics[0] === contractLose){
          resultObj = this.getTableData(betResult, "lose", hash);
        }
      }
      return resultObj;
    }

    betNoResult(sendBlock, myAddr) {
      let betAddr = myAddr; // 下注地址  hexstring betResult[0].topics[1] 
      let rollTarget = parseInt(base64ToHex(sendBlock.data).slice(8), 16); // 下注点数 1,2,3
      let betAmount = sendBlock.amount; // 下注金额
      let rollNum = 0; // 筛子结果
      let winAmount = 0;
      return {
        betAddr,
        rollTarget,
        betAmount: handleBigNum(betAmount, 18),
        rollNum,
        winAmount: handleBigNum(winAmount, 18)
      }
    }
    

    async getFinalResult(sendBlock) {
      if(this._cacheObj[sendBlock.hash]) {
        return this._cacheObj[sendBlock.hash]
      } 
      if (sendBlock.receiveBlockHeights && sendBlock.receiveBlockHeights.length) {
        // 下注有结果
        let receiveBlockHeight = sendBlock.receiveBlockHeights[sendBlock.receiveBlockHeights.length - 1];
        let receiveBlock = await this.getBlockByHeight(testContractAddr, receiveBlockHeight);
        if (receiveBlock && receiveBlock.logHash) {
          // receive成功，判断输赢，和上面的一样
          let betResult = await this.getVmLogList(receiveBlock.hash);
          let resultObj = this.judgeWinOrLose(betResult, receiveBlock.hash);
          this._cacheObj[sendBlock.hash] = resultObj
          return resultObj
        }
      } 
      // 下注还没有结果 或者 receive失败，和没出结果一样
      return this.betNoResult(sendBlock, myAddr);
    }

    // 轮询我的
    async filterMySendBlocksToBetResults(myAddr) {
      let data = await this.getTxList(myAddr, 100);
      let betResults = [];
      let j = 0;
      let sendBlocks = data.list && data.list.filter(item=> {
        return item.blockType === 2 && 
               item.toAddress === testContractAddr && 
               item.data &&
               base64ToHex(item.data).length >= 8 && 
               base64ToHex(item.data).slice(0,8) === "89520241"
      }) || [];

      for (let i = 0; i < sendBlocks.length; i++) {
        let r = await this.getFinalResult(sendBlocks[i])
        if (r && r.hash) {
          betResults[j] = r;
          j++;
        }
      }
      
      return betResults;
    }

    async getBalance(addr) {
      let data = await this._client.buildinLedger.getBalance(addr);
      let balance = data.balance && data.balance.tokenBalanceInfoMap[ViteId].totalAmount
      return balance;
    }

    async getVmLogList(hash) {
      return this._client.request('ledger_getVmLogList', hash);
    }

    async getBlockByHeight(addr, height) {
      return this._client.request('ledger_getBlockByHeight', addr, height);
    }
}

export default Ledger;
