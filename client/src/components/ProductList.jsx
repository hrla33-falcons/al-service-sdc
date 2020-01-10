import React from "react";
import ProductListEntry from "./ProductListEntry.jsx";
// import styled from 'styled-components';

const ProductList = props => {
  // console.log(props.allProducts)
  // console.log(props.allProducts[0])

  if (props.allProducts[0] === undefined) {
    return null;
  } else {
    return (
      <div className="as-styledProductList">
        {props.allProducts.map((item, index) => (
          <ProductListEntry
            product={item.data}
            key={`ProductList-${index}`}
            index={index}
          />
        ))}
      </div>
    );
  }
};

export default ProductList;
