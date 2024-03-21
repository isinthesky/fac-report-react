import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setMenus } from "../../features/reducers/settingSlice";
import { setSettingSelect } from "../../features/reducers/tabPageSlice";
import { RootStore } from "../../store/congifureStore";
import { COLORSET_NORMAL_CONTROL_FONT, COLORSET_ACTIVE_CONTROL_BG, COLORSET_HEADER_SUB_BTN_LINEAR1, COLORSET_HEADER_SUB_BTN_LINEAR2, COLORSET_NORMAL_CONTROL_BG, COLORSET_DARK_CONTROL_BG } from "../../static/colorSet";
import { FONTSET_DEFAULT_BUTTON_SIZE, FONTSET_DESCRIPTION_LABEL_SIZE } from "../../static/fontSet";
import { BaseFlexRow, MediumLabel } from "../../static/componentSet";

const TabControlBar: React.FC = () => {
  const dispatch =  useDispatch()
  const menus = useSelector((state: RootStore) => state.settingReducer.menus);
  const tabPosition = useSelector((state: RootStore) => state.tabPageReducer.settingPosition);

  useEffect(() => {
    const buttons: string[] = [];

    ["1", "2", "3", "4", "5"].forEach((mainId) => {
      ["1", "2", "3", "4", "5"].forEach((subId) => {
        const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
        if (process.env[key]) {
          buttons.push(`${mainId}${subId}`);
        }
      });
    });

    dispatch(setMenus(buttons));
  }, []); // Removed dispatch from dependency array

  const handleTabClick = useCallback((main:string, sub:string) => {
    console.log('handleTabClick', main, sub)
    dispatch(setSettingSelect({mainTab: Number(main), subTab: Number(sub)}));
  }, [dispatch]);
  
  const processArray = useCallback((arr: string[]) => {
    console.log("arr", arr)
    if (arr.length === 0 ) return;
    // arr.sort(); // Sort the array to ensure the order is correct.
  
    const settingTabpageButtons = arr.reduce((acc, code) => {
      const mainTab = code[0]; // Extract the main tab digit.
      const subTab = code[1]; // Extract the sub tab digit.
  
      if (!acc[mainTab]) {
        acc[mainTab] = [];
      }
  
      acc[mainTab].push(subTab);
      return acc;
    }, {} as { [key: string]: string[] });

    console.log("tabcontrol", tabPosition)
  
    return Object.entries(settingTabpageButtons).map(([mainTab, subTabs]) => (
      <div key={mainTab} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <MainTabLabel>
          {process.env[`REACT_APP_INIT_REPORT_TYPE${mainTab}`]}
        </MainTabLabel>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
          {subTabs.map(subTab => (
            <TabButton
              key={`${mainTab}${subTab}`}
              onClick={() => handleTabClick(mainTab, subTab)}
              mode={(Number(mainTab) === tabPosition.main && Number(subTab) === tabPosition.sub) ? "true" : "false"}
              fontsize={FONTSET_DEFAULT_BUTTON_SIZE}
            >
              {process.env[`REACT_APP_INIT_REPORT_TYPE${mainTab}_SUB${subTab}`]}
            </TabButton>
          ))}
        </div>
      </div>
    ));
  }, [menus, tabPosition, handleTabClick]);

  console.log("menus", menus)

  return <TopBar>
    {processArray(menus)}</TopBar>;
}

const TopBar = styled(BaseFlexRow)`
  align-items: center;
  justify-content: start;

  gap: 20px;

  padding: 0px 30px;
  // border: 1px solid #222;
`;

const MainTabLabel = styled(MediumLabel)`
  margin: 5px;
  font-size: ${FONTSET_DESCRIPTION_LABEL_SIZE};
`;

const TabButton = styled.button<{ mode: string, fontsize?: string }>`
  height: 30px;
  width: 80px;
  margin-right: 5px;

  color: ${(props) => (props.mode === "true" ? "white" : COLORSET_NORMAL_CONTROL_FONT)};
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_BUTTON_SIZE};
  
  background: ${(props) => props.mode === "true" 
    ? `linear-gradient(to bottom, ${COLORSET_HEADER_SUB_BTN_LINEAR1}, ${COLORSET_HEADER_SUB_BTN_LINEAR2})`
    : COLORSET_DARK_CONTROL_BG};
  
  border: 0px solid #333;
  border-bottom: ${(props) => props.mode === "true" ? `1px solid ${COLORSET_ACTIVE_CONTROL_BG}` : "1px solid #000"};
`;

export default React.memo(TabControlBar);

// const processArray = useCallback((arr:string[]) => {
//   const tens = new Set(); // 10의 자리 수를 저장할 Set
//   const ones = []; // 1의 자리 수를 저장할 배열

//   for (const number of arr) {
//     const ten = number[0];
//     const one = number[1];

//     if (!tens.has(ten)) {
//       tens.add(ten); // 10의 자리 수가 중복되지 않으면 Set에 추가
//       ones.push(<MainTabLabel key={number[0]} >
//         {process.env[`REACT_APP_INIT_REPORT_TYPE${ten}`]}
//       </MainTabLabel>); // 결과 배열에 10의 자리 수를 먼저 삽입
//     }

//     ones.push(
//       <TabButton
//         key={number}
//         onClick={() => handleTabClick(ten, one)}
//         mode={(Number(ten) === tabPosition.main && Number(one) === tabPosition.sub) ? "true" : "false"}
//       >
//         {process.env[`REACT_APP_INIT_REPORT_TYPE${ten}_SUB${one}`]}
//       </TabButton>
//     );
//   }


// const processArray = useCallback((arr:string[]) => {
//   // arr sorting
//   // arr mapping 10digit position is key, 1digit position is value
//   // value of arr map is array , if 10digit is same, 1digit is push to array
//   // all key and value attech by object.entries
//   // return div element like menu bar
//   // 1. main tab label
//   // 2. sub tab button
//   // 3. sub tab button is active or not
//   // 4. sub tab button click event
//   // 5. sub tab button label
//   // 6. same key element group column flex start
//   // 7. 10digit is key, 1digit is value
//   // 8. value element of same group is row flex start  

//   return ones;
// }, [menus, tabPosition, handleTabClick]);