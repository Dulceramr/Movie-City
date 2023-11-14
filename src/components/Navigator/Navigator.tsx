//import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faFilm,
  faTv
} from "@fortawesome/free-solid-svg-icons";
import "./Navigator.css";

export const Navigator = () => {
  return (
    <nav>  
      <ul>
        <li>
          <Link to="/trending" className="trending" data-text="Trending">
            <FontAwesomeIcon icon={faFire} className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/movies" className="movies" data-text="Movies">
            <FontAwesomeIcon icon={faFilm} className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/series" className="series" data-text="Series">
            <FontAwesomeIcon icon={faTv} className="icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
