import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupStatement] = useState(false);
  const [isUpdateAvatarPopupOpen, setUpdateAvatarPopupStatement] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupStatement] = useState(false);
  const [isFullImagePopupOpen, setFullImagePopupStatement] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    avatar: "",
    name: "",
    about: "",
    _id: "",
  });

  const [selectedCard, selectCard] = useState({});

  useEffect(() => api.getUserData().then((data) => setCurrentUser(data)), []);

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
        />

        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          closeCallback={closeAllPopups}
          name="dataEdit"
          title="Редактировать профиль"
          btnName="Сохранить"
        >
          <input
            id="name-input"
            autoComplete="off"
            required
            minLength={2}
            maxLength={40}
            defaultValue=""
            name="name"
            placeholder="Имя"
            className="popup__input"
            type="text"
          />
          <span className="popup__error popup__error_name-input" />
          <input
            id="subtitle-input"
            autoComplete="off"
            required
            minLength={2}
            maxLength={200}
            defaultValue=""
            name="subtitle"
            placeholder="Занятие"
            className="popup__input"
            type="text"
          />
          <span className="popup__error popup__error_subtitle-input" />
        </PopupWithForm>
        <PopupWithForm
          isOpen={isUpdateAvatarPopupOpen}
          closeCallback={closeAllPopups}
          name="updateAvatar"
          title="Обновить аватар?"
          btnName="Да"
        >
          <input
            id="avatar-input"
            required
            name="link"
            type="url"
            autoComplete="off"
            placeholder="Ссылка на автатар"
            className="popup__input"
          />
          <span className="popup__error popup__error_avatar-input" />
        </PopupWithForm>
        <PopupWithForm
          isOpen={isAddCardPopupOpen}
          closeCallback={closeAllPopups}
          name="addCard"
          title="Новое место"
          btnName="Сохранить"
        >
          <input
            id="title-input"
            required
            minLength={2}
            maxLength={30}
            name="name"
            autoComplete="off"
            placeholder="Название"
            className="popup__input"
            type="text"
          />
          <span className="popup__error popup__error_title-input" />
          <input
            id="image-input"
            required
            name="link"
            type="url"
            autoComplete="off"
            placeholder="Ссылка на картинку"
            className="popup__input"
          />
          <span className="popup__error popup__error_image-input" />
        </PopupWithForm>

        <ImagePopup isOpen={isFullImagePopupOpen} cardData={selectedCard} closeCallback={closeAllPopups} />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
