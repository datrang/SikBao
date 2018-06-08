import React from "react";
import Popup from "reactjs-popup";
import './modals.css';

export default ({ logIn, signUp }) => (
    <Popup
    trigger={<button className="login_button">Log in</button>}
    modal
    >
        {close => (
            <div className="modal">
                <input
                    className = 'email_input'
                    id="txtEmail"
                    type="email"
                    placeholder="Email"
                />
                <input
                    className = 'password_input'
                    id="txtPassword"
                    type="password"
                    placeholder="Password"
                />
                <button
                    className = 'enter_button'
                    id="btnLogIn"
                    onClick={() => logIn(document.getElementById('txtEmail'), document.getElementById('txtPassword'))}
                >Log In
                </button>
                <button
                    className = 'enter_button'
                    id="btnSignUp"
                    onClick={() => signUp(document.getElementById('txtEmail'), document.getElementById('txtPassword'))}
                >Sign Up
                </button>
                <p></p>
                <div className = "prompt">
                    Sign up will use currently typed in data, password must be longer than 6 letters because firebase
                </div>
            </div>
        )}
    </Popup>
);