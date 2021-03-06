import React from "react";

class Main extends React.Component {
  render() {
    return (
      <main>
        <section className="profile">
          <div className="profile__avatar skeleton">
            <div className="profile__change-icon" />
          </div>
          <div className="profile__info">
            <div className="profile__wrapper">
              <h1 className="profile__name skeleton"> </h1>
              <button type="button" className="profile__edit" />
            </div>
            <p className="profile__subtitle skeleton" />
          </div>
          <button type="button" className="button button_type_add" />
        </section>
        <section className="cards">
          <div className="loading" />
          <ul className="grid-cards"></ul>
        </section>
      </main>
    );
  }
}

export default Main;
