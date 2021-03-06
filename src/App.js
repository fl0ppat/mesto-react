import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
      <section className="popup" id="edit">
        <div className="popup__container">
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
        </div>
      </section>
      <section className="popup" id="confirm">
        <div className="popup__container">
          <form className="popup__form" id="formConfirmDelete" name="deleteCard" action="." noValidate>
            <button type="button" className="popup__close" />
            <h2 className="popup__title">Вы уверены?</h2>
            <button className="button button_type_save" type="submit">
              Да
            </button>
          </form>
        </div>
      </section>
      <section className="popup" id="updateAvatar">
        <div className="popup__container">
          <form className="popup__form" id="formUpdateAvatar" name="updateAvatar" action="." noValidate>
            <button type="button" className="popup__close" />
            <h2 className="popup__title">Обновить аватар</h2>
            <input
              id="avatar-input"
              required
              defaultValue
              name="link"
              type="url"
              autoComplete="off"
              placeholder="Ссылка на автатар"
              className="popup__input"
            />
            <span className="popup__error popup__error_avatar-input" />
            <button className="button button_type_save button_type_inactive" type="submit">
              Да
            </button>
          </form>
        </div>
      </section>
      <section className="popup" id="add">
        <div className="popup__container">
          <form className="popup__form" id="formAdd" name="dataEdit" action="." noValidate>
            <button type="button" className="popup__close" />
            <h2 className="popup__title">Новое место</h2>
            <input
              id="title-input"
              required
              defaultValue
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
              defaultValue
              name="link"
              type="url"
              autoComplete="off"
              placeholder="Ссылка на картинку"
              className="popup__input"
            />
            <span className="popup__error popup__error_image-input" />
            <button className="button button_type_save button_type_inactive" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </section>
      <section className="popup" id="full">
        <div className="popup__full">
          <button type="button" className="popup__close" />
          <img src="#" alt="Пейзаж" className="popup__img" />
          <p className="popup__full-title" />
        </div>
      </section>
      <template id="mesto" />
    </div>
  );
}

export default App;
