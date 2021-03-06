import styled from "styled-components";
import config from "../config";

const DarkOverlay = ({ className, onClick }) => {
  return <div className={className} onClick={onClick}></div>;
};

export default styled(DarkOverlay)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: ${(props) => (props.hidden ? 0 : 0.8)};
  transition: opacity 0.3s;
  z-index: ${(props) =>
    props.sortingOrder ? props.sortingOrder : config.sortingOrder.backdrop};
  pointer-events: ${(props) => (props.hidden ? "none" : "auto")};
`;
