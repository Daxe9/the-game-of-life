// reproduce The game of life of Conway using Javascript

/*  RULE OF THE GAME
Qualsiasi cella viva con meno di due celle vive adiacenti muore, come per effetto d'isolamento;
Qualsiasi cella viva con due o tre celle vive adiacenti sopravvive alla generazione successiva;
Qualsiasi cella viva con più di tre celle vive adiacenti muore, come per effetto di sovrappopolazione;
Qualsiasi cella morta con esattamente tre celle vive adiacenti diventa una cella viva, come per effetto di riproduzione.
 "#" --> viva
 "-" --> morta
*/


function fillMatrix(matrix, n, content) {
    // fill a matrix of n length with content
    for (let i = 0; i < n; i++){
        matrix[i] = new Array(n).fill(content);
    }
    return matrix;
}


function checkValid(matrix, row, column){
    let counter = 0;
    let directions = [
        [-1, -1],   // top left corner
        [-1, 0],    // top middile
        [-1, 1],    // top right corner
        [0, -1],    // middle left
        [0, 1],     // middle right
        [1, -1],    // bottom left corner
        [1, 0],     // bottom middle
        [1, 1],     // bottom right corner
    ];
    for (let i = 0; i < 8; i++){
        if (matrix[row + (directions[i][0])] && matrix[row + (directions[i][0])][column + (directions[i][1])] && matrix[row + (directions[i][0])][column + (directions[i][1])] != matrix[row][column]){
            counter++;
        }
    }

    // se è morta
    if (matrix[row][column] == "-" && counter == 3){
        matrix[row][column] = "#"; // la cella resuscita
    }
    // se è viva
    else if (matrix[row][column] == "#"){
        if (counter < 2 || counter > 3) {
            // muore per l'isolamento o per la sovrapposizione
            matrix[row][column] = "-";
        }
    }

    return matrix[row][column];
}


function main(matrix) {
    for (let i = 0; i < matrix.length; i++){ // rows
        for (let j = 0; j < matrix[i].length; j++){ //columns
            matrix[i][j] = checkValid(matrix, i, j);
        }
    }
    return matrix;
}


function prova(arr, r, c) {
    if(arr[r+(-1)] && arr[r+(-1)][c+(-1)]){
        console.log("yes");
    }
    else {
        console.log("no");
    }
}
// let array = [
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0]
// ];
// prova(array, 0, 0);

let plot = [];
let dimension = 5;
plot = fillMatrix(plot, dimension, "-");
plot[1][2] = "#";
plot[2][3] = "#";
plot[3][2] = "#";
console.log(plot);
plot = main(plot);
console.log(plot);



