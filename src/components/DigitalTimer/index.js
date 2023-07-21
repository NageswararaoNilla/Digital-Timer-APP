import {Component} from 'react'

import './index.css'

const PLAY_ICON_IMG =
  'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const PAUSE_ICON_IMG =
  'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: '00',
      minutes: 25,
      isTimerRunning: false,
    }
  }

  //    timeElapsedInSeconds: 0,
  //       timerLimitInMinutes: 25,
  //       isTimerRunning: false,

  componentDidMount() {
    this.timerID = setInterval(this.decrementTimer, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  decrementTimer = () => {
    const {minutes, seconds, isTimerRunning} = this.state

    if (isTimerRunning) {
      if (seconds > 0) {
        this.setState({seconds: seconds - 1})
      } else if (minutes > 0) {
        this.setState({minutes: minutes - 1, seconds: 59})
      } else {
        clearInterval(this.timerID)
      }
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      this.setState({isTimerRunning: false})
    } else {
      this.setState({isTimerRunning: true})
    }
  }

  onResetTimer = () => {
    this.setState({minutes: 25, seconds: '00', isTimerRunning: false})
    clearInterval(this.timerID)
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state

    const startOrPauseImgUrl = isTimerRunning ? PAUSE_ICON_IMG : PLAY_ICON_IMG

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          type="button"
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImgUrl}
            alt={startOrPauseAltText}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>

        <button
          type="button"
          className="timer-controller-btn"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  onIncrement = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        seconds: '00',
      }))
    }
  }

  onDecrement = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: '00',
      }))
    }
  }

  render() {
    const {minutes, seconds, isTimerRunning} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1>Digital Timer</h1>
          <div className="timer-and-controller-container">
            <div className="running-timer-bg">
              <div className="running-timer-container">
                <h1>
                  {minutes}:{seconds}
                </h1>
                <p>{isTimerRunning ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div className="controller-container">
              {this.renderTimerController()}
              <p>Set Timer limit</p>
              <div className="plus-minus-btn-container">
                <button
                  type="button"
                  className="plus-minus-btn"
                  onClick={this.onDecrement}
                >
                  -
                </button>
                <p className="minutes-text">{minutes}</p>
                <button
                  type="button"
                  className="plus-minus-btn"
                  onClick={this.onIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
