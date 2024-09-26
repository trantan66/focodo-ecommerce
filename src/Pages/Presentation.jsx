import React from "react";
import { Link } from "react-router-dom";
import PrePage from "../Components/Shared/Presentation_Page_Items/PrePage";
function Presentation() {
  return (
    <div className="">
      <p>day la trang gioi thieu</p>
      <Link className="underline" to="/">
        to home
      </Link>
      <PrePage></PrePage>
    </div>
  );
}
export default Presentation;
