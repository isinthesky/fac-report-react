import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setMenus } from "../../features/reducers/settingSlice";
import { setSettingSelect } from "../../features/reducers/tabPageSlice";
import { RootStore } from "../../store/congifureStore";
import { COLORSET_SIGNITURE_COLOR } from "../../static/colorSet";
import { FONTSET_DEFAULT_BUTTON_SIZE } from "../../static/fontSet";

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
  }, [dispatch]);

  const handleTabClick = (main:string, sub:string) => {
    console.log('handleTabClick', main, sub)
    dispatch(setSettingSelect({mainTab: Number(main), subTab: Number(sub)}));
  }
  
  const processArray = (arr:string[]) => {
    const tens = new Set(); // 10의 자리 수를 저장할 Set
    const ones = []; // 1의 자리 수를 저장할 배열
  
    for (const number of arr) {
      const ten = number[0];
      const one = number[1];
  
      if (!tens.has(ten)) {
        tens.add(ten); // 10의 자리 수가 중복되지 않으면 Set에 추가
        ones.push(<MainTabLabel key={number[0]} >
          {process.env[`REACT_APP_INIT_REPORT_TYPE${ten}`]}
        </MainTabLabel>); // 결과 배열에 10의 자리 수를 먼저 삽입
      }

      ones.push(
        <TabButton
          key={number}
          onClick={() => handleTabClick(ten, one)}
          mode={(Number(ten) === tabPosition.main && Number(one) === tabPosition.sub) ? "true" : "false"}
        >
          {process.env[`REACT_APP_INIT_REPORT_TYPE${ten}_SUB${one}`]}
        </TabButton>
      );
    }
  
    return ones;
  };

    
  return <TopBar>{processArray(menus)}</TopBar>;
}

const TopBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;

  gap: 20px;

  border: 1px solid #222;
`;

const MainTabLabel = styled.label` 
  margin: 10px 10px 10px 30px;
  padding: 10px;
`;


const TabButton = styled.button<{ mode: string, fontsize?: string }>`
  height: 30px;
  width: 100px;

  color: ${(props) => (props.mode === "true" ? "white" : "black")};
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_BUTTON_SIZE};
  
  background-color: ${(props) => (props.mode === "true" ? COLORSET_SIGNITURE_COLOR : "white")};
  
  border: 0px solid #333;
  border-bottom: 2px solid #333;
`;

export default TabControlBar;