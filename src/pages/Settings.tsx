import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ComposeSet from "../components/settings/ComposeSet";
import ComposeView from "../components/settings/ComposeView";
import {
  getDeviceInfo,
  getSettings,
  setUpdateSettingsColRow,
  setInitSettings,
  resetXxmlDevice
} from "../features/api";
import { loadDeviceList } from "../features/reducers/deviceSlice";
import { setReportTable } from "../features/reducers/settingSlice";
import {
  setCurrentTab,
  setTabPage,
} from "../features/reducers/tabPageSlice";
import TabControlBar from "../components/settings/TabControlBar";
import ApproveSetModal from "../components/ApproveSetModal";
import { RootStore } from "../store/congifureStore";

function Settings() {
  const dispatch = useDispatch();
  const [rows, setRow] = useState(0);
  const [columns, setColumn] = useState(0);
  const [mode, setMode] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params  = useParams();

  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSet = useSelector((state : RootStore) => state.tabPageReducer);

  useEffect(() => {
    (async () => {
      try {
        const response = await getSettings();
        // console.log("settings getSettings:", response)
        if (response) {
          dispatch(setReportTable(response.settings));

          const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;
          let count = 1;
          if (response.tabSettings.length) {
            ["1", "2", "3", "4", "5"].forEach( async (mainId)=>{
              ["1", "2", "3", "4", "5"].forEach( async (subId)=>{
                const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
                if (process.env[key]) {
                  dispatch(setTabPage({name: keyName + `${mainId}${subId}`, 
                                       object: response[keyName + `${count++}`]}));
                }
              })
            })
          }

          setRow(response.settings.row);
          setColumn(response.settings.column);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await getDeviceInfo();
        dispatch(loadDeviceList(response));
      } catch (error) {
        console.error(error);
      }

    })();
  }, []);


  useEffect(() => {
    if (Object.keys(params).length === 0) {
      setMode(false);
    }
  }, [params]);

  useEffect(() => {
    const key = process.env.REACT_APP_CONST_TABINFO_NAME + `${settingSet.selectedTab.main}${settingSet.selectedTab.sub}`;
    dispatch(setCurrentTab(tabPageSet[key])) 
  }, [settingSet]);

  const handleRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value));
  };

  const handleColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumn(Number(e.target.value));
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleApply = () => {
    setUpdateSettingsColRow(rows, columns);
    dispatch(setReportTable({ row: rows, column: columns }));
  };

  const handleApproveSetting = () => {
    setIsOpen(false) 
  }

  const handleSetDevice = () => {
    try {
      setMode(!mode);
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };

  const handleInitSettings = async () => {
    try {
      const isConfirmed = window.confirm(
        "모든 데이터가 초기화 됩니다. \r\n 실행하시겠습니까?"
      );

      if (isConfirmed) {
        let id = 1;
        
        ["1", "2", "3", "4", "5"].forEach( async (mainId)=>{
          ["1", "2", "3", "4", "5"].forEach( async (subId)=>{
            if (process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`]) {
              await setInitSettings(process.env.REACT_APP_CONST_TABINFO_NAME + `${id++}`, 
                                    String(process.env.REACT_APP_INIT_TABPAGE_SETTING));
            }
          })
        })

        await setInitSettings("approves", String(process.env.REACT_APP_INIT_APPROVES_SETTING));
        await setInitSettings("settings", String(process.env.REACT_APP_INIT_GENERAL_SETTING));
        await setInitSettings("tabSetting", String(process.env.REACT_APP_INIT_TAB_SETTING));

        await resetXxmlDevice();

        alert('초기화 되었습니다.');
      }
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };

  const handleSignPopup = () => {
    setIsOpen(true) 
  };

  return (
    <Flat>

      {mode ? (
        <>
          <TabControlBar />
          <ComposeSet row={rows} column={columns}></ComposeSet>
        </>
      ) : (
        <>
          <TopBar>
          <InputGroup>
            <label htmlFor="row-input">Rows:</label>
            <Input
              type="number"
              onChange={handleRow}
              readOnly={edit}
              value={rows}
              mode={edit}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="column-input">Columns:</label>
            <Input
              type="number"
              onChange={handleColumn}
              readOnly={edit}
              value={columns}
              mode={edit}
            />
          </InputGroup>
          <SettingButton onClick={handleEdit}>편집</SettingButton>
          <SettingButton onClick={handleApply}>Apply</SettingButton>
          <SettingButton onClick={handleSetDevice}>
            device setting
          </SettingButton>
          <SettingButton onClick={handleInitSettings}>initialize</SettingButton>
          <SettingButton onClick={handleSignPopup}>approve setting</SettingButton>
        </TopBar>
        <TabControlBar />
        <ComposeView row={rows} column={columns}></ComposeView>
        {isOpen ? 
        <ModalBackdrop onClick={handleApproveSetting}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <Header>
                <ExitBtn onClick={handleApproveSetting}>x</ExitBtn>
              </Header>
              <ApproveSetModal />
            </ModalView>
          </ModalBackdrop>
          : null
        } 
        </>
      )}
    </Flat>
  );
}

const Flat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: start;
  justify-content: stretch;

  gap: 10px;
  padding: 20px;

  background-color: #F5F5F5;
`;


const TopBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  // gap: 20px;
`;

const Input = styled.input<{ mode: boolean }>`
  width: 50px;
  background-color: ${(props) => (props.mode ? "lightgray" : "white")};

  margin: 0px 30px; 
`;

const SettingButton = styled.button`
  padding: 5px 15px;
  margin: 0px 10px;
  
  border: none;
  border-radius: 5px;

  font-size: 1em;
  background-color: white;
`;

const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;


const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: 'dialog',
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 300px;
  height: 200px;
  background-color: #ffffff;
`;

const Header = styled.div`
  // flex: 1;
  display: flex;
  flex-direction: row;
  align-self: stretch;
  justify-content: end;
`;


const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
  font-size: 1em;
`;

const ExitBtn = styled(ModalBtn) `
background-color : #4000c7;
border-radius: 10px;
text-decoration: none;
margin: 10px;
padding: 5px 10px;
width: 30px;
height: 30px;
display : flex;
justify-content : center;
align-items : center;
align-self : end;
`;

export default Settings;
