

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BaseButton, BaseFlex1Row, BaseFlexDiv } from "../../static/componentSet";
import { STRING_SETTING_MAIN_BTN_DEVSET, STRING_SETTING_MAIN_BTN_PRINTSET, STRING_SETTING_MAIN_BTN_GROUPSET, STRING_SETTING_MAIN_BTN_INFO, STRING_DEFAULT_SETTING } from "../../static/langSet";
import { COLORSET_BACKGROUND_COLOR, COLORSET_NORMAL_CONTROL_FONT, COLORSET_ACTIVE_CONTROL_BG, COLORSET_DARK_CONTROL_BG, COLORSET_SETTING_TAB_BUTTON_ACTIVE, COLORSET_SIGNITURE_COLOR } from "../../static/colorSet";
import { PageControlBarProps } from "../../static/interfaces";
import { FONTSET_DEFAULT_TAB_SIZE } from "../../static/fontSet";
import { CONST_LANG } from "../../env";


const PageControlBar: React.FC<PageControlBarProps> = ({ mode, modeCallback }) => {
  const navigate = useNavigate();


  const handleSetPrint = () => {
    modeCallback("print");
  };

  const handleSetGroup = () => {
    try {
      modeCallback("unit");
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };

  const handleSetDevice = () => {
    try {
      modeCallback("device");
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };

  const handleSetArray = () => {
    try {
      modeCallback("view");
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <TopBar>
      <Title>{STRING_DEFAULT_SETTING}</Title>
      <PageButtonContainer>
        <TabControlButton id="view" page={mode} onClick={handleSetArray}>{STRING_SETTING_MAIN_BTN_INFO}</TabControlButton>
        <TabControlButton id="device" page={mode} onClick={handleSetDevice}>{STRING_SETTING_MAIN_BTN_DEVSET}</TabControlButton>
        <TabControlButton id="unit" page={mode} onClick={handleSetGroup}>{STRING_SETTING_MAIN_BTN_GROUPSET}</TabControlButton>
        <TabControlButton id="print" page={mode} onClick={handleSetPrint}>{STRING_SETTING_MAIN_BTN_PRINTSET}</TabControlButton>
      </PageButtonContainer>
      <LogoutButtonContainer>
        <LogoutButton onClick={handleLogout}> logout </LogoutButton>
      </LogoutButtonContainer>
    </TopBar>
  )
}


const TopBar = styled(BaseFlex1Row)`
  align-items: center;
  justify-content: center;

  margin-bottom: 10px;
  padding: 10px 30px;
`;

const Title = styled(BaseFlexDiv)`
  justify-content: start;
  width: 50px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: ${COLORSET_BACKGROUND_COLOR};
`;

const PageButtonContainer = styled(BaseFlex1Row)`
  align-items: center;
  padding-left: 25px;
`;

const TabControlButton = styled(BaseButton)<{ id: string, page: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 10px;
  padding-bottom: 7px;

  width: ${CONST_LANG === "eng" ? 120 : 80}px;
  height: 30px;

  font-size: ${FONTSET_DEFAULT_TAB_SIZE};
  font-weight: ${(props) => (props.id === props.page ? "bold" : "normal")};

  border: none;
  border-bottom: ${(props) => (props.id === props.page ? `1px solid ${COLORSET_ACTIVE_CONTROL_BG}` : "none")};
  
  background-color: ${(props) => (props.id === props.page ? COLORSET_SETTING_TAB_BUTTON_ACTIVE : "transparent")};
  color:  ${(props) => (props.id === props.page ? COLORSET_ACTIVE_CONTROL_BG : COLORSET_NORMAL_CONTROL_FONT)};  
`;

const LogoutButtonContainer = styled(BaseFlex1Row)`
  align-items: center;
  justify-content: end;
  padding-left: 25px;
`;

const LogoutButton = styled(BaseButton)`
  color: ${COLORSET_SIGNITURE_COLOR};
`;


export default PageControlBar;
