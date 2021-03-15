import React, { useEffect, useState } from "react";
import Api from "../utils/Api";
import PopupWithForm from "./PopupWithForm";

function Profile() {
  const [isEditProfilePopupOpen, setEditProfilePopupStatement] = useState(false);
  const [isUpdateAvatarPopupOpen, setUpdateAvatarPopupStatement] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupStatement] = useState(false);
  const [ProfileData, setUserData] = useState({
    isPreloading: true,
    userData: {
      avatar: "",
      name: "",
      about: "",
    },
  });

  const openEditProfilePopup = () => setEditProfilePopupStatement(true);
  const openUpdateAvatarPopup = () => setUpdateAvatarPopupStatement(true);
  const openAddCardPopup = () => setAddCardPopupStatement(true);

  function closeAllPopups() {
    setEditProfilePopupStatement(false);
    setUpdateAvatarPopupStatement(false);
    setAddCardPopupStatement(false);
  }

  useEffect(() => {
    Api.getUserData().then((data) => {
      setUserData({
        isPreloading: false,
        userData: data,
      });
    });
  }, []);

  return (
    <>
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
      <section className="profile">
        <div
          className={ProfileData.isPreloading ? "profile__avatar skeleton" : "profile__avatar"}
          onClick={() => openUpdateAvatarPopup()}
          style={{ backgroundImage: `url(${ProfileData.userData.avatar})` }}
        >
          <div className="profile__change-icon" />
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className={ProfileData.isPreloading ? "profile__name skeleton" : "profile__name"}>
              {ProfileData.userData.name}
            </h1>
            <button type="button" className="profile__edit" onClick={() => openEditProfilePopup()} />
          </div>
          <p className={ProfileData.isPreloading ? "profile__subtitle skeleton" : "profile__subtitle"}>
            {ProfileData.userData.about}
          </p>
        </div>
        <button type="button" className="button button_type_add" onClick={() => openAddCardPopup()} />
      </section>
    </>
  );
}

export default Profile;
