import React, { Component } from 'react';

class Clock extends Component {
  state = { currentTime: new Date() };

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentTime: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>当前时间: {this.state.currentTime.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default Clock;
