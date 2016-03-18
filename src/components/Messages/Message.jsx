import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactEmoji from 'react-emoji';

class Message extends Component{

	render(){

		const {message} = this.props
		var formattedTime = this.formatTime(message.timeStamp)

		return(
			<div className="message">
				<strong>{message.user}</strong> {formattedTime} - { ReactEmoji.emojify(message.text) }
			</div>
		)

	}

	formatTime(timestamp){
		var dt = new Date(timestamp)

		var hours = dt.getHours()
		var minutes = dt.getMinutes()
		var seconds = dt.getSeconds()

		return hours + ":" + minutes + ":" + seconds

	}

}

export default Message

