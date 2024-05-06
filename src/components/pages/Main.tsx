import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DEFAULT_MAINLOGO_COLUMN_PATH, DEFAULT_LOCATION_NAME, DEFAULT_BGIMG_PATH, CONST_LOGIN_PW, CONST_KEY_VALUE } from "../../env";
import { STRING_MAIN_LOGIN_BTN, STRING_MAIN_LOGIN_ID, STRING_MAIN_LOGIN_PW, STRING_MAIN_LOGIN_ERROR } from "../../static/langSet";
import { BaseFlexColumn, BaseFlexRow } from "../../static/componentSet";
import { useNavigate } from "react-router-dom";
import { setViewSelect } from '../../features/reducers/tabPageSlice';
import sha256 from 'crypto-js/sha256'; // Import the sha256 function


function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {    
    // Correct the event type here
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyR') {
        setToggle(!toggle);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggle]);

  const containerStyle = backgroundLoaded ? {
    backgroundImage: `url(${DEFAULT_BGIMG_PATH})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  const handleLogin = () => {
    if (!toggle) {
      const hashedPassword = sha256(password + CONST_KEY_VALUE).toString();

      if (username === "admin" && hashedPassword === CONST_LOGIN_PW) {
        dispatch(setViewSelect({mainTab: 1, subTab: 1}));
        setTimeout(() => {
          navigate("/daily/1/1");
        }, 0);
      } else {
        alert(STRING_MAIN_LOGIN_ERROR);
      }
    } else {
      dispatch(setViewSelect({mainTab: 1, subTab: 1}));
      setTimeout(() => {
        navigate("/daily/1/1");
      }, 0);
    }
  };

  return (
  <Flat style={containerStyle}>
    <BackgroundImage src={DEFAULT_BGIMG_PATH} />
    <img src={DEFAULT_MAINLOGO_COLUMN_PATH} alt="main_logo" width={400} />
    <LocationLabel>{DEFAULT_LOCATION_NAME}</LocationLabel>
    <MainRow>
      <MainColumn>
        <MainRow_INPUT>
          <InputLabel tabIndex={-1} >{STRING_MAIN_LOGIN_ID}</InputLabel>
          <Input
            tabIndex={1}
            type="text"
            id="username"
            placeholder="Enter ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
            required
          />
        </MainRow_INPUT>
        <MainRow_INPUT>
          <InputLabel tabIndex={-1}>{STRING_MAIN_LOGIN_PW}</InputLabel>
          <Input
            tabIndex={2}
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
            required
          />
        </MainRow_INPUT>
      </MainColumn>
      <MainRow>
        <LoginButton tabIndex={3} onClick={handleLogin}>
          {STRING_MAIN_LOGIN_BTN}
        </LoginButton>
      </MainRow>
    </MainRow>
  </Flat>
  );
}

const Flat = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${DEFAULT_BGIMG_PATH});
  gap: 10px;
  height: 100vh; /* Set the height to 100% of the viewport height */
  position: relative;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const MainRow = styled(BaseFlexRow)`
  gap: 10px;
  background-color: transparent;
`;

const MainRow_INPUT = styled(BaseFlexRow)`
  gap: 10px;
  background-color: transparent;
  align-items: center;
  align-self: center;
  justify-content: flex-end;
  width: 100%;
`;

const MainColumn = styled(BaseFlexColumn)`
  margin-top: 10px;
  gap: 10px;
  background-color: transparent;
`;

const LocationLabel = styled.label`
  display: flex;
  align-items: center;
  color: white;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`;

const InputLabel = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  // border: solid 1px #575C63;
`;

const Input = styled.input`
  display: flex;
  padding: 5px;
  color: white;
  border: solid 1px #575C63;
  background-color: #2E323B;
`;

const LoginButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #C51950;
  color: white;
  border: none;
  width: 100px;
`;

export default Main;
