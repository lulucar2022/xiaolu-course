// crypto module
import CryptoJS from "crypto-js";

// 十六位十六进制数作为密钥
const paw = CryptoJS.enc.Utf8.parse("PAW_KEY_XU123456");
// 十六位十六进制数作为密钥偏移量
const iv = CryptoJS.enc.Utf8.parse("PAW_KEY_XU789456");

//加密方法
export function encrypt(word) {
  const key = CryptoJS.enc.Utf8.parse(paw);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}
//解密方法
export function decrypt(word) {
  const key = CryptoJS.enc.Utf8.parse(paw);
  const decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
// 以上方法中 mode就是加密模式，padding是填充。