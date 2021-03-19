import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const { onEditProfile, onUpdateAvatar, onAddCard, onOpenFull, onCardSelect } = props;
  const currentUser = useContext(CurrentUserContext);

  const [isPreloading, setPreloadingStatement] = useState({
    cards: false,
    profile: false,
  });

  const [cards, setCards] = useState([]);

  function isLiked(cardLikes) {
    return cardLikes.some((like) => {
      return like._id === currentUser._id;
    });
  }

  function isAuthor(ownerId) {
    return ownerId === currentUser._id;
  }

  function handleCardLike(card) {
    if (!isLiked(card.likes)) {
      Api.sendLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      });
    } else {
      Api.delLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      });
    }
  }

  function handleCardDelete(id) {
    Api.deleteCard(id).then(() => {
      setCards((state) => state.filter((c) => c._id !== id));
    });
  }

  useEffect(() => {
    Api.getInitialCards()
      .then((data) => setCards(data))
      .catch(console.error(`Cards loading Error`));
    //.finally(setPreloadingStatement({ cards: false, profile: false }))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <section className="profile">
        <div
          className={isPreloading.profile ? "profile__avatar skeleton" : "profile__avatar"}
          onClick={() => onUpdateAvatar()}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          <div className="profile__change-icon" />
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className={isPreloading.profile ? "profile__name skeleton" : "profile__name"}>{currentUser.name}</h1>
            <button type="button" className="profile__edit" onClick={() => onEditProfile()} />
          </div>
          <p className={isPreloading.profile ? "profile__subtitle skeleton" : "profile__subtitle"}>
            {currentUser.about}
          </p>
        </div>
        <button type="button" className="button button_type_add" onClick={() => onAddCard()} />
      </section>
      <section className="cards">
        <ul className="grid-cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              link={card.link}
              name={card.name}
              likesAmount={card.likes.length}
              isLiked={isLiked(card.likes)}
              isAuthor={isAuthor(card.owner._id)}
              openFull={onOpenFull}
              onCardLike={() => handleCardLike(card)}
              onCardDelete={() => handleCardDelete(card._id)}
              selectCard={() => {
                onCardSelect(card);
              }}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
