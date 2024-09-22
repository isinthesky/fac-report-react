import { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store/congifureStore";
import { setViewSelect, setSettingSelect } from "../../features/reducers/tabPageSlice";
import { MainMenu, SubMenu } from "./HeaderMenus";
import { DEFAULT_MAINLOGO_ROW_PATH, DEFAULT_LOCATION_NAME } from "../../env";
import { FONTSET_MAIN_MENU_SIZE } from "../../static/fontSet";
import { COLORSET_HEADER_BTN_LINEAR1, COLORSET_HEADER_BTN_LINEAR2, COLORSET_SIGNITURE_COLOR, COLORSET_HEADER_BORDER1 } from "../../static/colorSet";
import { ICON_HEADER_SETTING } from "../../static/constSet";
import { throttle } from 'lodash';
import { BaseFlex1Column, BaseFlexCenterDiv, BaseFlexColumn } from "../../static/componentSet";
import { HeaderProps } from "../../static/interfaces";

export default function Header({ mainTab }: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settingSetMenus = useSelector((state: RootStore) => state.settingReducer.menus);
  const viewPosition = useSelector((state: RootStore) => state.tabPageReducer.viewPosition);
  const [selectedMenu, setSelectedMenu] = useState<{ mainId: number, subId: number }>({ mainId: mainTab, subId: viewPosition.sub as number });

  const handleMainMenuButtonClick = useCallback(throttle((id: number) => {  
    const mainId = id * 10;
    
    for (let i = 0; i < settingSetMenus.length; i++) {
      const subId = Number(settingSetMenus[i]);
      
      if (subId > mainId) {
        setSelectedMenu({ mainId: id, subId: Number(settingSetMenus[i][1]) });
        dispatch(setViewSelect({mainTab: id, subTab: Number(settingSetMenus[i][1])}));
        navigate(`/daily/${id.toString()}/${settingSetMenus[i][1]}`);
        break;
      }
    }
  }, 300, { 'trailing': false }), [navigate]);

  const subMenuButtonCallback = useCallback(throttle((id1: number, id2: number) => {
    console.log("subMenuButtonCallback", id1, id2);
    dispatch(setViewSelect({mainTab: id1, subTab: id2}));
    // navigate(`/daily/${id1.toString()}/${id2.toString()}`);
  }, 1000, { 'trailing': false }), [navigate, dispatch]);

  const handleGoSetting = useCallback(() => {
    setSelectedMenu({ mainId: 0, subId: 0 });
    dispatch(setViewSelect({mainTab: 0, subTab: 0}));
    dispatch(setSettingSelect({mainTab: 1, subTab: 1}));
    navigate("/settings");
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        if (settingSetMenus.length > 0) {
          const [mainId, subId] = settingSetMenus[0].split('').map(Number);
          console.log("Header Init: ", mainId, subId);
          dispatch(setViewSelect({mainTab: mainId, subTab: subId}));
          navigate(`/daily/${mainId.toString()}/${subId.toString()}`);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch, settingSetMenus]);
  
  return (
    <TopHeader>
      <TitleContainer>
        <TitleLogoContainer>
          <img src={DEFAULT_MAINLOGO_ROW_PATH} style={{width: "70%"}} alt="main_logo" />
        </TitleLogoContainer>
        <TitleTextContainer>
          <Title>{DEFAULT_LOCATION_NAME}</Title>
        </TitleTextContainer>
      </TitleContainer>
      <MenusContainer>
        <MainMenuControls>
          <MainMenu onClickCallback={handleMainMenuButtonClick} />
        </MainMenuControls>
        <SubMenuControlsFlex>
          <SubMenu mainId={selectedMenu.mainId} subId={selectedMenu.subId} onClickCallback={subMenuButtonCallback} />
        </SubMenuControlsFlex>
      </MenusContainer>
      <SettingButton $enable={selectedMenu.mainId === 0} onClick={handleGoSetting}><img src={`${ICON_HEADER_SETTING}`} alt="settings" /></SettingButton>
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

const MainMenuControls = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  
  height: 50px;
`;

const SubMenuControlsFlex = styled.div`
  display: grid;

  grid-template-columns: repeat(10, 1fr);
  height: 30px;
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