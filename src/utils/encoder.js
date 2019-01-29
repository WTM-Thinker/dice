import { utils } from '@vite/vitejs';

export const encoder = utils.encoder;

export function base64ToHex(b64str) {
  let str = Buffer.from(b64str, 'base64');
  return str.toString('hex');
}

export function newHexAddrFromRealAddr(realAddr) {
  let bytes = encoder.hexToBytes(realAddr.slice(24));
  let checkSum = encoder.blake2b(bytes, null, 5);
  return "vite_" + realAddr.slice(24) + encoder.bytesToHex(checkSum)
}

export function supplement0(str, length) {
  if((str + "").length >= length) {
      return str;
  }
  return supplement0("0" + str, length);
}

export function getContractData(str) {
   let num = parseInt(str);
   let hexStr = (num).toString(16);
   return "89520241" + supplement0(hexStr, 64);
}


//RFC4648
export function base64UrlSafeEncodeHexStr(hexstr) {
 let standardB64 =  Buffer.from(hexstr, 'hex').toString('base64')
 return standardB64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+/, '')
}


// according to the api doc decode with compatible with standard or urlsafe base64
export function base64UrlSafeDecodeToHexStr(base64Str)  {
  return Buffer.from(hexstr, 'base64').toString('hex')
}