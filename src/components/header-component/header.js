import React, { Component } from "react";
import "./style.css";
import { history } from "../../services/redux";
import header_settings from "../../images/header_settings.png";
import header_notification from "../../images/header_notofication.png";
import header_avatar from "../../images/header_avatar.png";
import helpImg from "../../images/help.svg";
import { LongMenu } from "../menu";
import { Slider } from "../../components/slider";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { deleteUserToken } from '../../redux/actions/user.action';

class HeaderComponent extends Component {
  controlPanel = 'inline';
  regPanel = 'flex';
  user = () => {
    let token = localStorage.getItem('token');
    if (token) {
      this.controlPanel = 'inline';
    }
    else {
      this.controlPanel = 'none';
    }
    if (!token) {
      this.regPanel = 'flex';
    }
    else {
      this.regPanel = 'none';
    }
  }
  handleLoginClick = () => {
    history.push("/login");
    document.documentElement.scrollTop = 0;
  };

  handleRegistrationClick = () => {
    history.push("/registration");
    document.documentElement.scrollTop = 0;
  };

  handleClickAboutUs = () => {
    history.push("/");
    document.documentElement.scrollTop = 0;
  };

  handleClickOlympic = () => {
    history.push('/olympic-enter');
    document.documentElement.scrollTop = 0;
  }

  logout = () => {
    localStorage.removeItem('token');
    this.props.DeleteUserToken();
  };

  openProfile = () => {
    history.push("/profile");
    alert("Profile click");
  };

  HeaderLayout = () => {
    const { location } = this.props;
    const isMainPage = location.pathname === "/";

    const menuButtonsProperties = [
      {
        text: "Выйти",
        icon: helpImg,
        onClick: this.logout
      },
    ];

    return (
      <header
        className={`header ${
          isMainPage ? "header__size_main-page" : "header__size"
          } header_back-styles`}
      >
        <div className="page page_margin page_position">
          <div className="regist-enter regist-enter__flex regist-enter__size regist-enter__margin" style={{ display: this.regPanel }}>
            <React.Fragment>
              <button
                className="regist-enter__enter regist-enter__enter_hover"
                onClick={this.handleLoginClick}
              >
                Войти
                </button>
              <button
                className="regist-enter__registration regist-enter__registration_hover"
                onClick={this.handleRegistrationClick}
              >
                Регистрация
                </button>
            </React.Fragment>
          </div>

          <nav className="navigation">
            <ul className="navigation-list navigation-list_margin navigation-list_font">
              <li className="navigation-list__item">
                <button
                  onClick={this.handleClickAboutUs}
                  className="navigation-list__link navigation-list__link_hover"
                >
                  О проекте
                </button>
              </li>
              <li className="navigation-list__item">
                <a
                  href=""
                  className="navigation-list__link navigation-list__link_hover"
                >
                  Ваши возможности
                </a>
              </li>
              <li className="navigation-list__item">
                <button
                  onClick={this.handleClickOlympic}
                  className="navigation-list__link navigation-list__link_hover"
                >
                  Олимпиады
                </button>
              </li>
              <li className="navigation-list__item">
                <a
                  href=""
                  className="navigation-list__link navigation-list__link_hover"
                >
                  Учебные курсы
                </a>
              </li>
              <li className="navigation-list__item">
                <a
                  href=""
                  className="navigation-list__link navigation-list__link_hover"
                >
                  Контакты
                </a>
              </li>

              <li className="navigation-list__item navigation-list__control-panel" style={{ display: this.controlPanel }}>
                <a
                  href=""
                  className="navigation-list__link navigation-list__link_margin navigation-list__link_hover"
                >
                  <img
                    src={header_settings}
                    className="navigation-list__settings"
                    alt="шестиренка"
                  />
                </a>
                <a
                  href=""
                  className="navigation-list__link navigation-list__link_margin navigation-list__link_hover"
                >
                  <img
                    src={header_notification}
                    className="navigation-list__notification"
                    alt="колокольчик"
                  />
                </a>
                <a
                  href=""
                  className="navigation-list__link navigation-list__link_margin navigation-list__link_hover navigation-list__link_avatar"
                >
                  <img
                    src={header_avatar}
                    className="navigation-list__avatar"
                    alt="аватар"
                  />
                </a>

                <span className="navigation-list__popup-menu">
                  <LongMenu options={menuButtonsProperties} />
                </span>
              </li>
            </ul>
          </nav>
        </div>
        <div> {isMainPage ? <Slider /> : null}</div>
      </header>
    );
  };

  render() {
    this.user();
    return <this.HeaderLayout />;
  }
}

const mapDispatchToProps = (dispacth) => ({
  DeleteUserToken: () => {
    dispacth(deleteUserToken());
  },
})

export const Header = withRouter(connect(null, mapDispatchToProps)(HeaderComponent));
