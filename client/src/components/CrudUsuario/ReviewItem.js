import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// CSS

import "./ReviewItem.css";
//COMPONENTES

export default function ReviewItem({ review }) {
  const idPopup = review.id;
  const userData = useSelector((state) => state.login.login.data.data.user);

  function showPopup(idPopup) {
    document.getElementById(idPopup).style.display = "block";
  }
  function closePopup(idPopup) {
    document.getElementById(idPopup).style.display = "none";
  }

  return (
    <div className="rev-container">
      <div className="item_rev_name">{review.title}</div>
      <div className="item_rev_description">{review.review}</div>
      <div className="item_rev_user">{userData.name}</div>

      <div className="popup" id={review.id}>
        {/* <Review review={review} /> */}
      </div>
    </div>
  );
}
