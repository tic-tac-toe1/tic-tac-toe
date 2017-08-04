import React from "react";
import Square from "./square"

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
export default Board;
