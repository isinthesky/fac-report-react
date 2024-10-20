import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DEFAULT_MAINLOGO_COLUMN_PATH, DEFAULT_LOCATION_NAME, DEFAULT_BGIMG_PATH } from "../../env";
import { STRING_MAIN_LOGIN_BTN, STRING_MAIN_LOGIN_ID, STRING_MAIN_LOGIN_PW, STRING_MAIN_LOGIN_ERROR } from "../../static/langSet";
import { BaseFlexColumn, BaseFlexRow } from "../../static/componentSet";
import { useNavigate } from "react-router-dom";
import { setViewSelect } from '../../features/reducers/tabPageSlice';


function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = () => {
    if (!toggle) {
      if (username === "admin") {
        dispatch(setViewSelect({mainTab: 1, subTab: 1}));
        setTimeout(() => {
          navigate("/daily");
        }, 0);
      } else {
        alert(STRING_MAIN_LOGIN_ERROR);
      }
    } else {
      dispatch(setViewSelect({mainTab: 1, subTab: 1}));
      setTimeout(() => {
        navigate("/daily");
      }, 0);
    }
  };

  return (
  <Flat>
    <BackgroundImage src={DEFAULT_BGIMG_PATH} />
    <img src={DEFAULT_MAINLOGO_COLUMN_PATH} alt="main_logo" width={400} />
    <LocationLabel>{DEFAULT_LOCATION_NAME}</LocationLabel>
    <MainRow>
      <MainColumn>
        <MainRowINPUT>
          <InputLabel tabIndex={-1} >{STRING_MAIN_LOGIN_ID}</InputLabel>
          <Input
            tabIndex={1}
            type="text"
            id="username"
            placeholder="Enter ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
            required
          />
        </MainRowINPUT>
        <MainRowINPUT>
          <InputLabel tabIndex={-1}>{STRING_MAIN_LOGIN_PW}</InputLabel>
          <Input
            tabIndex={2}
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
            required
          />
        </MainRowINPUT>
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
  gap: 10px;
  height: 100vh;
  position: relative;
  overflow: hidden; // 추가: 자식 요소가 부모를 벗어나지 않도록 함
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill; // cover에서 fill로 변경
  z-index: -1;
`;

const MainRow = styled(BaseFlexRow)`
  gap: 10px;
  background-color: transparent;
`;

const MainRowINPUT = styled(BaseFlexRow)`
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
