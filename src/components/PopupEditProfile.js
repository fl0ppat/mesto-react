import Popup from "./Popup";

class PopupEditProfile extends Popup {
  constructor(props) {
    super(props);
    this._id = props._id;
    this.state = {
      name: "",
      about: "",
      isOpen: props.open,
    };
  }

  render() {
    const form = (
      <form className="popup__form" id="formEdit" name="dataEdit" action="." noValidate>
        <button type="button" className="popup__close" />
        <h2 className="popup__title">Редактировать профиль</h2>
        <input
          id="name-input"
          autoComplete="off"
          required
          minLength={2}
          maxLength={40}
          defaultValue
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
          defaultValue
          name="subtitle"
          placeholder="Заслуга"
          className="popup__input"
          type="text"
        />
        <span className="popup__error popup__error_subtitle-input" />
        <button className="button button_type_save" type="submit">
          Сохранить
        </button>
      </form>
    );
    return super.render(form);
  }
}
export default PopupEditProfile;
