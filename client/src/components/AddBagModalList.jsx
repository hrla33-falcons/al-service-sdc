import React from "react";
import AddBagModalListEntry from "./AddBagModalListEntry";
// import styled from 'styled-components';

const AddBagModalList = props => {
  // console.log(typeof props.allLikedProducts)
  // console.log(props.allLikedProducts)
  // console.log(props.allLikedProducts[0])

  if (props.allLikedProducts[0] === undefined) {
    return null;
  } else {
    return (
      <div className="as-styledProductList">
        {props.allLikedProducts.map((item, index) => (
          <AddBagModalListEntry
            MightLikeProduct={item.data}
            key={`AddBagModalListEntry-${index}`}
            index={index}
          />
        ))}
      </div>
    );
  }
};

export default AddBagModalList;
