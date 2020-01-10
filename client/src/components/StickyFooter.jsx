import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal.jsx";
import AddBagModal from "./AddBagModal.jsx";
import AddShoppingListModal from "./AddShoppingListModal.jsx";

class StickyFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalProducts: this.props.products,
      addList: false,
      addBag: false
      // position: 0,
      // scrollDirection: ""
    };

    this.showList = this.showList.bind(this);
    this.showBag = this.showBag.bind(this);
  }

  showList(e) {
    e.preventDefault();
    this.setState(
      {
        addList: !this.state.addList
      }
      // () => console.log(this.state.addList)
    );
  }

  showBag(e) {
    e.preventDefault();
    this.setState(
      {
        addBag: !this.state.addBag
      }
      // () => console.log(this.state.addBag)
    );
  }

  // handleScroll(e) {
  //   var positionDifference = e.path[1].pageYOffset - this.state.position;
  //   this.setState(
  //     {
  //       position: e.path[1].pageYOffset
  //     },
  //     () => console.log(this.state.position)
  //   );

  //   if (positionDifference > 0) {
  //     this.setState({
  //       scrollDirection: "down"
  //     });
  //   } else {
  //     this.setState({
  //       scrollDirection: "up"
  //     });
  //   }
  // }

  // componentDidMount() {
  //   window.addEventListener("scroll", e => this.handleScroll(e));
  // }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="as-modalComponent">
          {this.props.children}

          <div className="as-modalFooter">
            <span className="as-modalImage">
              {/* {console.log(this.props.product.itemimage)} */}
              <img
                src={this.props.productDisplay.data.itemimage}
                className="as-styledHistoryProductImage"
                height="55"
                width="55"
              ></img>
            </span>
            <span>
              <div className="as-modalText">
                {this.props.productDisplay.data.itemname}
              </div>
              <div className="as-modalLink">Show Price</div>
            </span>
            <span className="as-addToList">
              <button
                className="as-addToListButton"
                onClick={e => this.showList(e)}
              >
                <svg
                  className="as-addToListSVG"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18,18h2v2H18v2H16V20H14V18h2V16h2ZM12,6H6V8h6ZM6,12H8V10H6ZM4,4H14l2-2H2V22H12V20H4ZM5.77,18.29l4.66-2.05L22,4.66,19.34,2,7.72,13.73Z"></path>
                </svg>
              </button>
            </span>
            <span className="as-addToBag">
              <button
                className="as-addToBagButton"
                onClick={e => this.showBag(e)}
              >
                <svg
                  className="as-addToBagSVG"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20 15h2v2h-2v2h-2v-2h-2v-2h2v-2h2zm-6 2H6.441l-1.666-6h16.558L22 9h-5.323l-1.245-3.114L12.646 4h-1.292L8.569 5.886 7.322 9H2l2.544 8.633A2 2 0 0 0 6.441 19H14zM10.677 6h2.646l1.2 3H9.477z"></path>
                </svg>
              </button>
            </span>
          </div>
          <div>
            <Modal>
              <AddBagModal
                data={this.state.modalProducts}
                onClose={this.showBag}
                show={this.state.addBag}
              ></AddBagModal>
            </Modal>
          </div>
          <div>
            <Modal>
              <AddShoppingListModal
                onClose={this.showList}
                show={this.state.addList}
              ></AddShoppingListModal>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

StickyFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default StickyFooter;

// The gray background
// const backdropStyle = {
//   position: "fixed",
//   top: 0,
//   bottom: 0,
//   left: 0,
//   right: 0,
//   backgroundColor: "rgba(0,0,0,0.3)",
//   padding: 50
// };

// The modal "window"
// const modalStyle = {
//   backgroundColor: "#fff",
//   borderRadius: 5,
//   maxWidth: 500,
//   minHeight: 300,
//   margin: "0 auto",
//   padding: 30
// };
