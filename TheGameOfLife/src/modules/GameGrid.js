// TODO stop the repeat timer
class GameGrid {
    width;
    directions = [
        [-1, -1], // top left corner      0
        [-1, 0], // top middle           1
        [-1, 1], // top right corner     2
        [0, -1], // middle left          3
        [0, 1], // middle right         4
        [1, -1], // bottom left corner   5
        [1, 0], // bottom middle        6
        [1, 1], // bottom right corner  7
    ];

    constructor(width) {
        this.width = width;
        this.matrix = [];
        this.pMatrix = [];
        this.generation = 0;
        this.isDead = false;
        // initialize the board
        this.emptyGrid(this.width);
        this.generateRandomCoordinate();
    }

    /**
     * @param {number} width, fill the grid with this width
     */
    emptyGrid(width = this.width) {
        let id = 0;
        for (let i = 0; i < width; ++i) {
            this.matrix[i] = [];
            for (let j = 0; j < width; ++j) {
                this.matrix[i][j] = new Object({
                    id: id,
                    state: false,
                });
                id++;
            }
        }
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {Array} pMatrix
     */
    cellUpdate(x, y, pMatrix) {
        let counter = 0;
        let availableCells;
        let sign = this.matrix[x][y].state;
        let positions = [];

        // get available cells
        for (let i = 0; i < this.directions.length; ++i) {
            try {
                const availableCoordinates =
                    pMatrix[x + this.directions[i][0]][
                        y + this.directions[i][1]
                    ] || null;
                positions.push(availableCoordinates);
            } catch (e) {}
        }
        positions = positions.filter((element) => element);

        // get the number of cells with different sign
        availableCells = positions.length;
        positions.forEach((cell) => {
            if (cell.state !== sign) {
                ++counter;
            }
        });

        // update the cell
        if (!sign && counter === 3) {
            sign = true;
        } else {
            // I'm tired to change it
            // Please someone help me to make it better
            if (
                counter > 6 ||
                counter < 5 ||
                (availableCells === 5 && (counter > 3 || counter < 2)) ||
                (availableCells === 4 && counter > 1)
            ) {
                sign = false;
            }
        }
        this.matrix[x][y].state = sign;
    }

    // this is so ugly, but I can't find a better way
    /**
     * @param {number} id, the id of the cell
     */
    updateSingleCell(id) {
        let find = false;
        for (let i = 0; i < this.width && !find; ++i) {
            for (let j = 0; j < this.width; ++j) {
                if (this.matrix[i][j].id === id) {
                    this.matrix[i][j].state = !this.matrix[i][j].state
                    find = true;
                    break;
                }
            }
        }
    }


    /**
     * update all grid
     * */
    gridUpdate() {
        // Deep copy the board
        this.pMatrix = JSON.parse(JSON.stringify(this.matrix));

        this.isDead = this.pMatrix.every((row) => {
            return row.every((cell) => {
                return !cell.state;
            });
        });
        if (this.isDead) {
            return;
        }
        // iterate through the matrix with previous board
        for (let i = 0; i < this.width; ++i) {
            for (let j = 0; j < this.width; ++j) {
                this.cellUpdate(i, j, this.pMatrix);
            }
        }
        this.generation++;
    }

    /**
     * generate random coordinates
     */
    generateRandomCoordinate() {
        let randomCoordinates = [];

        // get a pair of random coordinates
        for (let i = 0; i < randomNumber(this.width ** 3); ++i) {
            const newCoordinates = [
                randomNumber(this.width),
                randomNumber(this.width),
            ];
            if (!(newCoordinates in randomCoordinates)) {
                randomCoordinates.push(newCoordinates);
            }
        }

        // set to alive cells with given random coordinates
        randomCoordinates.forEach((coordinates) => {
            this.matrix[coordinates[0]][coordinates[1]].state = true;
        });

        function randomNumber(max) {
            return Math.floor(Math.random() * max);
        }
    }
}

export default GameGrid;
