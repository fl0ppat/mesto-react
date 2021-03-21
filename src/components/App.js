import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import api from "../utils/api";

import CurrentUserContext from "../contexts/CurrentUserContext";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupStatement] = useState(false);
  const [isUpdateAvatarPopupOpen, setUpdateAvatarPopupStatement] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupStatement] = useState(false);
  const [isFullImagePopupOpen, setFullImagePopupStatement] = useState(false);

  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [selectedCard, selectCard] = useState({});

  useEffect(
    () =>
      api.getUserData().then((data) => {
        setCurrentUser(data);
      }),
    []
  );

  function handleCardLike(card) {
    if (!isLiked(card.likes)) {
      api.sendLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      });
    } else {
      api.delLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      });
    }
  }

  function isLiked(cardLikes) {
    return cardLikes.some((like) => {
      return like._id === currentUser._id;
    });
  }

  function handleCardDelete(id) {
    api.deleteCard(id).then(() => {
      setCards((state) => state.filter((c) => c._id !== id));
    });
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => setCards(data))
      .catch(console.error(`Cards loading Error`));
    //.finally(setPreloadingStatement({ cards: false, profile: false }))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditProfileClick = () => setEditProfilePopupStatement(true);
  const handleEditAvatarClick = () => setUpdateAvatarPopupStatement(true);
  const handleAddPlaceClick = () => setAddCardPopupStatement(true);
  const handleFullImagePopupOpen = () => setFullImagePopupStatement(true);

  const handleCardSelection = (card) => selectCard(card);

  const closeAllPopups = () => {
    setEditProfilePopupStatement(false);
    setUpdateAvatarPopupStatement(false);
    setAddCardPopupStatement(false);
    setFullImagePopupStatement(false);
  };

  const handleUpdateUser = (data) => {
    api
      .editProfileData(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(
        setCurrentUser({
          name: "mr.Crot",
          about: "Приходит когда что-то сломалось",
        })
      );
  };

  const handleUpdateAvatar = (link) => {
    api
      .updateAvatar(link)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.error("Ошибка установки аватара"));
  };

  const handleAddPlaceSubmit = (name, link) => {
    console.log(name, link);
    api
      .addNewCard(name, link)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(console.error("Ошибка добавления карточки"));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onUpdateAvatar={handleEditAvatarClick}
          onAddCard={handleAddPlaceClick}
          onOpenFull={handleFullImagePopupOpen}
          onCardSelect={handleCardSelection}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          closeCallback={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isUpdateAvatarPopupOpen}
          closeCallback={closeAllPopups}
          onUpdateUserAvatar={handleUpdateAvatar}
          name="updateAvatar"
          title="Обновить аватар?"
          btnName="Да"
        />
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          closeCallback={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
          name="addCard"
          title="Новое место"
          btnName="Сохранить"
        ></AddPlacePopup>

        <ImagePopup isOpen={isFullImagePopupOpen} cardData={selectedCard} closeCallback={closeAllPopups} />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
