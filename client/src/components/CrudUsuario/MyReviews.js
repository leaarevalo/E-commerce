import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// CSS
import "./MyReviews.css";

// Components
import NavBar from "../NavBar/NavBar.js";
import ReviewItem from "./ReviewItem.js";

export default function MyReviews() {
  const userId = useSelector((state) => state.login.login.data.data.user.id);
  var [myRev, setMyRev] = useState([]);
  console.log(userId);
  useEffect(() => {
    getReviews(userId, setMyRev);
  }, []);

  console.log(myRev);
  //FALTA LA RUTA PARA TRAER LAS REVIEWS DE UN USUARIO EN PARTICULAR, PARA PODER HACER EL AXIOS/GRACIAS
  //aca irian las reviews que me traiga el axios
  //MUESTRA UNA LISTA DE TODAS LAS REVIEWS
  function showReviews(myRev) {
    if (myRev !== []) {
      return myRev.map((review) => {
        return <ReviewItem review={review} />;
      });
    }
  }
  return (
    <div className="container_info_user">
      <NavBar />
      <div className="catalogo_bg"></div>
      <div className="my_reviews_list">
        <div className="my_reviews_header">
          <h2>Mis reseñas</h2>
        </div>
        <div className="revie_list">{showReviews(myRev)}</div>
      </div>
      w
      <div className="btn_data_user">
        <Link to="/usuario/config/" className="btn_volver_user">
          VOLVER
        </Link>
      </div>
    </div>
  );
}

function getReviews(userId, setMyRev) {
  axios({
    method: "GET",
    url: `http://localhost:3001/review/user/${userId}`,
  })
    .then(function (res) {
      //  console.log(res.data);
      setMyRev(res.data);
    })
    .catch((reason) =>
      console.log("No se pudo crear la cuenta de usuario " + reason)
    );
}
