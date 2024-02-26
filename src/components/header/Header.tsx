import { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSettings } from "../../features/api";
import { setApproves, setReportTable, setTabSetting } from "../../features/reducers/settingSlice";
import { setViewSelect, setTabPage } from "../../features/reducers/tabPageSlice";
import { MainMenu, SubMenu } from "./HeaderMenus";
import { CONST_TABINFO_NAME } from "../../env";
import { FONTSET_MAIN_MENU_SIZE, FONTSET_MAIN_MENU_TITLESIZE, FONTSET_MAIN_MENU_VERSIONSIZE } from "../../static/fontSet";
import { getDeviceInfo } from "../../features/api/device";
import { loadDeviceList } from "../../features/reducers/deviceSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFlatId, setSelectedFlatId] = useState<string>("");

  const handleGoReport = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleFlatButtonClick = (id: string) => {
    setSelectedFlatId(id);
    handleGoReport();
  };

  const subcallback = (id1: string, id2: string) => {
    dispatch(setViewSelect({mainTab: Number(id1), subTab: Number(id2)}));
    navigate(`/daily/${id1}/${id2}`);
  };

  const handleGoSetting = useCallback(() => {
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

          if (response.tabSettings.length) {
            [1, 2, 3, 4, 5].forEach((mainId)=>{
              [1, 2, 3, 4, 5].forEach((subId)=>{
                const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
                if (process.env[key]) {
                  console.log("resSetting", key)
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
      <Title>Fac-Report</Title>
      <Version>0.13</Version>
      <PageControls>
        <MainMenu onClickCallback={handleFlatButtonClick} />
        <SubMenu mainId={selectedFlatId} onClickCallback={subcallback} />
      </PageControls>
      <SettingButton onClick={handleGoSetting}>Setting</SettingButton>
    </TopHeader>
  );
}

const TopHeader = styled.header`
  display: flex;
  justify-content: stretch;
  top: 0px;
  width: 100%;
  height: 70px;
  border: 1px solid #333;
`;

const Title = styled.button<{ fontsize?: string }>`
  width: 200px;
  height: 70px;
  font-weight: bold;
  font-size: ${(props) => props.fontsize || FONTSET_MAIN_MENU_TITLESIZE};
  border: 0px solid #333;
`;

const Version = styled.button<{ fontsize?: string }>`
  width: 50px;
  height: 70px;
  font-size: ${(props) => props.fontsize || FONTSET_MAIN_MENU_VERSIONSIZE};
  border: 0px solid #333;
`;

const PageControls = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0px;
`;

const SettingButton = styled.button<{ fontsize?: string }>`
  height: 70px;
  width: 100px;
  font-size: ${(props) => props.fontsize || FONTSET_MAIN_MENU_SIZE};
`;
