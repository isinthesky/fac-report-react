import { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSettings } from "../../features/api";
import { setApproves, setReportTable, setTabSetting } from "../../features/reducers/settingSlice";
import { setViewSelect, setTabPage, setSettingSelect } from "../../features/reducers/tabPageSlice";
import { MainMenu, SubMenu } from "./HeaderMenus";
import { CONST_TABINFO_NAME, DEFAULT_MAINLOGO_ROW_PATH, DEFAULT_LOCATION_NAME } from "../../env";
import { FONTSET_MAIN_MENU_SIZE, FONTSET_MAIN_MENU_VERSIONSIZE } from "../../static/fontSet";
import { COLORSET_BACKGROUND_COLOR, COLORSET_HEADER_BTN_LINEAR1, COLORSET_HEADER_BTN_LINEAR2 } from "../../static/colorSet";
import { ICON_HEADER_SETTING } from "../../static/constSet";

import { BaseFlexCenterDiv, BaseFlexColumn, BaseFlexRow } from "../../static/componentSet";
import { HeaderProps } from "../../static/interfaces";

// const baseUrl = "http://192.168.18:5003/"; // Example base URL
// const baseUrl = "http://facreport.iptime.org:5003/"; // Example base URL


export default function Header({ mainTab }: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFlatId, setSelectedFlatId] = useState<number>(mainTab);


  const handleTitle = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleGoReport = useCallback((id:string) => {
    navigate(`/daily/${id}/1`);
  }, [navigate]);

  const handleFlatButtonClick = (id: number) => {    
    setSelectedFlatId(id);
    handleGoReport(id.toString());
  };

  const subcallback = (id1: number, id2: number) => {
    dispatch(setViewSelect({mainTab: id1, subTab: id2}));
    navigate(`/daily/${id1.toString()}/${id2.toString()}`);
  };

  const handleGoSetting = useCallback(() => {
    dispatch(setViewSelect({mainTab: 0, subTab: 0}));
    dispatch(setSettingSelect({mainTab: 1, subTab: 1}));
    navigate("/settings");
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getSettings();
  
        if (response) {
          dispatch(setReportTable(response.settings));
          dispatch(setTabSetting(response.tabSetting));
          dispatch(setApproves(response.approves))
  
          let count = 1;
          const keyName = CONST_TABINFO_NAME;
  
          if (response.tabSetting.length) {
            [1, 2, 3, 4, 5].forEach((mainId)=>{
              [1, 2, 3, 4, 5].forEach((subId)=>{
                const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
                if (process.env[key]) {
                  dispatch(setTabPage({mainTab: mainId, subTab: subId, 
                                       object: response[keyName + `${count++}`]}));
                }
              })
            })
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]); // Added dispatch to the dependency array

  return (
    <TopHeader>
      <TitleContainer>
        <TitleLogoContainer>
          <img src={DEFAULT_MAINLOGO_ROW_PATH} style={{width: "70%"}} onClick={handleTitle} alt="main_logo" />
        </TitleLogoContainer>
        <TitleTextContainer>
          <Title>{DEFAULT_LOCATION_NAME}</Title>
        </TitleTextContainer>
      </TitleContainer>
      <PageControls>
        <MainMenu onClickCallback={handleFlatButtonClick} />
        <SubMenu mainId={selectedFlatId} onClickCallback={subcallback} />
      </PageControls>
      <SettingButton onClick={handleGoSetting}><img src={`${ICON_HEADER_SETTING}`} alt="settings" /></SettingButton>
    </TopHeader>
  );
}

const TopHeader = styled.header`
  display: flex;
  justify-content: space-between;
  top: 0px;
  width: 100%;
  height: 80px;
  border: 1px solid #444;
  background: ${COLORSET_BACKGROUND_COLOR};
`;

const TitleContainer = styled(BaseFlexColumn)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 80px;
  gap: 0px;
  background: linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2});
  
  border: 1px solid #444;
`;


const TitleLogoContainer = styled(BaseFlexCenterDiv)`
  width: 250px;
  height: 50px;
  background: transparent;
  border: 1px solid #444;
`;

const TitleTextContainer = styled(BaseFlexCenterDiv)`
  width: 250px;
  height: 30px;
  background: transparent;
  border: 1px solid #444;
`;

const Title = styled.div<{ fontSize?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  background: transparent;
  color: white;
  font-weight: bold;
  font-size: ${(props) => props.fontSize || "10px"};
`;

const PageControls = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 80px;
  width: calc(100% - 300px);
  gap: 0px;
`;

const SettingButton = styled.button<{ fontSize?: string }>`
  height: 50px;
  width: 50px;
  font-size: ${(props) => props.fontSize || FONTSET_MAIN_MENU_SIZE};
  border: none;
  border-left: 1px solid #444;
  background: linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2});
`;
