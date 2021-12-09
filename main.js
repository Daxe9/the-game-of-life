// Riprodurre il gioco della vita di Conway usando Javascript

/*  LE REGOLE DEL GIOCO
Qualsiasi cella viva con meno di due celle vive adiacenti muore, come per effetto d'isolamento;
Qualsiasi cella viva con due o tre celle vive adiacenti sopravvive alla generazione successiva;
Qualsiasi cella viva con più di tre celle vive adiacenti muore, come per effetto di sovrappopolazione;
Qualsiasi cella morta con esattamente tre celle vive adiacenti diventa una cella viva, come per effetto di riproduzione.
 "#" --> viva
 "-" --> morta
*/

function fillMatrix(matrix, n, content) {
    // fill a matrix of n length with content
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
        [-1, 0],    // top middile          1
        [-1, 1],    // top right corner     2
        [0, -1],    // middle left          3
        [0, 1],     // middle right         4
        [1, -1],    // bottom left corner   5
        [1, 0],     // bottom middle        6
        [1, 1],     // bottom right corner  7
    ];
    let sign = matrix[row][column];
    for (let i = 0; i < 8; i++){
        if (matrix[row + (directions[i][0])] != undefined && matrix[row + (directions[i][0])][column + (directions[i][1])] != undefined &&
            matrix[row + (directions[i][0])][column + (directions[i][1])] != sign){
            counter++;
        }
    }
    // se è morta
    if (sign == "-" && counter == 3){
        sign = "#"; // la cella resuscita
    }
    // se è viva
    else if (sign == "#"){
        if (counter > 6 || counter < 5) {
            // muore per l'isolamento o per la sovrapposizione
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
    a = "";                                                         // che verrà stampata
    for (let i = 0; i < plot.length; i++){
        a += plot[i].join("\u00A0\u00A0\u00A0\u00A0") + "\n";
    }
    // console.log(a);
    document.getElementById("outputarea").innerText = a;            // stampare la matrice in una div con id outputarea
}

function repeat() {
    // this function is used in setInterval, so every " n ""ms this function will be called
    prettyPrint(plot);                              // passare la matrice per poi stamparla
    plot = main(plot);                              // passare la matrice per generare la prossima
}


function start(variable, func, time){
    variable = setInterval(func, time);
}

function clear(variable){
    clearInterval(variable);
}


let plot = [];                                      // initialize a new matrix
let dimension = 12;                                 // set the dimension of the matrix
let repeatReproduction;
plot = fillMatrix(plot, dimension, "-");            // fill the matrix with dead cells

plot[1][2] = "#";
plot[2][3] = "#";
plot[3][1] = "#";                                   // mettere su alcune cellule vive
plot[3][2] = "#";
plot[3][3] = "#";



