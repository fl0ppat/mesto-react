import React from "react";
import logo from "../images/header-logo.svg";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <a href="/" target="_blank" className="header__logo-link">
          <img src={logo} alt="Логотип" className="header__logo-img" />
        </a>
      </header>
    );
  }
}

export default Header;
