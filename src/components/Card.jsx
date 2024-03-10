import React from 'react';

const CommonCard = ({title,cardValue}) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
      <h2 className="text-xl text-gray-800 dark:text-gray-100 my-2">{title}</h2>
      <p className="text-5xl font-semibold text-gray-800 dark:text-gray-100 flex justify-end">{cardValue}</p>
    </div>
  );
};

export default CommonCard;


