import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor() {
        super();
        this.state={
            squares: new Array(9).fill(null),
            xIsNext: true,
            player1: '',
            player2: '',
            isSubmitted: false
        };
    }

    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}/>;
    }

    render() {
        const winner=findWinner(this.state.squares);

        return (
            this.renderBoard()
        );
    }

    renderBoard() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state={
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0
        }
    }

    handleClick(i) {
        const history=this.state.history.slice(0, this.state.stepNumber + 1);
        const current=history[history.length - 1];
        const squares=current.squares.slice();
        if (findWinner(squares) || squares[i]) {
            return;
        }
        squares[i]=this.state.xIsNext ? 'X' : 'O';
        this.setState(
            {
                history: history.concat([{squares: squares}]),
                xIsNext: !this.state.xIsNext,
                stepNumber: history.length
            }
        );
    }

    jumpTo(moveNumber) {
        this.setState({
            stepNumber: moveNumber,
            xIsNext: (moveNumber % 2) === 0
        })
    }

    reset() {
        this.setState({
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0
        });
    }

    render() {
        const history=this.state.history;
        const current=history[this.state.stepNumber];
        const winner=findWinner(current.squares);
        const moves=history.map((step, move) => {
            const moveNumber=move ? 'Move #' + move : 'Game start';
            return (<li key={move}>
                <a href="#" onClick={() =>this.jumpTo(move)}> {moveNumber}</a>
            </li>);
        });
        let status;
        if (winner) {
            status='Winner: ' + winner;
        } else {
            status='Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game, container">
                <p>This is a very simplistic implementation of the game tic-tac-toe. It is a work in progress and more
                    features.</p>
                <div>
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={i=>this.handleClick(i)}
                        />
                    </div>
                    <div>
                        <br/>
                        <input type="button" name="reset" onClick={()=>this.reset()} value="reset"/>
                        <br/>
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

function findWinner(squares) {
    const winningLines=[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i=0; i < winningLines.length; i++) {
        const [a, b, c]=winningLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
