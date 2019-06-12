import styled from "styled-components";

const fontSize = (size) => {
  switch(size) {
    case "large":
      return "40px";
    case "small":
      return "25px";
    default:
      return "20px";
  };
};

// export const HeaderText is used if it is not the default
export default styled.h1`
  color: white !important;
  text-align: center;
  /* font-size: ${ props => props.large ? "30px" : "18" } !important; */
  font-size: ${ props => fontSize(props.fSize) } !important;
`;

