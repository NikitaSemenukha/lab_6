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
const fs = __importStar(require("fs"));
// Функція для шифрування тексту методом Гронсфельда
function gronsfeldCipherEncrypt(text, key) {
    const alphaSize = 32; // Кількість символів українського алфавіту
    let encryptedText = '';
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (/[А-Яа-я]/.test(char)) { // Шифруємо тільки українські букви
            let start = char >= 'А' && char <= 'Я' ? 'А'.charCodeAt(0) : 'а'.charCodeAt(0);
            let charCode = char.charCodeAt(0) - start;
            let shift = key[keyIndex % key.length]; // Використовуємо ключ по модулю для повторення ключа
            let newCode = (charCode + shift) % alphaSize;
            if (newCode < 0)
                newCode += alphaSize; // Для правильного відновлення тексту при дешифруванні
            encryptedText += String.fromCharCode(start + newCode);
            keyIndex++;
        }
        else {
            encryptedText += char; // Не шифруємо спеціальні символи
        }
    }
    return encryptedText;
}
// Функція для дешифрування тексту методом Гронсфельда
function gronsfeldCipherDecrypt(text, key) {
    // Для дешифрування використовуємо той самий процес, але з від'ємним зсувом
    const decryptedText = gronsfeldCipherEncrypt(text, key.map(k => -k));
    return decryptedText;
}
// Створюємо інтерфейс для зчитування з клавіатури
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Введіть текст для шифрування: ', (text) => {
    rl.question('Введіть ключі для шифрування (через пробіл): ', (keyInput) => {
        const key = keyInput.split(' ').map(num => parseInt(num, 10));
        if (key.some(isNaN)) {
            console.log('Неправильний формат ключа. Введіть числа, розділені пробілами.');
            rl.close();
            return;
        }
        const encryptedText = gronsfeldCipherEncrypt(text, key);
        console.log("Зашифрований текст:", encryptedText);
        const decryptedText = gronsfeldCipherDecrypt(encryptedText, key);
        console.log("Розшифрований текст:", decryptedText);
        // Зберігаємо зашифрований текст у файл
        fs.writeFile('encrypted.txt', encryptedText, (err) => {
            if (err)
                throw err;
            console.log('Зашифрований текст збережено у файл encrypted.txt');
        });
        // Зберігаємо розшифрований текст у файл
        fs.writeFile('decrypted.txt', decryptedText, (err) => {
            if (err)
                throw err;
            console.log('Розшифрований текст збережено у файл decrypted.txt');
            rl.close();
        });
    });
});
