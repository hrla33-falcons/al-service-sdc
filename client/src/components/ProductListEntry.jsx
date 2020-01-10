import React from "react";
// import styled from 'styled-components';
import FullStar from "./FullStar.jsx";
import HalfStar from "./HalfStar.jsx";
import EmptyStar from "./EmptyStar.jsx";

const round = (x, precision) => {
  var y = +x + (precision === undefined ? 0.5 : precision / 2);
  return y - (y % (precision === undefined ? 1 : +precision));
};

const ratingHandler = unroundedRate => {
  var rating = round(unroundedRate, 0.5);
  // console.log(rating)

  var starArray = [];
  var counter = 0;
  while (counter < 5) {
    if (rating - 1 >= 0) {
      starArray.push(<FullStar />);
      rating--;
    } else if (rating === 0.5) {
      starArray.push(<HalfStar />);
      rating -= 0.5;
    } else if (rating === 0) {
      starArray.push(<EmptyStar />);
    }
    // console.log(counter)
    counter++;
  }
  return starArray;
};

const ProductListEntry = props => {
  // console.log(props.product.itemimage)
  return (
    <div key={props._id} className="as-styledItem">
      <img
        src={props.product.itemimage}
        className="as-productImage"
        height="175"
        width="175"
      />
      <div className="as-productName">{props.product.itemname}</div>
      <div className="as-description">{props.product.description}</div>
      <div className="as-description">{props.product.typesize}</div>
      <div className="as-price">${props.product.price}</div>
      <span className="as-starRatings">
        {ratingHandler(props.product.rating)} &nbsp; {props.product.rating}{" "}
        &nbsp; ({props.product.numberratings})
      </span>
    </div>
  );
};

export default ProductListEntry;
