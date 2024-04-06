export const EGameState = {
    /** @type {0} */ START: 0, 
    /** @type {1} */ PLAYING: 1,
    /** @type {2} */ END: 2
};

/** @type {0 | 1 | 2} */
export let GameState = EGameState.START;

export function SetGameState(state)
{
    GameState = state;
    if(GameState === EGameState.END)
    {
        alert("You lost!")
    }
}


document.getElementById('start').addEventListener('click', function(){
    GameState = EGameState.PLAYING;
})