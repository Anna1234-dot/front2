type Bomb = {
    bomb: boolean;
    pinned: boolean;
    hidden: boolean;
    x: number;
    y: number;
    nearByBombs: number;
}

type BombsRow = Bomb[];

type BombField = BombsRow[];

type Playing = {
    field: BombField;
    gameOver: boolean;
    final: String;
    cellCount: number;
    duration: number;
    duration1: number;
    duration2: number;
    duration3: number;
    begin: boolean;
    hasbegin: boolean;
}
let time1 = 0;
let time2 = 0;
let time3 = 0;

const createBomb = (): Bomb => {
    return {
        bomb: false,
        pinned: false,
        hidden: true,
        x: -1,
        y: -1,
        nearByBombs: 0,
    };

}

const createBombRows = (width: number, y: number): BombsRow => {
    const row: BombsRow = [];
    for (let x = 0; x < width; x++){
        const newBomb = createBomb();
        newBomb.x = x;
        newBomb.y = y;
        row.push(newBomb);
    }
    return row;
}

const createField = (height: number): BombsRow[] => {
    const rows: BombsRow[] = [];
    for (let y = 0; y < height; y++){
        rows.push(createBombRows(height+5, y));
    }
    return rows;
}

const fillWithRandomBombs = (field: BombField, count: number) => {
    const height = field.length;
    const width = field[0].length;
    const maxLot = height * width;

    const bombLots: number[] = [];

    while (bombLots.length < count) {
        const lot = Math.floor(Math.random() * maxLot);
        if (bombLots.indexOf(lot) < 0){
            bombLots.push(lot)
        }
    }

    for (let lot of bombLots){
        const y = Math.floor(lot / width);
        const x = Math.floor(lot % width);
        field[y][x].bomb = true;
    }
};

const positions = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
]

const calculateNearByBombs = (field: BombField) => {
    const height = field.length;
    const width = field[0].length;
    for (let x = 0; x < width; x++){
        for (let y = 0; y < height; y++){
            countBombs(x, y);
        }
    }

    function countBombs(x: number, y: number){
        const currentBomb = field[y][x];
        if (!currentBomb.bomb){
            return;
        }

        for (let position of positions){
            const xc = x + position.x;
            const yc = y + position.y;
            if (xc >= 0 && xc < width && yc >= 0 && yc < height){
                const countBomb = field[yc][xc];
                if (!countBomb.bomb){
                    countBomb.nearByBombs++;
                }
            }
        }
    }
}

function createGame(size: number, bombs: number): Playing {
    const newField = createField(size);
    fillWithRandomBombs(newField, bombs);
    calculateNearByBombs(newField);
    return {
        field: newField,
        gameOver: false,
        final: "",
        cellCount: 0,
        duration: 0,
        duration1: 0,
        duration2: 0,
        duration3: 0,
        begin: false,
        hasbegin: false,
    };
} 

function useGame(game: Playing){
    const height = game.field.length;
    const width = game.field[0].length;

    

    const showBombLot = (x: number, y: number, game: Playing) => {
        const bomb = game.field[y][x];
        if (!bomb.hidden || bomb.nearByBombs > 0){
        
            if (bomb.hidden){
                game.cellCount++;
            }
            bomb.hidden = false;
            return;
        }
        if (bomb.hidden){
            game.cellCount++;
        }
        bomb.hidden = false;
        
        for (let position of positions){
            const xc = x + position.x;
            const yc = y + position.y;
            if (xc > -1 && xc < width && yc > -1 && yc < height){
                const newByLot = game.field[yc][xc];
                setTimeout(() => {
                    showBombLot(newByLot.x, newByLot.y, game);
                }, 50);
            }
        }
    }
    
    const gameOver = (game: Playing) => {

        if (game.final == "You're a loser :("){
            game.field.forEach(r=>r.forEach(b=>b.hidden = false));
        }
        
        game.gameOver = true;
        if (height == 5 && game.duration > time1){
            time1 = game.duration;
        }
        if (height == 10 && game.duration > time2){
            time2 = game.duration
        }
        if (height == 15 && game.duration > time3){
            time3 = game.duration;
        }
    }
    
    const change = (game: Playing) => {
        setInterval(() => {
            if (game.hasbegin && !game.gameOver){
                game.duration++;
            }
        }, 1000);
    }

    const leftClicked = (bomb: Bomb) => {
        game.begin = true;
        if (game.begin && !game.hasbegin){
            game.hasbegin = true;
            change(game);
        }
        if (bomb.bomb) {
            game.hasbegin = false;
            game.final = "You're a loser :(";
            change(game);
            gameOver(game);
        }
        showBombLot(bomb.x, bomb.y, game);
        if (game.cellCount == game.field.length*game.field[0].length-2*game.field.length){
            game.hasbegin = false;
            game.final = "You're a winner!";
            change(game);
            gameOver(game);
        }
    }
    

    const rightClicked = (bomb: Bomb) => {
        bomb.pinned = !bomb.pinned;
        game.begin = true;
        if (game.begin && !game.hasbegin){
            game.hasbegin = true;
            change(game);
        }
        
    }

    

    return {
        leftClicked,
        rightClicked,
    }
}

export {
    createGame, Bomb, useGame, Playing, time1, time2, time3
}