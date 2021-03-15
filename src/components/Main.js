import React, { useState, useEffect } from "react";
import Api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const { onEditProfile, onUpdateAvatar, onAddCard, onOpenFull, onCardSelect } = props;

  const [isPreloading, setPreloadingStatement] = useState({
    cards: true,
    profile: true,
  });

  const [cards, setCards] = useState([]);
  const [userData, setUserData] = useState({
    avatar: "",
    name: "",
    about: "",
    _id: "",
  });

  function isLiked(cardLikes) {
    return cardLikes.some((like) => {
      return like._id === userData._id;
    });
  }

  function isAuthor(ownerId) {
    return ownerId === userData._id;
  }

  useEffect(() => {
    Api.getUserData()
      .then((data) => {
        setUserData(data);
      })
      .catch(() => {
        setUserData({
          avatar: "https://media.tenor.com/images/30b9925b2363036c92c5132a387ecbe1/tenor.gif",
          name: "mr.Cit",
          about: "Приходит только когда что-то сломалось",
          _id: 0,
        });
      })
      .finally(setPreloadingStatement({ cards: isPreloading.cards, profile: false }));
    Api.getInitialCards()
      .then((data) => setCards(data))
      .catch(console.error(`Cards loading Error`))
      .finally(setPreloadingStatement({ cards: false, profile: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <section className="profile">
        <div
          className={isPreloading.profile ? "profile__avatar skeleton" : "profile__avatar"}
          onClick={() => onUpdateAvatar(true)}
          style={{ backgroundImage: `url(${userData.avatar})` }}
        >
          <div className="profile__change-icon" />
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className={isPreloading.profile ? "profile__name skeleton" : "profile__name"}>{userData.name}</h1>
            <button type="button" className="profile__edit" onClick={() => onEditProfile(true)} />
          </div>
          <p className={isPreloading.profile ? "profile__subtitle skeleton" : "profile__subtitle"}>{userData.about}</p>
        </div>
        <button type="button" className="button button_type_add" onClick={() => onAddCard(true)} />
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
