import Popup from "./Popup";

class PopupWithForm extends Popup {
  render() {
    let form = "";
    switch (this.props.type) {
      case "editProfile":
        form = (
          <form className="popup__form" id="formEdit" name="dataEdit" action="." noValidate>
            <h2 className="popup__title">Редактировать профиль</h2>
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
              ddefaultValue=""
              name="subtitle"
              placeholder="Занятие"
              className="popup__input"
              type="text"
            />
            <span className="popup__error popup__error_subtitle-input" />
            <button disabled className="button button_type_save button_type_inactive" type="submit">
              Сохранить
            </button>
          </form>
        );
        break;

      case "confirm":
        form = (
          <form className="popup__form" id="formConfirmDelete" name="deleteCard" action="." noValidate>
            <h2 className="popup__title">Вы уверены?</h2>
            <button className="button button_type_save" type="submit">
              Да
            </button>
          </form>
        );
        break;

      case "updateAvatar":
        form = (
          <form className="popup__form" id="formUpdateAvatar" name="updateAvatar" action="." noValidate>
            <h2 className="popup__title">Обновить аватар</h2>
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
            <button disabled className="button button_type_save button_type_inactive" type="submit">
              Да
            </button>
          </form>
        );
        break;

      case "addCard":
        form = (
          <form className="popup__form" id="formAdd" name="dataEdit" action="." noValidate>
            <h2 className="popup__title">Новое место</h2>
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
            <button disabled className="button button_type_save button_type_inactive" type="submit">
              Сохранить
            </button>
          </form>
        );
        break;

      default:
        break;
    }

    return super.render(form);
  }
}

export default PopupWithForm;
