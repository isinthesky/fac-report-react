import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setMenus } from "../../features/reducers/settingSlice";
import { setSettingSelect } from "../../features/reducers/tabPageSlice";
import { RootStore } from "../../store/congifureStore";
import { COLORSET_NORMAL_CONTROL_FONT, COLORSET_ACTIVE_CONTROL_BG, COLORSET_DARK_CONTROL_BG, COLORSET_NORMAL_CONTROL_BG, COLORSET_NORMAL_CONTROL_BORDER, COLORSET_SETTING_TAB_BUTTON_ACTIVE } from "../../static/colorSet";
import { FONTSET_DEFAULT_BUTTON_SIZE, FONTSET_DESCRIPTION_LABEL_SIZE } from "../../static/fontSet";
import { BaseButton, BaseFlexRow, MediumLabel } from "../../static/componentSet";
import { handleInitSettings } from "./set/handleButtons";
import { STRING_SETTING_MAIN_BTN_INIT } from "../../static/langSet";

const TabControlBar: React.FC<{ showInit: boolean }> = ({ showInit }) => {
  const dispatch =  useDispatch()
  const menus = useSelector((state: RootStore) => state.settingReducer.menus);
  const tabPosition = useSelector((state: RootStore) => state.tabPageReducer.settingPosition);

  useEffect(() => {
    const buttons: string[] = [];

    ["1", "2", "3", "4", "5"].forEach((mainId) => {
      ["1", "2", "3", "4", "5"].forEach((subId) => {
        const key = `REACT_APP_INIT_REPORT_MENU${mainId}_SUB${subId}`;
        if (process.env[key]) {
          buttons.push(`${mainId}${subId}`);
        }
      });
    });

    dispatch(setMenus(buttons));
  }, []); // Removed dispatch from dependency array

  const handleTabClick = useCallback((main:string, sub:string) => {
    dispatch(setSettingSelect({mainTab: Number(main), subTab: Number(sub)}));
  }, [dispatch]);
  
  const processArray = useCallback((arr: string[]) => {
    if (arr.length === 0 ) return;
  
    const settingTabpageButtons = arr.reduce((acc, code) => {
      const mainTab = Number(code[0]); // Extract the main tab digit.
      const subTab = Number(code[1]); // Extract the sub tab digit.
  
      if (!acc[mainTab]) {
        acc[mainTab] = [];
      }
  
      acc[mainTab].push(subTab);
      return acc;
    }, {} as { [key: number]: number[] });
  
    return Object.entries(settingTabpageButtons).map(([mainTab, subTabs]) => (
      <div key={mainTab} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <MainTabLabel>
          {process.env[`REACT_APP_INIT_REPORT_MENU${mainTab}`]}
        </MainTabLabel>
        <div>
          {subTabs.map(subTab => (
            <TabButton
              key={`${mainTab}${subTab}`}
              onClick={() => handleTabClick(mainTab.toString(), subTab.toString())}
              mode={(Number(mainTab) === tabPosition.main && Number(subTab) === tabPosition.sub) ? "true" : "false"}
              fontSize={FONTSET_DEFAULT_BUTTON_SIZE}
            >
              {process.env[`REACT_APP_INIT_REPORT_MENU${mainTab}_SUB${subTab}`]}
            </TabButton>
          ))}
        </div>
      </div>
    ));
  }, [menus, tabPosition, handleTabClick]);

  return(
    <TopBar>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '20px' }}>
        {processArray(menus)}
      </div>
      {showInit && <InitButton id="init" onClick={handleInitSettings}>{STRING_SETTING_MAIN_BTN_INIT}</InitButton>}
    </TopBar>
  ) 
}

const TopBar = styled(BaseFlexRow)`
  align-items: center;
  justify-content: space-between;

  gap: 20px;
  padding: 0px 30px;
`;

const MainTabLabel = styled(MediumLabel)`
  padding: 0px 3px;
  height: 15px;
  font-size: ${FONTSET_DESCRIPTION_LABEL_SIZE};
`;

const TabButton = styled.button<{ mode: string, fontSize?: string }>`
  height: 30px;
  width: 80px;
  margin-right: 5px;

  color: ${(props) => (props.mode === "true" ? "white" : COLORSET_NORMAL_CONTROL_FONT)};
  font-size: ${(props) => props.fontSize ? props.fontSize : FONTSET_DEFAULT_BUTTON_SIZE};
  
  background: ${(props) => props.mode === "true" 
    ? COLORSET_SETTING_TAB_BUTTON_ACTIVE
    : COLORSET_DARK_CONTROL_BG};
  
  border: 1px solid #333;
  border-bottom: ${(props) => props.mode === "true" ? `1px solid ${COLORSET_ACTIVE_CONTROL_BG}` : `1px solid ${COLORSET_DARK_CONTROL_BG}`};
`;

const InitButton = styled(BaseButton)`
  height: 25px;
  width: 80px;
  color: ${COLORSET_NORMAL_CONTROL_FONT};
  background-color: ${COLORSET_NORMAL_CONTROL_BG};
  border: 1px solid ${COLORSET_NORMAL_CONTROL_BORDER};
`

export default React.memo(TabControlBar);
