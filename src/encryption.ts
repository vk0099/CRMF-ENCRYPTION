import AES from "crypto-js/aes";
import CryptoJSCore from "crypto-js/core";
import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";
import Pkcs7 from "crypto-js/pad-pkcs7";
import Rp from "sha.js";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

export default class EncryptionUtils {
  Encryptionkey = "aGgRTenEUgoACtcOAr";

  Decryptionkey: string = "AecECroRUgnGTa";

  hashstring: string = "";

  hashsubstring: string = "";

  Encrypted: string = "";

  Dencrypted: string = "";
  aesKey = "a24b23c22d21e20f19g18f17e16d15c14";
  iv = "1234567890abcdef";

  // iv: any = Utf8.parse("globalaesvectors");

  encryption(e: string, t: string): string {
    // this.hashstring = Rp("sha256").update(this.Encryptionkey).digest("hex");
    // this.hashsubstring = this.hashstring.substring(0, 32);
    // const n = Utf8.parse(this.hashsubstring);
    if (e === "Encrypt") {
      // Decode base64 key and IV
      const keyBytes = CryptoJS.enc.Base64.parse(this.aesKey);
      const ivBytes = CryptoJS.enc.Base64.parse(this.iv);

      // Encrypt data
      const encrypted = CryptoJS.AES.encrypt(t, keyBytes, {
        iv: ivBytes,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return encrypted.toString(); // Encrypted string (Base64)
    }
    const keyBytes = CryptoJS.enc.Base64.parse(this.aesKey);
    const ivBytes = CryptoJS.enc.Base64.parse(this.iv);
    console.log({t})

    const decrypted = CryptoJS.AES.decrypt(t, keyBytes, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    console.log({decryptedData})

    return decryptedData;
  }

  encrypt(payload: string) {
    return this.encryption("Encrypt", payload);
  }

  decrypt(payload: string) {
    // console.log(payload)
    return this.encryption("Decrypt", payload);
  }
}
