<template>
  <div class="help-container">
    <div class="title">Game Instruction</div>
    <div class="flex">
      <div class="icon"></div>
      <div class="icon-content">Options: In High Roller, there are six dices in total, players can choose at least one dice and at most five dices, no more, no less. The number of dices you select will correspond to different odds and winning probability.</div>
    </div>
    <div class="flex">
      <div class="icon"></div>
      <div class="icon-content">Wagering Amount: 1 VITE to 100 VITE (decimals not supported)</div>
    </div>
    <div class="flex">
      <div class="icon"></div>
      <div class="icon-content">Results: After you place a bet, smart contract will generate a face value. If this face value is consistent with or contained in what you place, you will win. Otherwise, you will lose. You can check results in the Wagering Records.</div>
    </div>
    <div class="flex">
      <div class="icon"></div>
      <div class="icon-content">Charges: To winners, the contract will take 5% of the rewards (principal not included) as the handling fee, which will be put in the prize pool with an address: xxxxxxx.</div>
    </div>
    <div class="title">Fairness Statement</div>
    <div class="icon-content">High Roller is developed on the basis of Vite Smart Contract, which is completely open source. Link to source code: XXXXXXX</div>
    <div class="title">Game Developer</div>
    <div class="icon-content">High Roller is a dApp developed via Vite Smart Contract, the developer xxx of this game comes from Vite Community.</div>
  </div>
</template>
<style lang="scss" scoped>
.help-container {
  font-family:PingFang-SC-Regular;
  color:rgba(62,74,89,0.8);
  line-height:16px;
  .flex {
    display: flex;
    display: -webkit-flex;

  }
  .title {
    color:rgba(36,39,43,1);
    font-size:14px;
    margin-top: 20px;
    line-height:20px;
    font-family:PingFangSC-Semibold;
  }
  .icon-content {
    margin-top: 12px;
  }
  .icon {
    margin-top: 17px;
    min-width: 6px;
    border-radius: 6px;
    height: 6px;
    background: #5fcd00;
    margin-right: 8px;
  }
}
</style>
