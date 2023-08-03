import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleGoReport = async () => {
    navigate("/");
  };

  const handleGoSetting = async () => {
    navigate("/setting");
  };

  return (
    <TopHeader>
      <Title>Fac-Report</Title>
      <Controls>
        <PageButton onClick={handleGoReport}>Report</PageButton>
        <PageButton onClick={handleGoSetting}>Setting</PageButton>
      </Controls>
    </TopHeader>
  );
}

const TopHeader = styled.header`
  position: relative;
  display: flex;

  top: 0;
  width: 100wh;
  height: 50px;

  background-color: #ffff77;
  border: 1px solid #333;
`;

const Title = styled.div`
  float: left;
  text-align: center;
  align-items: center;

  width: 150px;
  height: 30px;
  padding: 10px;

  color: "black";
  font-weight: bold;
  font-size: 30px;
  background-color: #ffffff;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: rows;
  align-items: center;
`;

const PageButton = styled.button`
  justify-content: center;
  align-items: center;

  height: 30px;
  width: 100px;

  margin: 50px;
`;
