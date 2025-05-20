import React from 'react';

const Spinner = ({ size = '16', color = 'sky-600' }) => {
  return (
    <div
      className={`animate-spin w-${size} h-${size} m-8 rounded-full bg-${color}`}
    ></div>
  );
};

export default Spinner;
