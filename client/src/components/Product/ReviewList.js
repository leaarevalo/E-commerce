import React, { useState } from "react";
import ReviewItem from './ReviewItem.js';

// CSS
import "./ReviewList.css";

export default function ReviewList({reviews}) {

function showReviewItems(reviews){
    return reviews.map(rev => <ReviewItem rev={rev}/>)
}
   return (
    <div className="review_list">
        <div className="container_reviews_product">
            <h2>Reviews</h2>
        </div>
       {showReviewItems(reviews)}
   </div>
)
};
