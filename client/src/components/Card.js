import React from 'react';
import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';

const Card = (props) => {
  return (
    <div className="Card">
      <Link to={'/post/' + props.id}>
        <h2 className="name">{"Name: " + props.name}</h2>
        <h3 className="location">{"Location: " + props.location}</h3>
        <h3 className="bait">{"Catch: " + props.description}</h3>
      </Link>
      <div className="betCount">
      <h3 className="likes">Likes: {props.betCount}</h3>
      </div>
      <Link to={'/edit/' + props.id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
    </div>
  );
};

export default Card;


/* <img className="photo" src={props.photo} alt="User provided" /> */

