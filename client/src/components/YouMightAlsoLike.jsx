import React from "react";
// import styled from 'styled-components';
import MightLikeProductList from "./MightLikeProductList.jsx";
import axios from "axios";
import YouLikeRightArrow from "./YouLikeRightArrow.jsx";
import YouLikeLeftArrow from "./YouLikeLeftArrow.jsx";
import testData from "../data/testData.js";

class YouMightAlsoLike extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // allLikedProducts: testData.products,
      allLikedProducts: [],
      shownProducts: [],
      currentYouLikeIndex: 0,
      translateValue: 0
    };

    this.previousYouLikeView = this.previousYouLikeView.bind(this);
    this.nextYouLikeView = this.nextYouLikeView.bind(this);
    this.getAllYouLike = this.getAllYouLike.bind(this);
    this.slideWidth = this.slideWidth.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
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

  getAllYouLike() {
    axios
      .get("/products")
      // .then((response) => console.log(response.data))
      .then(response => {
        this.setState({
          allLikedProducts: this.shuffleArray(response.data)
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getAllYouLike();
  }

  previousYouLikeView() {
    console.log(`clicked`);
    // if(this.state.currentYouLikeIndex === this.state.allLikedProducts.length - 1) {
    if (this.state.currentYouLikeIndex === 0) {
      return this.setState({
        currentYouLikeIndex: 0,
        translateValue: 0
      });
    }

    this.setState(prevYouLikeState => ({
      currentYouLikeIndex: prevYouLikeState.currentYouLikeIndex - 1,
      // translateValue: prevYouLikeState.translateValue - -(this.slideWidth())
      translateValue: prevYouLikeState.translateValue + 860
    }));
  }

  nextYouLikeView() {
    console.log(`clicked`);
    console.log(this.state.currentYouLikeIndex);
    if (this.state.currentYouLikeIndex > 8) {
      // if(this.state.currentYouLikeIndex === 1) {
      return this.setState({
        currentYouLikeIndex: 0,
        translateValue: 0
      });
    }

    this.setState(prevYouLikeState => ({
      currentYouLikeIndex: prevYouLikeState.currentYouLikeIndex + 4,
      // translateValue: prevYouLikeState.translateValue + -(this.slideWidth())
      translateValue: prevYouLikeState.translateValue - 860
    }));
  }

  slideWidth() {
    return document.querySelector(".as-styledSimilarProductsCarousel")
      .clientWidth;
  }

  render() {
    // console.log(this.state.allLikedProducts)
    if (
      this.state.allLikedProducts.length < 1 ||
      this.state.allLikedProducts === undefined
    ) {
      return <div>loading...</div>;
    } else {
      return (
        <div className="as-youMightAlsoLikeDIV">
          <div>
            <YouLikeLeftArrow previousYouLikeView={this.previousYouLikeView} />
          </div>

          <div className="as-styledYouMightAlsoLikeOverflow">
            <div
              className="as-styledCarousel2"
              style={{
                transform: `translateX(${this.state.translateValue}px)`,
                transition: "transform ease-out 0.45s"
                // backgroundColor: "green"
              }}
            >
              <MightLikeProductList
                allLikedProducts={this.state.allLikedProducts}
              />
            </div>
          </div>

          <div>
            <YouLikeRightArrow nextYouLikeView={this.nextYouLikeView} />
          </div>
        </div>
      );
    }
  }
}

export default YouMightAlsoLike;
