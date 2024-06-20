import * as readline from 'readline';
import * as fs from 'fs';

function caesarCipherEncrypt(text: string, shift: number): string {
    const alphaSize = 32; // В українському алфавіті 32 літери
    let encryptedText = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (/[А-Яа-я]/.test(char)) { // Шифруємо тільки українські букви
            let start = char >= 'А' && char <= 'Я' ? 'А'.charCodeAt(0) : 'а'.charCodeAt(0);
            let charCode = char.charCodeAt(0) - start;
            let newCode = (charCode + shift) % alphaSize;
            if (newCode < 0) newCode += alphaSize; // Для правильного відновлення тексту при дешифруванні
            encryptedText += String.fromCharCode(start + newCode);
        } else {
            encryptedText += char; // Не шифруємо спеціальні символи
        }
    }

    return encryptedText;
}

function caesarCipherDecrypt(text: string, shift: number): string {
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
        } else {
            const encryptedText = caesarCipherEncrypt(text, shift);
            console.log("Зашифрований текст:", encryptedText);

            const decryptedText = caesarCipherDecrypt(encryptedText, shift);
            console.log("Розшифрований текст:", decryptedText);

            // Зберігаємо зашифрований текст у файл
            fs.writeFile('encrypted.txt', encryptedText, (err) => {
                if (err) throw err;
                console.log('Зашифрований текст збережено у файл encrypted.txt');
            });

            // Зберігаємо розшифрований текст у файл
            fs.writeFile('decrypted.txt', decryptedText, (err) => {
                if (err) throw err;
                console.log('Розшифрований текст збережено у файл decrypted.txt');
            });
        }

        rl.close();
    });
});
