import React from 'react';

const PizzaCard = ({pizzaInfo}) => {
    /*
    {
    "costs": [
      0
    ],
    "picture_server_path": "string",
    "title": "string",
    "weight": 0,
    "ingredients": [
      "string"
    ]
  }
     */
    return (
        <div
            className="w-30 h-10 "
        >
            {pizzaInfo.title}
        </div>
    );
};

export default PizzaCard;