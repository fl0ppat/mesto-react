import React from "react";
import Api from "../utils/Api.js";
import Card from "./Card";
import PopupWithImage from "./PoupWithImage";
import PopupWithForm from "./PopupWithForm";

class Grid extends React.Component {
  constructor() {
    super();
    this.userId = "0";
    this.state = {
      cards: [],
      currentImageId: 0,
      popups: {
        image: false,
        confirm: false,
      },
    };

    this.openFullImage = this.openFullImage.bind(this);
    this.openConfirm = this.openConfirm.bind(this);
    this.closePopupCallbackImage = this.closePopupCallbackImage.bind(this);
  }

  async apiCall() {
    let newState = {};
    Promise.all([Api.getUserData(), Api.getInitialCards()])
      .then((data) => {
        this.userId = data[0]._id;

        newState.cards = data[1];
        newState.currentImageId = this.state.currentImageId;
        newState.popups = { image: false, confirm: false };

        this.setState(newState);
      })
      .catch(`Ошибка загрузки данных`);
  }

  componentDidMount() {
    this.apiCall();
  }

  closePopupCallbackImage() {
    console.log(this.state);
    this.setState({
      cards: this.state.cards,
      currentImageId: 0,
      popupIsOpen: false,
      popups: {
        image: false,
        confirm: false,
      },
    });
  }

  openConfirm() {
    this.setState({
      cards: this.state.cards,
      currentImageId: 0,
      popupIsOpen: true,
      popups: {
        image: false,
        confirm: true,
      },
    });
  }

  openFullImage(id) {
    this.setState({
      cards: this.state.cards,
      currentImageId: id,
      popupIsOpen: true,
      popups: {
        image: true,
        confirm: false,
      },
    });
  }

  render() {
    if (this.state.cards.length <= 0) {
      return (
        <>
          <section className="cards">
            <div className="loading" />
            <ul className="grid-cards"></ul>
          </section>
        </>
      );
    }
    return (
      <>
        {this.state.popups.image && this.state.popupIsOpen && (
          <PopupWithImage
            open={this.state.popupIsOpen}
            imageUrl={this.state.cards[this.state.currentImageId].link}
            title={this.state.cards[this.state.currentImageId].name}
            closeCallback={this.closePopupCallbackImage}
          />
        )}
        {this.state.popupIsOpen && this.state.popups.confirm && (
          <PopupWithForm open={this.state.popupIsOpen} type="confirm" closeMethod={this.closePopupCallbackImage} />
        )}
        <section className="cards">
          <ul className="grid-cards">
            {this.state.cards.map((card, index) => (
              <Card
                key={index}
                index={index}
                cardData={card}
                userId={this.userId}
                openFullCallback={this.openFullImage}
                openConfirmCallback={this.openConfirm}
              />
            ))}
          </ul>
        </section>
      </>
    );
  }
}

export default Grid;
