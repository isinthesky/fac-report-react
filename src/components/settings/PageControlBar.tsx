

import React, { useState } from "react";
import styled from "styled-components";
import { BaseButton, BaseFlex1Row, BaseFlexDiv } from "../../static/componentSet";
import { STRING_SETTING_MAIN_BTN_APPLY, STRING_SETTING_MAIN_BTN_DEVSET, STRING_SETTING_MAIN_BTN_EDIT, STRING_SETTING_MAIN_BTN_INIT, STRING_SETTING_MAIN_BTN_PRINTSET, STRING_SETTING_MAIN_BTN_GROUPSET, STRING_SETTING_MAIN_BTN_ARRAY } from "../../static/langSet";
import { COLORSET_DISABLE_COLOR, COLORSET_BACKGROUND_COLOR, COLORSET_NORMAL_CONTROL_FONT, COLORSET_ACTIVE_CONTROL_BG, COLORSET_NORMAL_CONTROL_BG, COLORSET_NORMAL_CONTROL_BORDER } from "../../static/colorSet";
import { SIZESET_DEFAULT_INPUT_HEIGHT } from "../../static/constSet";
import { handleInitSettings } from "./set/handleButtons";
import { PageControlBarProps } from "../../static/interfaces";


const PageControlBar: React.FC<PageControlBarProps> = ({ mode, modeCallback }) => {
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

  return (
    <TopBar>
      <Title>설정</Title>
      <PageButtonContainer>
        <TabControlButton id="view" page={mode} onClick={handleSetArray}>{STRING_SETTING_MAIN_BTN_ARRAY}</TabControlButton>
        <TabControlButton id="device" page={mode} onClick={handleSetDevice}>{STRING_SETTING_MAIN_BTN_DEVSET}</TabControlButton>
        <TabControlButton id="unit" page={mode} onClick={handleSetGroup}>{STRING_SETTING_MAIN_BTN_GROUPSET}</TabControlButton>
        <TabControlButton id="print" page={mode}onClick={handleSetPrint}>{STRING_SETTING_MAIN_BTN_PRINTSET}</TabControlButton>
      </PageButtonContainer>
      <InitButton id="init" onClick={handleInitSettings}>{STRING_SETTING_MAIN_BTN_INIT}</InitButton>
    </TopBar>
  )
}


const TopBar = styled(BaseFlex1Row)`
  align-items: center;
  justify-content: center;

  padding: 10px 30px;
  // border: 1px solid #eee;
`;

const Title = styled(BaseFlexDiv)`
  justify-content: start;
  width: 50px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: ${COLORSET_BACKGROUND_COLOR};
  // border: 1px solid #eee;
`;

const PageButtonContainer = styled(BaseFlex1Row)`
  align-items: center;
  padding-left: 25px;
`;

const Input = styled.input<{ mode: string, heightsize?: string, disable?: string }>`
  text-align: center;
  width: 50px;
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_INPUT_HEIGHT};

  background-color: ${(props) => (props.mode === "true" ? COLORSET_DISABLE_COLOR : "white")};

  margin: 0px 10px;              
`;

const TabControlButton = styled(BaseButton)<{ id: string, page: string }>`
  width: 60px;
  height: 30px;
  border: none;

  border-bottom: ${(props) => (props.id === props.page ? `1px solid ${COLORSET_ACTIVE_CONTROL_BG}` : "none")};
  font-weight: ${(props) => (props.id === props.page ? "bold" : "normal")};
  
  background-color: transparent;
  color:  ${(props) => (props.id === props.page ? COLORSET_ACTIVE_CONTROL_BG : COLORSET_NORMAL_CONTROL_FONT)};
`;

const InitButton = styled(BaseButton)`

  height: 25px;
  width: 80px;
  color: ${COLORSET_NORMAL_CONTROL_FONT};
  background-color: ${COLORSET_NORMAL_CONTROL_BG};
  border: 1px solid ${COLORSET_NORMAL_CONTROL_BORDER};
`

export default PageControlBar;
