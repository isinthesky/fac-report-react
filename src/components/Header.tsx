import { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initDeviceList } from "../features/reducers/deviceSlice";
import { getSettings } from "../features/api";
import { setDailySetting } from "../features/reducers/optionSlice";
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
    console.log("sub", id, "aa", id2);

    navigate(`/daily/${id}/${id2}`);
  };

  const getMarginButtonText = (marginButtonId: number) => {
    return `${selectedFlatId}${marginButtonId}`;
  };

  const handleGoSetting = useCallback(() => {
    navigate("/settings");
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getSettings();
        if (response) {
          dispatch(setDailySetting(response.settings));
          dispatch(initDeviceList(response.deviceList));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

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
  background-color: #ffff77;
  border: 1px solid #333;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  padding: 10px;
  color: black;
  font-weight: bold;
  font-size: 22px;
  background-color: #ffffff;
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
  margin: 0px 0px 0px 30px;
`;
