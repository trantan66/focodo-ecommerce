import React from "react";
import { Link } from "react-router-dom";

function Product() {
  return (
    <div>
      <div>This is Product page</div>
      <Link className="underline" to="/">
        to home
      </Link>
    </div>
  );
}

export default Product;
