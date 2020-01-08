import React from "react";
// import styled from 'styled-components';
import ProductList from "./ProductList.jsx";
import axios from "axios";
import data from "../data/data.js";
import RightArrow from "./RightArrow.jsx";
import LeftArrow from "./LeftArrow.jsx";
import testData from "../data/testData.js";

class SimilarProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // allProducts: testData.products,
      allProducts: [],
      shownProducts: [],
      currentIndex: 0,
      translateValue: 0
    };

    this.previousView = this.previousView.bind(this);
    this.nextView = this.nextView.bind(this);
  }

  getAll() {
    axios
      .get("/products")
      // .then((response) => console.log(response.data))
      .then(response => {
        this.setState({
          allProducts: response.data
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getAll();
  }

  previousView() {
    console.log(`clicked`);
    console.log(this.state.currentIndex);
    // if(this.state.currentIndex === this.state.allProducts.length - 1) {
    if (this.state.currentIndex === 0) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      });
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      // translateValue: prevState.translateValue - -(this.slideWidth())
      translateValue: prevState.translateValue + 860
    }));
  }

  nextView() {
    console.log(`clicked`);
    console.log(this.state.currentIndex);
    if (this.state.currentIndex > 1) {
      // if(this.state.currentIndex === 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      });
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 4,
      // translateValue: prevState.translateValue + -(this.slideWidth())
      translateValue: prevState.translateValue - 860
    }));
  }

  slideWidth() {
    return document.querySelector(".as-styledSimilarProductsCarousel")
      .clientWidth;
  }

  render() {
    // console.log(this.state.allProducts)
    if (
      this.state.allProducts.length < 1 ||
      this.state.allProducts === undefined
    ) {
      return <div>loading...</div>;
    } else {
      return (
        <div className="as-similarProductsDIV">
          <div className="as-similarProductsBorder">
            <div className="as-positionedSimilarLeftArrow">
              <LeftArrow previousView={this.previousView} />
            </div>

            <div className="as-styledSimilarProductsOverflow">
              <div
                className="as-styledSimilarProductsCarousel"
                style={{
                  transform: `translateX(${this.state.translateValue}px)`,
                  transition: "transform ease-out 0.45s"
                  // backgroundColor: 'green'
                }}
              >
                <ProductList allProducts={this.state.allProducts} />
              </div>
            </div>

            <div className="as-positionedSimilarRightArrow">
              <RightArrow nextView={this.nextView} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SimilarProducts;
