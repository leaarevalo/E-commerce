import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./Product.css";

import "./StarRating.css";

const StarRating = ({ id }) => {
  // Estrellitas
  const [ratingStar, setRatingStar] = useState(null);
  const [hover, setHover] = useState(null);
  const login = useSelector((state) => state.login.login);
  // Review
  const [reviewProduct, setReviewProduct] = useState({
    title: "",
    review: "",
  });

  const handleInputChange = (e) => {
    setReviewProduct({
      ...reviewProduct,
      [e.target.name]: e.target.value,
    });
  };

  const sendComment = (e) => {
    e.preventDefault();
    let title = reviewProduct.title;
    let review = reviewProduct.comment;
    let ranking = ratingStar;
    const idUsuario = login.data.data.user.id;
    const idProduct = parseInt(id);
    
    const body = {
      title,
      review,
      ranking,
      idUsuario,
      idProduct,
    };
    axios
      .post("http://localhost:3001/review/add", body)
      .then((res) => {
      //  console.log(res);
        alert(res.data.message);
      })
      .catch((reason) => alert("No se pudo agregar una review " + reason));
        console.log(body);
  };

  return (
      <form className="form_star_rating" onSubmit={sendComment}>
        <h3>Deja tu opinión:</h3>
        <div className="estrellitas">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRatingStar(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= (hover || ratingStar) ? "#ffc107" : "#e4e5e9"}
                    size={30}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
        </div>
        
        <div>
          <input
            className="title_review"
            placeholder="Escribe un titulo"
            type="text"
            name="title"
            onChange={handleInputChange}
          />
          {/* <p>{review.comment}</p>
          <p className="abajo">La clasificación es {rating}</p> */}
        </div>
        <div>
          <textarea
            className="review_text"
            placeholder="Escribe tu opinión de este producto.."
            type="text"
            name="comment"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button className="product_rev_btn" type="submit">
          ENVIAR
        </button>
      </form>
  );
};

export default StarRating;
