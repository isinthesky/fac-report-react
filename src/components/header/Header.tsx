import { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSettings } from "../../features/api";
import { setApproves, setReportTable, setTabSetting } from "../../features/reducers/settingSlice";
import { setViewSelect, setTabPage } from "../../features/reducers/tabPageSlice";
import { MainMenu, SubMenu } from "./HeaderMenus";
import { CONST_TABINFO_NAME, DEFAULT_MAINLOGO_ROW_PATH, DEFAULT_BGIMG_HEADER, DEFAULT_LOCATION_NAME } from "../../env";
import { FONTSET_MAIN_MENU_SIZE, FONTSET_MAIN_MENU_TITLESIZE, FONTSET_MAIN_MENU_VERSIONSIZE } from "../../static/fontSet";
import { COLORSET_BACKGROUND_COLOR, COLORSET_HEADER_BTN_LINEAR1, COLORSET_HEADER_BTN_LINEAR2 } from "../../static/colorSet";
import { ICON_HEADER_SETTING } from "../../static/constSet";


import { getDeviceInfo } from "../../features/api/device";
import { loadDeviceList } from "../../features/reducers/deviceSlice";
import { BaseFlexColumn, BaseFlexRow } from "../../static/componentSet";
import { HeaderProps } from "../../static/interfaces";

const baseUrl = "http://localhost:3005/"; // Example base URL


export default function Header({ mainTab }: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFlatId, setSelectedFlatId] = useState<string>(mainTab.toString());
  const [logoSrc, setLogoSrc] = useState(DEFAULT_MAINLOGO_ROW_PATH);

  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = DEFAULT_BGIMG_HEADER; // 이미지 URL
    img.onload = () => {
      setBackgroundLoaded(true);
    };
  }, []);


  const containerStyle = backgroundLoaded ? {
    backgroundImage: `url(${DEFAULT_BGIMG_HEADER})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  const handleTitle = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleGoReport = useCallback((id:string) => {
    navigate(`/daily/${id}/1`);
  }, [navigate]);

  const handleFlatButtonClick = (id: string) => {
    console.log("id", id)
    setSelectedFlatId(id);
    handleGoReport(id);
  };

  const subcallback = (id1: string, id2: string) => {
    dispatch(setViewSelect({mainTab: Number(id1), subTab: Number(id2)}));
    navigate(`/daily/${id1}/${id2}`);
  };

  // console.log("id1", id1, "id2", id2)

  const handleGoSetting = useCallback(() => {
    navigate("/settings");
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getSettings();

        console.log("response", response);

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

          const resDeviceSet = await getDeviceInfo();
          dispatch(loadDeviceList(resDeviceSet));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <TopHeader>
      <TitleContainer style={containerStyle}>
        <TitleImg src={`${baseUrl}${DEFAULT_MAINLOGO_ROW_PATH}`} onClick={handleTitle}  alt="main_logo" />
        <TitleTextContainer>
          <Title>{DEFAULT_LOCATION_NAME}</Title>
          <Version>v0.13</Version>
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
  border: 1px solid #333;
  background: ${COLORSET_BACKGROUND_COLOR};
`;

const TitleContainer = styled(BaseFlexColumn)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 80px;
  background: linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2});
  
  gap: 10px;
  border: 0px solid #333;
`;

const TitleTextContainer = styled(BaseFlexRow)`
  width: 250px;
  background: transparent;
`;

const Title = styled.button<{ fontSize?: string }>`
  width: calc(70%);
  height: 20px;
  
  background: transparent;
  color: white;
  font-weight: bold;
  font-size: ${(props) => props.fontSize || "10px"};
  border: none;
`;

const TitleImg = styled.img`
  width: calc(70%);
`;

const Version = styled.button<{ fontsize?: string }>`
  width: calc(30%);
  height: 20px;
  background: transparent;
  color: white;
  font-size: ${(props) => props.fontsize || FONTSET_MAIN_MENU_VERSIONSIZE};
  border: none;
`;

const PageControls = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 80px;
  width: calc(100% - 300px);
  gap: 0px;
  background-image: url(${DEFAULT_BGIMG_HEADER});
`;

const SettingButton = styled.button<{ fontSize?: string }>`
  height: 50px;
  width: 50px;
  font-size: ${(props) => props.fontSize || FONTSET_MAIN_MENU_SIZE};
  border: none;
  border-left: 1px solid #444;
  background: linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2});
`;