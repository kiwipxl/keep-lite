import styled from "styled-components";

const Input = (props) => {
  const { className } = props;

  return <input {...props}></input>;
};

export default styled(Input)``;
