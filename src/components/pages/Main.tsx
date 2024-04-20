import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DEFAULT_MAINLOGO_COLUMN_PATH, DEFAULT_LOCATION_NAME, DEFAULT_BGIMG_PATH } from "../../env";
import { STRING_MAIN_LOGIN_BTN, STRING_MAIN_LOGIN_ID, STRING_MAIN_LOGIN_PW } from "../../static/langSet";
import { BaseFlexColumn, BaseFlexRow } from "../../static/componentSet";
import { useNavigate } from "react-router-dom";
import { setViewSelect } from '../../features/reducers/tabPageSlice';

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = DEFAULT_BGIMG_PATH; // 이미지 URL
    img.onload = () => {
      setBackgroundLoaded(true);
    };
  }, []);

  const containerStyle = backgroundLoaded ? {
    backgroundImage: `url(${DEFAULT_BGIMG_PATH})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  const handleLogin = () => {
    
    // dispatch(setViewSelect({mainTab: Number(id1), subTab: Number(id2)}));
    dispatch(setViewSelect({mainTab: 1, subTab: 1}));

    // navigate("/daily/1/1"); // Navigate to the daily router page
    setTimeout(() => {
      navigate("/daily/1/1"); // Navigate to the daily router page
    }, 0);
  };

  return (
  <Flat style={containerStyle}>
    <BackgroundImage src={DEFAULT_BGIMG_PATH} />
    <img src={DEFAULT_MAINLOGO_COLUMN_PATH} alt="main_logo" width={400} />
    <LocationLabel>{DEFAULT_LOCATION_NAME}</LocationLabel>
    <MainRow>
      <MainColumn>
        <MainRow_INPUT>
          <InputLabel>{STRING_MAIN_LOGIN_ID}</InputLabel>
          <Input
            type="text"
            id="username"
            placeholder="Enter ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </MainRow_INPUT>
        <MainRow_INPUT>
          <InputLabel>{STRING_MAIN_LOGIN_PW}</InputLabel>
          <Input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </MainRow_INPUT>
      </MainColumn>
      <MainRow>
        <LoginButton onClick={handleLogin}>{STRING_MAIN_LOGIN_BTN}</LoginButton>
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
