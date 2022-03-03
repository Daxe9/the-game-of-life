// TODO stop the repeat timer
class GameGrid {
    width = 10;
    ms = 1000;
    directions = [[-1, -1],   // top left corner      0
        [-1, 0],    // top middle           1
        [-1, 1],    // top right corner     2
        [0, -1],    // middle left          3
        [0, 1],     // middle right         4
        [1, -1],    // bottom left corner   5
        [1, 0],     // bottom middle        6
        [1, 1],     // bottom right corner  7
    ];

    constructor() {
        this.matrix = [];
        this.pMatrix = [];
    }

    fillGrid(width) {
        for (let i = 0; i < width; ++i) {
            this.matrix[i] = Array(width).fill("-");
        }
    }

    cellUpdate(x, y, pMatrix) {
        let counter = 0;
        let availableCells;
        let sign = this.matrix[x][y];
        let positions = [];
        for (let i = 0; i < this.directions.length; ++i) {
            const newX = pMatrix[x + this.directions[i][0]] || null
            if (newX) {
                const coordinates = newX[y + this.directions[i][1]] || null
                positions.push(coordinates);
            }
        }
        positions = positions.filter(element => element)
        availableCells = positions.length;
        positions.forEach(cell => {
            if (cell !== sign) {
                ++counter;
            }
        })

        if (sign === "-") {
            if (counter === 3) {
                sign = "#";
            }
        } else {
            // I don't remember why this is so long and I'm so tired to change it
            if ((counter > 6 || counter < 5) || (availableCells === 5 && (counter > 3 || counter < 2)) || (availableCells === 4 && counter > 1)) {
                sign = "-"
            }
        }
        this.matrix[x][y] = sign
    }

    gridUpdate() {
        this.deepCopyGrid()
        for (let i = 0; i < this.width; ++i) {
            for (let j = 0; j < this.width; ++j) {
                this.cellUpdate(i, j, this.pMatrix)
            }
        }
    }

    deepCopyGrid() {
        this.pMatrix = JSON.parse(JSON.stringify(this.matrix));
    }

    settings() {
        this.fillGrid(this.width);
        this.generateRandomCoordinate();
    }

    run() {
        this.gridUpdate()
        console.log(this.matrix)
    }

    generateRandomCoordinate() {
        let randomCoordinates = [];

        for (let i = 0; i < randomNumber(this.width ** 2); ++i) {
            const newCoordinates = [randomNumber(this.width), randomNumber(this.width)];
            if (!(newCoordinates in randomCoordinates)) {
                randomCoordinates.push(newCoordinates)
            }
        }

        randomCoordinates.forEach(coordinates => {
            this.matrix[coordinates[0]][coordinates[1]] = "#";
        })

        function randomNumber(max) {
            return Math.floor(Math.random() * max);
        }
    }
}
export default GameGrid;
