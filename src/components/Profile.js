import React, { useEffect } from "react";
import Api from "../utils/Api";
import PopupWithForm from "./PopupWithForm";

function Profile() {
  const [ProfileData, setUserData] = React.useState({
    isPreloading: true,
    userData: {
      avatar: "",
      name: "",
      about: "",
    },
  });

  const [popupVisibility, setPopupVisibility] = React.useState({
    visible: false,
    type: "",
  });

  useEffect(() => {
    //function getProfileData() {
    Api.getUserData().then((data) => {
      setUserData({
        isPreloading: false,
        userData: data,
      });
    });
    //}
  }, []);

  return (
    <>
      <section className="profile">
        <div
          className={ProfileData.isPreloading ? "profile__avatar skeleton" : "profile__avatar"}
          onClick={() => setPopupVisibility({ visible: true, type: "updateAvatar" })}
          style={{ backgroundImage: `url(${ProfileData.userData.avatar})` }}
        >
          <div className="profile__change-icon" />
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className={ProfileData.isPreloading ? "profile__name skeleton" : "profile__name"}>
              {ProfileData.userData.name}
            </h1>
            <button
              type="button"
              className="profile__edit"
              onClick={() => setPopupVisibility({ visible: true, type: "editProfile" })}
            />
          </div>
          <p className={ProfileData.isPreloading ? "profile__subtitle skeleton" : "profile__subtitle"}>
            {ProfileData.userData.about}
          </p>
        </div>
        <button
          type="button"
          className="button button_type_add"
          onClick={() => setPopupVisibility({ visible: true, type: "addCard" })}
        />
      </section>
      {popupVisibility.visible && (
        <PopupWithForm
          open={true}
          type={popupVisibility.type}
          closeMethod={() => setPopupVisibility({ visible: false, type: "" })}
        />
      )}
    </>
  );
}

export default Profile;
