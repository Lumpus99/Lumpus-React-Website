import React from 'react';

function Slider() {
  return (
      <div className="d-flex justify-content-center my-4">
          <form className="range-field w-75">
              <input id="slider11" className="border-0" type="range" min="0" max="200"/>
          </form>
          <span className="font-weight-bold text-primary ml-2 mt-1 valueSpan"/>
      </div>
  );
}

export default Slider;
