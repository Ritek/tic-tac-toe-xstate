import { createMachine, assign } from 'xstate';

export const gameMachine = createMachine({
    id: 'tictactoe',
    initial: 'game',
    context: {
        turn: 0,
        player: 1,
        board: [0,0,0,0,0,0,0,0,0],
        message: "Current player: X"
    },
    on: {
        RESET: {
            actions: ['resetBoard']
        }
    },
    states: {
        game: {
            initial: 'player1',
            states: {
                player1: {
                    on: {
                        MAKE_MOVE: [
                            {
                                target: 'checkBoard1',
                                actions: [
                                    'saveMove',
                                    'incrementTurn',
                                    'changePlayer'
                                ],
                                cond: 'validateMove',
                            }
                        ]
                    },
                },
                checkBoard1: {
                    always: [
                        { target: '#tictactoe.over', cond: 'checkGameOver' },
                        { target: 'player2' }
                    ]
                },
                player2: {
                    on: { 
                        MAKE_MOVE: [
                            {
                                target: 'checkBoard2',
                                actions: [
                                    'saveMove',
                                    'incrementTurn',
                                    'changePlayer'
                                ],
                                cond: 'validateMove',
                            }
                        ]
                    },
                },
                checkBoard2: {
                    always: [
                        { target: '#tictactoe.over', cond: 'checkGameOver' },
                        { target: 'player1' }
                    ]
                },
            }
        },
        over: {
            on: {
                RESET: {
                    target: 'game',
                    actions: ['resetBoard']
                }
            }
        }
    },
}, {
    actions: {
        incrementTurn: assign({
            turn: context => context.turn + 1
        }),
        changePlayer: assign({
            player: context => context.player === 1? 2: 1,
            message: context => context.message = context.player === 1? "Current player: O" : "Current player: X"
        }),
        saveMove: assign({
            board: (context, event: any) => {
                const newArr = [...context.board];
                newArr[event.field] = context.player;
                return newArr;
            }
        }),
        resetBoard: assign({
            turn: context => context.turn = 0,
            player: context => context.player = 1,
            board: context => context.board = [0,0,0,0,0,0,0,0,0],
            message: context => context.message = "Current player: X"
        })
    },
    guards: {
        validateMove: (context, event) => context.board[event.field] === 0,
        checkGameOver: (context) => {
            let isGameOver = false;
            if (context.turn > 9) isGameOver = true;

            const board = context.board;
            // check rows
            if (board[0] === board[1] && board[0] === board[2] && board[0] !== 0) isGameOver = true;
            if (board[3] === board[4] && board[3] === board[5] && board[3] !== 0) isGameOver = true;
            if (board[6] === board[7] && board[6] === board[8] && board[6] !== 0) isGameOver = true;
        
            // check cols
            if (board[0] === board[3] && board[0] === board[6] && board[0] !== 0) isGameOver = true;
            if (board[1] === board[4] && board[1] === board[7] && board[1] !== 0) isGameOver = true;
            if (board[2] === board[5] && board[2] === board[8] && board[2] !== 0) isGameOver = true;
        
            // check diagonal
            if (board[0] === board[4] && board[0] === board[8] && board[0] !== 0) isGameOver = true;
            if (board[6] === board[4] && board[6] === board[2] && board[6] !== 0) isGameOver = true;
        
            if (isGameOver) {
                context.message = context.player === 1? "Player O won!" : "Player X won!";
            }

            return isGameOver;
        }
    }
});