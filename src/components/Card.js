import React from "react";
//import Api from "../utils/Api";

class Card extends React.Component {
  getCardLikesAmount() {
    return this.props.cardData.likes.length;
  }

  likeCard() {
    console.log("лайк");
    //Api.sendLike(this.props.cardData._id);
  }

  isLiked() {
    const isLiked = this.props.cardData.likes.some((like) => {
      return like._id === this.props.userId;
    });
    return isLiked;
  }

  userIsAuthor() {
    return this.props.cardData.owner._id === this.props.userId;
  }

  render() {
    return (
      <li className="grid-cards__card">
        <img
          src={this.props.cardData.link}
          alt={this.props.cardData.name}
          onClick={() => {
            this.props.openFullCallback(this.props.index);
          }}
          className="grid-cards__img"
        />
        {this.userIsAuthor() && (
          <button type="button" className="grid-cards__delete" onClick={this.props.openConfirmCallback}></button>
        )}

        <div className="grid-cards__badge">
          <h2 className="grid-cards__title">{this.props.cardData.name}</h2>
          <div className="grid-cards__like-container">
            <button
              onClick={this.likeCard}
              type="button"
              className={this.isLiked() ? "grid-cards__like grid-cards__like_liked" : "grid-cards__like"}
            ></button>
            <p className="grid-cards__like-counter">{this.getCardLikesAmount()}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default Card;
