import React from "react";

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer", color: "#dc4541" }}
      className={classes}
    />
  );
};

export default Like;
