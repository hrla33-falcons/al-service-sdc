import React from "react";
import PropTypes from "prop-types";
import AddBagModalListEntry from "./AddBagModalListEntry.jsx";

export default class AddBagModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: this.props.data
    };

    this.shuffleArray = this.shuffleArray.bind(this);
  }

  componentDidMount() {
    this.setState({
      productList: this.shuffleArray(this.state.productList)
    });
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <div className="as-backdrop">
          <div className="as-modalStyle">
            <div className="as-mainDiv">
              <div className="as-upperDiv">
                <div className="as-checkmarkPlacement">
                  <div className="as-checkmark">
                    <svg className="as-checkmarkSVG">
                      <g fill="none">
                        <path
                          fill="#0A8A00"
                          d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
                        ></path>
                        <path
                          fill="#FFF"
                          d="M10.873 13.478l-3.41-3.657L6 11.185l4.832 5.066 7.28-6.788L16.746 8z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <span className="as-addToCart">Added to cart</span>
                </div>
                <button className="as-closeButton">
                  <svg
                    className="as-closeIcon"
                    onClick={this.props.onClose}
                    height="20px"
                    width="20px"
                  >
                    <path d="M17.597 5l-5.592 5.592L6.414 5 5 6.415l5.591 5.591L5 17.597l1.414 1.414 5.591-5.592 5.592 5.592 1.414-1.414-5.592-5.591 5.592-5.591z"></path>
                  </svg>
                </button>
              </div>
              <div className="as-middleDiv">
                <h4 className="as-h4">Your YPPERLIG pairs well with</h4>
                <div className="as-pairsWellWith">
                  {this.state.productList.slice(0, 4).map((product, i) => (
                    <div className="as-pairsWellWithEntry">
                      <AddBagModalListEntry data={product.data} key={i} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="as-bottomDiv">
                <div className="as-innerDiv">
                  <span className="as-cartSpan">
                    <svg className="as-cartIcon">
                      <path d="M12 4C9.2 4 7 6.2 7 9H2l3 11h14l3-11h-5c0-2.8-2.2-5-5-5zm0 2c1.7 0 3 1.3 3 3H9c0-1.7 1.3-3 3-3zm5.5 12h-11l-1.9-7h14.8l-1.9 7z"></path>
                    </svg>
                    <span>Shopping cart</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

AddBagModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool
};
