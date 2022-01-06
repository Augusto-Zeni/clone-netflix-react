import React from "react";
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="/netflix-logo.png" alt="netflix" />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="avatar.png" alt="usuario" />
                </a>
            </div>
        </header>
    );
}