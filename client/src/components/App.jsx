import React from "react";
// import styled from 'styled-components';
import axios from "axios";
import SimilarProducts from "./SimilarProducts.jsx";
import YouMightAlsoLike from "./YouMightAlsoLike.jsx";
import testData from "../data/testData.js";
import data from "../data/data.js";
import ShowAllHistory from "../components/ShowAllHistory.jsx";
import Footer from "./Footer.jsx";
import StickyFooter from "./StickyFooter.jsx";
import Modal from "./Modal.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    if (typeof(document) === 'undefined') {
      global.document = {}
  }

    this.state = {
      onLoadProducts: [],
      shownProducts: [],
      modalState: true,
      position: 0
    };

    this.getAll = this.getAll.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    // this.setState({
    //   modalState: !this.state.modalState
    // });
  }

  // onClose(e) {
  //   this.setState({
  //     modalState: false
  //   });
  // }

  getAll() {
    axios
      .get("/products")
      // .then((response) => console.log(response.data.rows))
      .then(response => {
        console.log(response.data);
        this.setState({
          onLoadProducts: response.data
        });
      })
      .catch(err => console.error(err));
  }

  handleScroll(e) {
    var positionDifference = e.path[1].pageYOffset - this.state.position;
    this.setState({
      position: e.path[1].pageYOffset
    });
  }

  componentDidMount() {
    this.getAll();
    window.addEventListener("scroll", e => this.handleScroll(e));
    // console.log(`rendering`);
    // console.log(`actual onLoadProducts: `, this.state.onLoadProducts)
  }

  render() {
    // console.log(this.state.onLoadProducts)
    if (
      this.state.onLoadProducts.length < 1 ||
      this.state.onLoadProducts === undefined
    ) {
      return <div>loading...</div>;
    } else {
      return (
        <div className="as-everythingContainer">
          <div className="as-title">Similar Products</div>

          <SimilarProducts />

          <div
            className="as-title"
            style={{
              textAlign: "center",
              // marginTop: '5em',
              fontFamily: "Noto Sans, sans-serif",
              fontSize: "30px",
              fontWeight: 700,
              zIndex: -999,
              paddingTop: 40
              // backgroundColor: "red"
            }}
          >
            You Might Also Like
          </div>

          {/* <div className="as-youMightAlsoLikeDIV"> */}
          <YouMightAlsoLike />
          {/* </div> */}

          <div className="as-showAllHistory">
            <ShowAllHistory />
          </div>

          <div
            className="as-footer"
            style={{
              // position: 'absolute',
              // margin: '-7px',
              // top: '75.5em',
              height: "600px",
              width: "100%",
              backgroundColor: "#0058a3"
            }}
          >
            <Footer></Footer>
          </div>

          <div
            className="as-modal"
            style={
              this.state.position > 554
                ? {
                    position: "fixed",
                    bottom: "20px",
                    transform: "translateY(0)",
                    transition: "ease 1s",
                    right: "200px"
                  }
                : {
                    position: "fixed",
                    bottom: "-100px",
                    right: "200px",
                    transform: "translateY(3rem)",
                    transition: "ease 1s"
                  }
            }
          >
            {/* <button onClick={this.toggleModal}> Open modal </button> */}
            <div className="as-hoverModal">
              <StickyFooter
                show={this.state.modalState}
                onClose={this.toggleModal}
                productDisplay={this.state.onLoadProducts[0]}
                products={this.state.onLoadProducts}
              ></StickyFooter>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
