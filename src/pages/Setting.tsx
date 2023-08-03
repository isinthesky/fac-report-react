import React from "react";
import styled from "styled-components";

function Setting() {
  return <Flat>Setting</Flat>;
}

const Flat = styled.div`
  display: absolute;

  flex-direction: column;

  height: calc(100vh - 50px);
  width: calc(100vw - 200px);

  background-color: #ece0af;
`;

export default Setting;
