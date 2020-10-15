import React from "react";
import './Site.css';
import Board from "../Board/Board";

export default class Site extends React.Component {
    render() {
        return (
            <div className="body">
                <Board/>
                <div className="text-group">
                    <div className="header">
                        <h1>GAME OF LIFE</h1>
                    </div>
                    <div className="body-text">
                        <p>
                            Conway chose his rules carefully, after considerable experimentation, to meet these
                            criteria: <br/>
                            <b>1-</b> There should be no explosive growth. <br/>
                            <b>2-</b> There should exist small initial patterns with chaotic, unpredictable
                            outcomes. <br/>
                            <b>3-</b> There should be potential for von Neumann universal constructors. <br/>
                            <b>4-</b> The rules should be as simple as possible, whilst adhering to the above
                            constraints. <br/>
                        </p>
                    </div>
                    <div className="divider"/>
                    <div className="header">
                        <h2>RULES</h2>
                    </div>
                    <div>
                        At each step in time, the following transitions occur:<br/>
                        <br/>
                        <h3>For live cells:</h3>
                        - Fewer than two live neighbours dies, as if by underpopulation.<br/>
                        - Two or three live neighbours lives on to the next generation.<br/>
                        - More than three live neighbours dies, as if by overpopulation.<br/>
                        <h3>For dead cells:</h3>
                        - Exactly three live neighbours becomes a live cell, as if by
                        reproduction.<br/>
                        <br/>

                    </div>
                </div>
            </div>
        );
    }
}
