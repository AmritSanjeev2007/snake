import * as GameManager from "./game-manager.js"
import * as SceneGenerator from "./scene-generator.js"

const ROWS = 10, COLUMNS = 10;
SceneGenerator.generateGrid(COLUMNS,ROWS);
    const gridElements = document.querySelectorAll('div#grid > div');
const GameTickDelayMS = 200;
let makeSnakeLonger = false;
let _tail = null;

function generateRandomStart()
{
    return new point(4 + Math.round(Math.random()), 4 + Math.round(Math.random()));
}


class point { m;n; constructor(m,n){this.m=m, this.n=n} };

let snake = [generateRandomStart()];

function clearBoard()
{
    gridElements.forEach(function(el){el.removeAttribute('aria-label')});
    snake = [generateRandomStart()];
    generateRandomApple();
}

function clampColumns(x)
{
    if(x<0) return COLUMNS + x;
    else if(x>=COLUMNS) return x-COLUMNS;
    else return x;
}
function clampRows(y)
{
    if(y<0) return ROWS + y;
    else if(y>=ROWS) return y-ROWS;
    else return y;
}

/** vector2 speed. direction is similar to cartisean coordinates */
let currentDirection = [0, -1];

function moveSnake()
{   
    _tail = new point(snake.at(-1).m, snake.at(-1).n);

    for(let i=snake.length-1; i>0; i--)
    {
        snake[i].m = snake[i-1].m;
        snake[i].n = snake[i-1].n;
    }

    gridElements[snake[0].n * COLUMNS + snake[0].m].setAttribute('aria-label', 'snake')

    snake[0].m = clampColumns(snake[0].m + currentDirection[0]);
    snake[0].n = clampRows(snake[0].n + currentDirection[1]);

    if(gridElements[snake[0].n * COLUMNS + snake[0].m].getAttribute('aria-label') === 'snake'){ 
        clearBoard();
        return GameManager.SetGameState(GameManager.EGameState.END);
    }
    if(gridElements[snake[0].n * COLUMNS + snake[0].m].getAttribute('aria-label') === 'apple') {
        generateRandomApple();
        makeSnakeLonger = true;
    }
    gridElements[snake[0].n * COLUMNS + snake[0].m].setAttribute('aria-label', 'snake-head');
}

function getDirectionFromUser()
{
    document.addEventListener('keypress', function(e){
        switch(e.key)
        {
            case 'w': currentDirection = [ 0, -1]; break;
            case 's': currentDirection = [ 0,  1]; break;
            case 'a': currentDirection = [-1,  0]; break;
            case 'd': currentDirection = [ 1,  0]; break;

            case 'ArrowUp'      : currentDirection = [ 0, -1]; break;
            case 'ArrowDown'    : currentDirection = [ 0,  1]; break;
            case 'ArrowLeft'    : currentDirection = [-1,  0]; break;
            case 'ArrowRight'   : currentDirection = [ 1,  0]; break;
        }
    })
}
getDirectionFromUser();

function generateRandomApple(){
    let freespots = [];
    gridElements.forEach(function(el,i){
        if(!el.hasAttribute('aria-label')) freespots.push(i);
    });

    if(freespots.length === 0) GameManager.SetGameState(GameManager.EGameState.END)

    let randomSpot = freespots[Math.floor(Math.random() * freespots.length)];
    gridElements[randomSpot].setAttribute('aria-label', 'apple')
}

function GameLoop()
{
    generateRandomApple();
    setInterval(function(){
        if(GameManager.GameState === GameManager.EGameState.PLAYING)
        {
            moveSnake();
            if(makeSnakeLonger) {
                snake.push(_tail);
                gridElements[_tail.n * COLUMNS + _tail.m].setAttribute('aria-label', 'snake')
                makeSnakeLonger = false;
            } else gridElements[_tail.n * COLUMNS + _tail.m].removeAttribute('aria-label')
        }
    }, GameTickDelayMS)
}

GameLoop();