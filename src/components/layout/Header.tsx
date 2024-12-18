import React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setViewSelect, setSettingSelect } from "@/entities/reducers/tabPageSlice";
import { DEFAULT_MAINLOGO_ROW_PATH, DEFAULT_LOCATION_NAME } from "@/config/env";
import { FONTSET_MAIN_MENU_SIZE } from "@/static/fontSet";
import { COLORSET_HEADER_BTN_LINEAR1, COLORSET_HEADER_BTN_LINEAR2, COLORSET_SIGNITURE_COLOR, COLORSET_HEADER_BORDER1 } from "@/static/colorSet";
import { ICON_HEADER_SETTING } from "@/config/constSet";
import { BaseFlex1Column, BaseFlexCenterDiv, BaseFlexColumn } from "@/static/componentSet";
import { HeaderMenus } from "@/components/header/HeaderMenus";

interface HeaderProps {
  paramMain: number;
  onMenuClick: (mainTab: number, subTab: number) => void;
}

const Header: React.FC<HeaderProps> = ({ paramMain, onMenuClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoSetting = useCallback(() => {
    dispatch(setViewSelect({mainTab: 0, subTab: 0}));
    dispatch(setSettingSelect({mainTab: 1, subTab: 1}));
    navigate("/settings", { state: { fromNavigate: true } });
  }, [navigate, dispatch]);

  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);
  
  const handleMenuItemClick = useCallback(
    (mainTab: number, subTab: number) => {
      console.log("Header Menu Clicked - Main Tab:", mainTab, "Sub Tab:", subTab);

      onMenuClick(mainTab, subTab);
      navigate("/daily");
    },
    [onMenuClick]
  );

  return (
    <TopHeader>
      <TitleContainer>
        <TitleLogoContainer onClick={handleGoHome}>
          <img src={DEFAULT_MAINLOGO_ROW_PATH} style={{width: "70%", cursor: "pointer"}} alt="main_logo" />
        </TitleLogoContainer>
        <TitleTextContainer>
          <Title>{DEFAULT_LOCATION_NAME}</Title>
        </TitleTextContainer>
      </TitleContainer>
      <MenusContainer>
        <HeaderMenus onClickCallback={handleMenuItemClick} isSettingsActive={paramMain === 0} />
      </MenusContainer>
      <SettingButton $enable={paramMain === 0} onClick={handleGoSetting}>
        <img src={`${ICON_HEADER_SETTING}`} alt="settings" />
      </SettingButton>
    </TopHeader>
  );
}

const TopHeader = styled.header`
  display: flex;
  justify-content: space-between;
  top: 0px;
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  padding: 1px;
  gap: 1px; 
  background: linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2});
  border-bottom: 1px solid ${COLORSET_HEADER_BORDER1};
`;

const TitleContainer = styled(BaseFlexColumn)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 80px;
  gap: 1px;
  background: linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2});
`;

const TitleLogoContainer = styled(BaseFlexCenterDiv)`
  width: 220px;
  height: 50px;
  background: linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2});
`;

const TitleTextContainer = styled(BaseFlexCenterDiv)`
  width: 220px;
  height: 30px;
  background: transparent;
  // border: 1px solid #444;
`;

const Title = styled.div<{ fontSize?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  background: transparent;
  color: white;
  font-weight: bold;
  font-size: ${(props) => props.fontSize? props.fontSize : "10px"};
`;

const MenusContainer = styled(BaseFlex1Column)`
  width: calc(100% - 270px);
  background: linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2});
  gap: 0px;
`;

const SettingButton = styled.button<{ $enable: boolean, fontSize?: string }>`
  height: 50px;
  width: 50px;
  font-size: ${(props) => props.fontSize ?? FONTSET_MAIN_MENU_SIZE};
  background: ${(props) => props.$enable ? COLORSET_SIGNITURE_COLOR : `linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2})`};
  border-right: 0px solid #333;
  border-top: 0px solid #333;
  border-left: 1px solid #333;
  border-bottom: 1px solid #333;
`;

export default Header;
