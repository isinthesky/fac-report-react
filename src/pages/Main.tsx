import React from "react";
import styled from "styled-components";

function Main() {
  return <Flat>Main</Flat>;
}

const Flat = styled.div`
  display: absolute;

  flex-direction: column;

  height: calc(100vh - 50px);
  width: calc(100vw - 200px);
`;

export default Main;
