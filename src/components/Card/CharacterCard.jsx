import React from 'react';
import './characterCards.css';

const Card = ({
  name,
  status,
  species,
  image,
  location,
  origin,
  created,
  episode,
  onDelete,
}) => (
  <article className="character-card-wrapper">
    <div className="img-wrapper">
      <img src={image} align="top" />
    </div>
    <div className="character-card-content-wrapper">
      <div className="section">
        <a className="name-wrapper-czxdz">
          <h2 className="line-limit-length">{name}</h2>
        </a>
        <span className="status">
          {status} - {species}
        </span>
      </div>
      <div className="section">
        <span className="text-gray">Last known location: </span>
        <a>{location.name}</a>
      </div>
      <div className="section">
        <span className="text-gray">First seen in: </span>
        <a>{origin.name}</a>
      </div>
      <div className="section">
        <span className="text-gray">Created at: </span>
        <a>
          {created.slice(0, 4)} {created.slice(5, 10)} {created.slice(11, 19)}
        </a>
      </div>
      <div className="section">
        <span className="text-gray">Episodes: </span>
        <li>{episode.length}</li>
      </div>
    </div>
    <button type="button" className="delete-button" onClick={onDelete}>
      Delete
    </button>
  </article>
);

export default Card;
