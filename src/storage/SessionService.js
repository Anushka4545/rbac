import CryptoJS from "crypto-js";
const secretKey = import.meta.env.VITE_SECRET_KEY;
const SessionService = {
  getUser: () => {
    const ciphertext = localStorage.getItem("user");
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
  setUser: (data) => {
    localStorage.setItem(
      "user",
      CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
    );
  },
};

export default SessionService;
