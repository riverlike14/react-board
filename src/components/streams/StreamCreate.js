import React, { Component } from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends Component {
	/*
	renderInput(formProps) {
		// return <input {...formProps.input} />
			<input
				onChange={formProps.input.onChange}
				value={formProps.input.value}
			/>;
	}
	*/

	onSubmit = (formValues) => {
		// event.preventDefault();
		// formValues;
		this.props.createStream(formValues);
	}

	render() {
		return (
			<div>
				<h3>Create a Stream</h3>
				<StreamForm onSubmit={this.onSubmit}/>
			</div>
		);
	}
}

/*
export default reduxForm({
	form: "streamCreate",
	validate: validate
})(StreamCreate);
*/

export default connect(
	null,
	{ createStream: createStream }
)(StreamCreate);
