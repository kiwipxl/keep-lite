import React from "react";

const Checkbox = React.forwardRef((props, ref) => {
  const { className, children, checked, disabled, onClick } = props;

  if (!ref) {
    ref = React.createRef();
  }

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
