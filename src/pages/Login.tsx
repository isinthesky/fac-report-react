import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <Flat>
      <TitleSection>
        <LoginTitle>Login</LoginTitle>
      </TitleSection>
      <InfoSection>
        <LoginLabel>ID : </LoginLabel>
        <LoginInput type="text" required />
      </InfoSection>
      <InfoSection>
        <LoginLabel>Password : </LoginLabel>
        <LoginInput type="text" required />
      </InfoSection>
      <SendSection>
        <LoginButton>login</LoginButton>
        <LoginButton>cancel</LoginButton>
      </SendSection>
    </Flat>
  );
}

const Flat = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  height: calc(100vh - 100px); // 50
  width: calc(100vw - 300px); // 200
`;

const TitleSection = styled.div`
  display: absolute;

  flex-direction: row;
`;

const InfoSection = styled.div`
  display: absolute;

  flex-direction: row;
`;

const SendSection = styled.div`
  display: absolute;

  flex-direction: row;
`;

const LoginTitle = styled.label`
  display: inline-block;

  margin: 10px;
  width: 60px;
`;

const LoginLabel = styled.label`
  display: inline-block;

  margin: 5px;
  width: 60px;
`;

const LoginInput = styled.input`
  margin: 10px;
  width: 200px;
`;

const LoginButton = styled.button`
  margin: 10px;
  width: 60px;
`;

export default Login;
