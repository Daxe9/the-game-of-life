function fillMatrix(matrix, n, content) {
    for (let i = 0; i < n; i++){                    // make an n element of array and each of them contain
        matrix[i] = new Array(n).fill(content);     // n element
    }
    return matrix;                                  // return the matrix
}

function checkValid(matrix, row, column){
    // this function is oriented to check the validity of every element
    // and make them alive or dead
    let counter = 0;
    let directions = [
        [-1, -1],   // top left corner      0
        [-1, 0],    // top middle          1
        [-1, 1],    // top right corner     2
        [0, -1],    // middle left          3
        [0, 1],     // middle right         4
        [1, -1],    // bottom left corner   5
        [1, 0],     // bottom middle        6
        [1, 1],     // bottom right corner  7
    ];
    let cellAvailable = 0;              // check all cells available around the cell in question
    let sign = matrix[row][column];
    for (let i = 0; i < 8; i++){
        if(matrix[row + (directions[i][0])] != undefined){
            if(matrix[row + (directions[i][0])][column + (directions[i][1])] != undefined){
                if(matrix[row + (directions[i][0])][column + (directions[i][1])] != sign){
                    counter++;
                }
                cellAvailable++;
            }
        }
    }
    // se è morta
    if (sign === "-" && counter == 3){
        sign = "#"; // la cella resuscita
    }
    // se è viva
    else if (sign === "#"){
        if (counter > 6 || counter < 5) {   // se le celle morte sono più di 6, quindi 7 o 8 oppure, sono minore di 5, quindi 4, 3, 2, 1 cambio il segno
            // muore per l'isolamento o per la sovrapposizione
            sign = "-";
        }
        if (cellAvailable === 5 && (counter > 3 || counter < 2)){
            sign = "-";
        }
        else if (cellAvailable === 4 && counter > 1){
            sign = "-";
        }
    }
    return sign;
}

function main(matrix) {
    // the purpose of this function is to check every single element of the matrix
    let matrixPrecedente = JSON.parse(JSON.stringify(matrix));  // assign by value instead of reference

    for (let i = 0; i < matrix.length; i++){                        //  rows
        for (let j = 0; j < matrix[i].length; j++){                 //  columns
            matrix[i][j] = checkValid(matrixPrecedente, i, j);      //  verifica la condizione di sopravvivenza per
        }                                                           //  ogni cellula
    }
    return matrix;                                                  //  ritornare la matrice
}

function prettyPrint(matrix) {                                      // trasformare ogni matrice passata in una stringa
    prettyForm = "";                                                         // che verra' stampata
    for (let i = 0; i < matrix.length; i++){
        prettyForm += matrix[i].join("\u00A0\u00A0\u00A0\u00A0") + "\n";
    }
    //console.log(prettyForm);
    document.getElementById("outputarea").innerText = prettyForm;            // stampare la matrice in una div con id outputarea
}

function repeat() {
    // this function is used in setInterval, so every "n" ms this function will be called
    prettyPrint(plot);                              // passare la matrice per poi stamparla
    plot = main(plot);                              // passare la matrice per generare la prossima
}

function generateRandom(max){                       // as the name suggests, this function generate a random number
    return Math.floor(Math.random() * max);
}

function generateCoordinates(matrix){                     // this function generate an array of coordinates, eachone is
    let randomCellsCoordinates = [];                     // different than other
    let coordinates;
    for (let i = 0; i < generateRandom(dimension ** 2); ++i) {
        coordinates = [generateRandom(dimension), generateRandom(dimension)];
        coordinates in randomCellsCoordinates ? null : randomCellsCoordinates.push(coordinates);
    }

    randomCellsCoordinates.forEach((element) => {
        matrix[element[0]][element[1]] = "#";
    });
    return matrix;
}

function start(){                           // put in infinite loop the program
    repeating = setInterval(repeat, 1000);
}

function stop(){
    clearInterval(repeating);
}

function generateRandomCells(){
    plot = generateCoordinates(plot);
    prettyPrint(plot);
}

let plot = [];                                      // initialize a new matrix
let dimension = 15;                                 // set the dimension of the matrix
plot = fillMatrix(plot, dimension, "-");            // fill the matrix with dead cells
plot = generateCoordinates(plot);
let repeating;


