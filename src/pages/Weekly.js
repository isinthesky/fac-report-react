import React from "react";
import styled from "styled-components";

function Weekly() {
  return <Flat>Weekly</Flat>;
}

const Flat = styled.div`
  display: fixed;

  flex-direction: column;

  height: calc(100vh - 50px);
  width: calc(100vw - 200px);

  background-color: #acf0af;
`;

export default Weekly;
