import Popup from "./Popup";

class ImagePopup extends Popup {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.open,
      imageUrl: "",
      title: "",
    };
  }

  openPopup() {
    this.setState({
      isOpen: this.props.open,
      imageUrl: this.props.imageUrl,
      title: this.props.title,
    });
    super.openPopup();
  }

  closePopup() {
    this.props.closeCallback();
    super.closePopup();
  }

  render() {
    const image = (
      <div className="popup__full">
        <img src={this.props.imageUrl} alt={this.props.title} className="popup__img" />
        <p className="popup__full-title">{this.props.title}</p>
      </div>
    );
    return super.render(image);
  }
}

export default ImagePopup;
