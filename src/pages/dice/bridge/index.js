import viteBridge from '@vite/bridge';

const methods = ['app.setWebTitle', 'wallet.currentAddress', 'wallet.sendTxByURI'];

const bridge = new viteBridge({
  readyCallback: ()=> {
    console.log('ready');
  }, 
  selfDefinedMethods: methods
});


export default bridge;