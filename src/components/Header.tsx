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

  const handleGoLogin = async () => {
    navigate("/Login");
  };

  const handleGoSignUp = async () => {
    navigate("/SignUp");
  };

  return (
    <TopHeader>
      <Title>Fac-Report</Title>
      <PageControls>
        <PageButton onClick={handleGoReport}>Report</PageButton>
        <PageButton onClick={handleGoSetting}>Setting</PageButton>
      </PageControls>
      <LoginControls>
        <LoginButton onClick={handleGoLogin}>Login</LoginButton>
        <LoginButton onClick={handleGoSignUp}>Signup</LoginButton>
      </LoginControls>
    </TopHeader>
  );
}

const TopHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;

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

const PageControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 50wh;
`;

const LoginControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  width: 50wh;

  background-color: #efffff;
`;

const PageButton = styled.button`
  justify-content: center;
  align-items: center;

  height: 30px;
  width: 100px;

  margin: 50px;
`;

const LoginButton = styled.button`
  justify-content: center;
  align-items: center;

  border: none;
  text-decoration: none;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.5);

  height: 30px;
  width: 100px;

  margin: 50px;
`;
