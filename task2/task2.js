import crypto from 'crypto'
import fs from 'fs'
const fileNames = fs.readdirSync('./task22/');
const finalHexes = [];
const email = "sasha_soikel@mail.ru"
for (const fName of fileNames) {
    const fileBuffer = fs.readFileSync(`./task22/${fName}`);
    const hash = crypto.createHash("SHA3-256")
    const finalHex = hash.update(fileBuffer).digest("hex")
    finalHexes.push(finalHex);
}
const sortedAndJoined = finalHexes.sort().join('') + email;

const last  = () =>{
    const hash = crypto.createHash("SHA3-256")
    const final = hash.update(sortedAndJoined).digest("hex")
    console.log(final)
}
last()
