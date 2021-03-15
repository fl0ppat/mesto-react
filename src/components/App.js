import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
/* 
  Приношу свои извинения за столь нечитаемый код. 
  Я не внимательно прочёл бриф, а когда опомнился - было уже поздно.
  Код привратился в спагетти. Думал, что смогу раскрутить его без тотально переписывания.

  Огромное вам спасибо за ваши ревью! Мне право стыдно, что вам
  пришлось написать 2 ревью размером со средние статьи.

  ❤️

*/

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupStatement] = useState(false);
  const [isUpdateAvatarPopupOpen, setUpdateAvatarPopupStatement] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupStatement] = useState(false);
  const [isFullImagePopupOpen, setFullImagePopupStatement] = useState(false);

  const [selectedCard, selectCard] = useState({});

  /**
   *
   * @param {Bollean} state
   */
  const handleEditProfileClick = (state) => setEditProfilePopupStatement(state);
  const handleEditAvatarClick = (state) => setUpdateAvatarPopupStatement(state);
  const handleAddPlaceClick = (state) => setAddCardPopupStatement(state);
  const handleFullImagePopupOpen = (state) => setFullImagePopupStatement(state);

  const handleCardSelection = (card) => selectCard(card);

  const closeAllPopups = () => {
    setEditProfilePopupStatement(false);
    setUpdateAvatarPopupStatement(false);
    setAddCardPopupStatement(false);
    setFullImagePopupStatement(false);
  };

  return (
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
  );
}

export default App;
