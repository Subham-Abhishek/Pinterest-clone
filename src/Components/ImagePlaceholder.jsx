import React from "react";

export const ImagePlaceholder = ({height}) => {
  return (
    <div style={{height: height}} className="load-wraper">
      <div className="activity"></div>
    </div>
  );
};