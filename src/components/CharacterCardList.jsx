import React from 'react';
import Card from './Card/CharacterCard';
import './Card/characterCards.css';

const CharacterCardList = ({ items = [], handleScroll, handleDelete }) => (
  <div className="character-list" onScroll={handleScroll}>
    {items.map((item) => (
      <div key={item.id}>
        <Card
          {...item}
          onDelete={() => {
            handleDelete(item.id);
          }}
        />
      </div>
    ))}
  </div>
);

export default CharacterCardList;
