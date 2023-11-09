import { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSettings } from "../features/api";
import { setReportTable, setTabPage, setTabSetting } from "../features/reducers/optionSlice";
import { MainMenu, SubMenu } from "./HeaderMenus";

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

  const subcallback = (id: string, id2: string) => {
    navigate(`/daily/${id}/${id2}`);
  };

  const handleGoSetting = useCallback(() => {
    navigate("/settings");
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getSettings();
        console.log("getSettings res: ", response);

        if (response) {
          dispatch(setReportTable(response.settings));
          dispatch(setTabSetting(response.tabSetting));

          let count = 1;
          const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;

          if (response.tabSettings.length) {
            ["1", "2", "3", "4", "5"].forEach((mainId)=>{
              ["1", "2", "3", "4", "5"].forEach((subId)=>{
                const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
                if (process.env[key]) {
                  dispatch(setTabPage({name: keyName + `${mainId}${subId}`, 
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
  }, []);

  return (
    <TopHeader>
      <Title>Fac-Report</Title>
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
  width: 100%;
  height: 70px;
  background-color: #344054;
  border: 1px solid #333;
`;

const Title = styled.button`
  width: 200px;
  height: 70px;
  font-weight: bold;
  font-size: 30px;
  
  color: white;
  background-color: #344054;
  border: 0px solid #333;
`;

const PageControls = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0px;
`;

const SettingButton = styled.button`
  height: 70px;
  width: 100px;
  color: white;
  background-color: #344054;
`;
