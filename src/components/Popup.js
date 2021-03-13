import React from "react";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: this.props.open };
  }

  openPopup() {
    this.setState({ isOpen: true });
  }

  closePopup() {
    this.setState({ isOpen: false });
  }

  render(additionalMarkup) {
    return (
      <section className={this.state.isOpen ? "popup popup_opened" : "popup"} id={this.props.sectionId}>
        <div className="popup__container">
          <button
            type="button"
            onClick={() => {
              this.closePopup();
              this.props.closeMethod && this.props.closeMethod();
            }}
            className="popup__close"
          />
          {additionalMarkup}
        </div>
      </section>
    );
  }
}

export default Popup;
