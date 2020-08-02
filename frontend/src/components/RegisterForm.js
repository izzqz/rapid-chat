import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, TextInput} from 'grommet';

const buttonStyle = {
    marginTop: '12px'
};

/**
 * The form that meets the user and allows you to "register" in the system
 */
export default class RegisterForm extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            username: localStorage.getItem('username') || '',
            isValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    // TODO: Enter key press handle

    validate() {
        if (this.state.username !== '') {
            this.saveUsername();
            this.setState({isValid: true});
        } else {
            alert('Username must contain at least one character');
        }
    }

    saveUsername() {
        localStorage.setItem('username', this.state.username);
    }

    handleChange(e) {
        this.setState({username: e.target.value.trim()});
    }

    render() {
        if (this.state.isValid) return <Redirect to='/rooms'/>;

        return (
            <div>
                <TextInput
                    placeholder="Enter your name"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <Button
                    style={buttonStyle}
                    onClick={this.validate}
                    primary
                    label='Get In'
                />
            </div>
        );
    }
}