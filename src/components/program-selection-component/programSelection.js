import React, { Component } from "react";
import "./style.css";
import inputSeacrhIcon from "../../images/input-seacrh__icon.png";
import mechanic_main_1 from "../../images/mechanic_main_1.png";
import { CustomInput } from "../custom-input/customInput";
const inputValuesCategory = [
  { text: "Базы данных", value: 1 },
  { text: "Веб разработка", value: 2 },
  { text: "Языки программирования", value: 3 },
  { text: "Мобильная разработка", value: 4 },
  { text: "Другое", value: 5 }
];

const inputValuesСomplexity = [
  { text: "Начинающий", value: 2 },
  { text: "Средний", value: 3 },
  { text: "Продвинутый", value: 4 }
];

export class ProgramSelection extends Component {
  state = {
    currentValueComplexity: "Уровень сложности",
    currentValueCategory: "Все категории "
  };

  handleChangeCategory = text => {
    this.setState({ currentValueCategory: text });
  };

  handleChangeComplexity = text => {
    this.setState({ currentValueComplexity: text });
  };

  programSelectionLayout = () => (
    <div className="page page_margin page__choose-program">
      <p className="choose-program__header">Выбери свою программу обучения</p>
      <div className="control control__flex">
        <span className="control__item">
          <CustomInput
            inputValues={inputValuesСomplexity}
            currentValue={this.state.currentValueComplexity}
            handleChange={this.handleChangeComplexity}
          />
        </span>
        <span className="control__item">
          <CustomInput
            inputValues={inputValuesCategory}
            currentValue={this.state.currentValueCategory}
            handleChange={this.handleChangeCategory}
          />
        </span>

        <span className="control__item">
          <div className="input-search input-search__size">
            <img
              className="input-search__icon"
              src={inputSeacrhIcon}
              alt="лупа"
            />
            <input
              className="input-search__input"
              type="search"
              placeholder="Поиск...."
            />
          </div>
        </span>
      </div>

      <button className="choose-program__button choose-program__button_hover">
        Начать обучение
      </button>
      <img
        src={mechanic_main_1}
        className="choose-program__mechanic"
        alt="шестиренка"
      />
    </div>
  );
  render() {
    return <this.programSelectionLayout />;
  }
}
