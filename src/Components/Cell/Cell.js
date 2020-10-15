import React from 'react';
import './Cell.css';

export default class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.colors = {
            dead: '#041b40',
            alive: '#b2e8f7',
            hover_dead: '#495d76',
            hover_alive: '#e6fffd'
        };

        this.state = {
            isAlive: this.props.isAlive,
            isHovering: false
        };


        this.handleClick = this.handleClick.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseHoverEnd = this.handleMouseHoverEnd.bind(this);
        this.determineBorder = this.determineBorder.bind(this);

    }


    componentDidUpdate(prevProps, prevState, snap) {
        if (this.props.isAlive !== prevProps.isAlive) {
            this.setState({
                isAlive: this.props.isAlive,
            })
        }
    }


    handleClick() {
        this.props.updateCell(this.props.index);
        this.setState({
            isAlive: !this.state.isAlive,
        });
    }


    handleMouseHover() {
        this.setState({
            isHovering: true
        });
        if (this.props.getMousedown()) {
            this.handleClick();
        }
    }

    handleMouseHoverEnd() {
        this.setState({
            isHovering: false
        });
    }

    determineColor() {
        if (this.state.isAlive && this.state.isHovering) {
            return this.colors.hover_dead;
        } else if (!this.state.isAlive && this.state.isHovering) {
            return this.colors.hover_dead;
        } else if (this.state.isAlive && !this.state.isHovering) {
            return this.colors.alive;
        } else {
            return this.colors.dead;
        }
    }

    determineBorder(){
        return (this.props.isPaused) ? "2px solid #000000" :  "2px solid #515368";
    }

    render() {
        return (
            <div>
                <button className='square'
                        onMouseOver={this.handleMouseHover}
                        onMouseOut={this.handleMouseHoverEnd}
                        onMouseDown={this.handleClick}
                        type='button'
                        style={{
                            backgroundColor: this.determineColor(),
                            border: this.determineBorder()
                        }}>

                </button>
            </div>
        )
    };


}
