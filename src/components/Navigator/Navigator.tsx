//import React from 'react'
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
          <button className="trending" data-text="Trending">
            <FontAwesomeIcon icon={faFire} className="icon" />
          </button>
        </li>
        <li>
          <button className="movies" data-text="Movies">
            <FontAwesomeIcon icon={faFilm} className="icon" />
          </button>
        </li>
        <li>
          <button className="series" data-text="Series">
            <FontAwesomeIcon icon={faTv} className="icon" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
