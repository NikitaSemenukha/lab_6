"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
function caesarCipherEncrypt(text, shift) {
    const alphaSize = 32; // В українському алфавіті 32 літери
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (/[А-Яа-я]/.test(char)) { // Шифруємо тільки українські букви
            let start = char >= 'А' && char <= 'Я' ? 'А'.charCodeAt(0) : 'а'.charCodeAt(0);
            let charCode = char.charCodeAt(0) - start;
            let newCode = (charCode + shift) % alphaSize;
            if (newCode < 0)
                newCode += alphaSize; // Для правильного відновлення тексту при дешифруванні
            encryptedText += String.fromCharCode(start + newCode);
        }
        else {
            encryptedText += char; // Не шифруємо спеціальні символи
        }
    }
    return encryptedText;
}
function caesarCipherDecrypt(text, shift) {
    return caesarCipherEncrypt(text, -shift);
}
// Створюємо інтерфейс для зчитування з клавіатури
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Введіть текст для шифрування: ', (text) => {
    rl.question('Введіть ключ шифрування (число): ', (key) => {
        const shift = parseInt(key, 10);
        if (isNaN(shift)) {
            console.log('Ключ повинен бути числом.');
        }
        else {
            const encryptedText = caesarCipherEncrypt(text, shift);
            console.log("Зашифрований текст:", encryptedText);
            const decryptedText = caesarCipherDecrypt(encryptedText, shift);
            console.log("Розшифрований текст:", decryptedText);
        }
        rl.close();
    });
});
