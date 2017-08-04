import React from "react";
import Board from "./board"
import Button from "./button"
import findWinner from "./gameprogress"
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
            <div id="main" className="game">
                <p>This is a very simplistic implementation of the game tic-tac-toe. It is a work in progress and more
                    features Will be added soon.</p>
                <div className="container">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={i=>this.handleClick(i)}
                        />
                    </div>
                    <div>
                         <br/>
                         <Button onClick={()=>this.reset()} value="reset"/>
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
export default Game;