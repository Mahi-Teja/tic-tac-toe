import React from "react";

const Model = ({ show, setShow, title, children }) => {
  const close = () => {
    setShow(false);
  };
  return (
    show && (
      <div className="model">
        <div className="model-bg" onClick={(e) => close(e)}></div>
        <div className="model-content">
          <div className="model-header">
            <h2>{title}</h2>
            <button className="rules-button" onClick={(e) => close(e)}>
              <i className="fa-regular fa-circle-xmark"></i>
            </button>
          </div>
          <div className="model-body">{children}</div>
        </div>
      </div>
    )
  );
};

export default Model;
