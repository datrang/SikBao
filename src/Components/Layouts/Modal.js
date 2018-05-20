import React from "react";
import Popup from "reactjs-popup";
import '../../modals.css';

export default ({ logIn, signUp }) => (
    <Popup
    trigger={<button className="button"> Log in </button>}
    modal
    >
        {close => (
            <div className="modal">
                <input
                    id="txtEmail"
                    type="email"
                    placeholder="Email"
                />
                <input
                    id="txtPassword"
                    type="password"
                    placeholder="Password"
                />
                <button
                    id="btnLogIn"
                    className="btn btn-action"
                    onClick={() => logIn(document.getElementById('txtEmail'), document.getElementById('txtPassword'))}
                >Log In
                </button>
                <button
                    id="btnSignUp"
                    className="btn btn-secondary"
                    onClick={() => signUp(document.getElementById('txtEmail'), document.getElementById('txtPassword'))}
                >Sign Up
                </button>
            </div>
        )}
    </Popup>
);