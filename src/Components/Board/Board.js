import React from 'react';
import Cell from '../Cell/Cell';
import './Board.css';
import getNextBoard from '../GameofLife';
import 'react-awesome-button';
import {AwesomeButton} from "react-awesome-button";
import "./Theme.css";
import "./Theme2.css";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: [],
            speed: 1000,
            rowNum: 18,
            colNum: 30,
            isPaused: true,
        };


        this.isMouseDown = false;

        for (let i = 0; i < (this.state.rowNum * this.state.colNum); i++) {
            this.state.cells.push(false);
        }
        this.handleStart = this.handleStart.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.getCols = this.getCols.bind(this);
        this.updateCell = this.updateCell.bind(this);
        this.handleMoseDown = this.handleMoseDown.bind(this);
        this.handleMoseUp = this.handleMoseUp.bind(this);
        this.getMousedown = this.getMousedown.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);


    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleMoseDown);
        document.addEventListener('mouseup', this.handleMoseUp);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.speed !== this.state.speed) {
            this.handleStart();
        }
        if (prevState.rowNum !== this.state.rowNum) {
            this.handleReset();
        }

    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMoseDown);
        document.removeEventListener('mouseup', this.handleMoseUp);
        clearInterval(this.interval);
    }

    handleMoseDown() {
        this.isMouseDown = true;
    }

    handleMoseUp() {
        this.isMouseDown = false;
    }

    getMousedown() {
        return this.isMouseDown;
    }

    getCols(updateFunction, getMousedown, isPaused) {
        let cols = [];
        let rowCount = this.state.rowNum;
        for (let i = this.state.rowNum; i <= (this.state.rowNum * this.state.colNum); i += this.state.rowNum) {
            cols.push(this.state.cells.slice(i - this.state.rowNum, i).map(function (item, index) {
                return (<div className="cellDiv" key={index}><Cell isAlive={item}
                                                                   isPaused={isPaused}
                                                                   index={i + index - rowCount}
                                                                   updateCell={updateFunction}
                                                                   getMousedown={getMousedown}/>
                </div>);
            }));
        }
        return cols;

    }

    updateCell(index) {
        this.setState(state => {
            const cells = state.cells.map((item, j) => {
                if (j === index) {
                    return !item;
                } else {
                    return item;
                }
            });

            return {
                cells,
            };
        });
    }

    handleReset() {
        clearInterval(this.interval);
        this.setState(state => {
            const cells = state.cells.map(() => false);
            return {
                cells: cells,
                isPaused: true
            };
        });
    }

    handlePause() {
        clearInterval(this.interval);
        this.setState({isPaused: true})
    }

    handleStart() {
        this.setState({isPaused: false});
        if (this.state.isPaused) {
            this.interval = setInterval(() => this.setState(state => {
                let newBoard = getNextBoard(this.state.rowNum, this.state.colNum, this.state.cells);
                const cells = state.cells.map((item, index) => newBoard[index]);
                return {
                    cells
                };
            }), this.state.speed);
        }
    }

    handleSpeedChange(value) {
        this.handlePause();
        this.setState({speed: value});
    }

    handleSizeChange(value) {
        switch (value) {
            case 0:
                this.setState({
                    rowNum: 10,
                    colNum: 15
                });
                break;
            case 1:
                this.setState({
                    rowNum: 15,
                    colNum: 25
                });
                break;
            case 2:
                this.setState({
                    rowNum: 18,
                    colNum: 30
                });
                break;
            case 3:
                this.setState({
                    rowNum: 23,
                    colNum: 40
                });
                break;

        }
    }

    render() {
        return (<div className="background">
                <div>
                    <div className="config">
                        <h4 className="label">Board Size: {this.state.rowNum} X {this.state.colNum}</h4>
                        <Slider
                            className="slider"
                            min={0}
                            max={3}
                            step={1}
                            dots={true}
                            defaultValue={2}
                            dotStyle={{
                                marginTop: 1,
                            }}
                            onChange={this.handleSizeChange}
                            trackStyle={{backgroundColor: '2e84b2', height: 10}}
                            railStyle={{backgroundColor: '349890', height: 10}}
                            handleStyle={{
                                borderColor: '67cbc3',
                                height: 28,
                                width: 28,
                                marginLeft: 0,
                                marginTop: -9,
                                backgroundColor: 'black',
                            }}/>
                        <h4 className="label">Speed: {this.state.speed} milliseconds</h4>
                        <Slider
                            className="slider"
                            min={250}
                            max={3000}
                            step={250}
                            dots={true}
                            defaultValue={1000}
                            dotStyle={{
                                marginTop: 1,
                            }}
                            onChange={this.handleSpeedChange}
                            trackStyle={{backgroundColor: '2e84b2', height: 10}}
                            railStyle={{backgroundColor: '349890', height: 10}}
                            handleStyle={{
                                borderColor: '67cbc3',
                                height: 28,
                                width: 28,
                                marginLeft: 0,
                                marginTop: -9,
                                backgroundColor: 'black',
                            }}/>

                        <div className="divider"/>

                    </div>
                    <table className="gameBoard" cellSpacing={0}>
                        <tbody>
                        <tr>
                            {this.getCols(this.updateCell, this.getMousedown, this.state.isPaused).map(function (item, index) {
                                return <td className="col" key={index}>{item}</td>
                            })}
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="config">
                    <div className="btn-group" role="group">
                        <AwesomeButton className="aws-btn2" type="secondary"
                                       onPress={this.handleStart}> Start</AwesomeButton>
                        <div className="divider"/>
                        <AwesomeButton className="aws-btn2" type="primary"
                                       onPress={this.handlePause}> Pause</AwesomeButton>
                        <div className="divider"/>
                        <AwesomeButton className="aws-btn" type="secondary"
                                       onPress={this.handleReset}> Reset</AwesomeButton>

                    </div>
                </div>
            </div>
        );
    }

}