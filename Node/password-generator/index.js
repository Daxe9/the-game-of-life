// password generator with length chosen by user
function random(maxValue, start) {
    return (Math.floor(Math.random()*maxValue+1)) + start;
}

// da 33 a 46 --> simboli
// da 48 a 57 --> numeri
// da 65 a 90 --> upper case letters
// da 97 a 122 --> lower case letters

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("How long do you want to your password to be: ", function (length) {
    console.log("Length: ", length);
    let num = Number(length), str = [], currentSymbol;
    for (let i = 0; i < num; i++){
        let randomNumber = random(4, 0);
        switch (randomNumber){
            case 1:
                // 46-33 = 13 --> 13 + 33
                str.push(String.fromCharCode(random(13, 33)));
                break;
            case 2:
                // 57-48 = 9 --> 9 + 57
                str.push(String.fromCharCode(random(9, 57)));
                break;
            case 3:
                // 90-65 = 25 --> 25 + 65
                str.push(String.fromCharCode(random(25, 65)));
                break;
            case 4:
                // 122-97 = 25 -->
                str.push(String.fromCharCode(random(25, 97)));
                break;
        }
    }
    console.log(str);
    console.log(str.join(""));
    rl.close();
});

