import React from "react";
import styled from "styled-components";

const Checkbox = React.forwardRef((props, ref) => {
  const { className, children, checked, disabled, onClick } = props;

  if (!ref) {
    ref = React.createRef();
  }

  console.log(checked);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className}
      disabled={disabled}
      checked={checked}
      onClick={onClick}
      onChange={() => false}
    >
      {children}
    </input>
  );
});

export default Checkbox;