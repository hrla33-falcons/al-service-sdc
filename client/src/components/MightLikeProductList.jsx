import React from "react";
import MightLikeProductListEntry from "./MightLikeProductListEntry.jsx";
// import styled from 'styled-components';

const MightLikeProductList = props => {
  // console.log(typeof props.allLikedProducts)
  // console.log(props.allLikedProducts)
  // console.log(props.allLikedProducts[0])

  if (props.allLikedProducts[0] === undefined) {
    return null;
  } else {
    return (
      <div className="as-styledProductList">
        {props.allLikedProducts.map((item, index) => (
          <MightLikeProductListEntry
            MightLikeProduct={item.data}
            key={`MightLikeProductList-${index}`}
            index={index}
          />
        ))}
      </div>
    );
  }
};

export default MightLikeProductList;
