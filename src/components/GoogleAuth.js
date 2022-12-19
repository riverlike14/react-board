import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const client_id = "1061867594735-1gukjieekm01aoicmkkhn9agoo7lk9i5.apps.googleusercontent.com";

class GoogleAuth extends React.Component {
	// state = { isSignedIn: null };

	componentDidMount() {
		window.gapi.load("client:auth2", () => {
			window.gapi.client.init({
				plugin_name: "streamy",
				clientId: client_id,
				scope: "email"
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				// this.setState({ isSignedIn: this.auth.isSignedIn.get() });
				this.onAuthChange(this.auth.isSignedIn.get());
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		// if (this.state.isSignedIn === null) {
		if (this.props.isSignedIn === null) {
			return null;
		// } else if (this.state.isSignedIn) {
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			)
		} else {
			return (
				<button onClick={this.onSignInClick} className="ui red google button">
					<i className="google icon" />
					Sign In with Google
				</button>
			)
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
	mapStateToProps,
	{ signIn, signOut }
)(GoogleAuth);
