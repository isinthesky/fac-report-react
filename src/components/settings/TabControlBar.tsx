import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setSelectTab } from "../../features/reducers/settingSlice";

const TabControlBar: React.FC = () => {
  const dispatch =  useDispatch()
  const [menus, setMenus] = useState<string[]>([]);

  useEffect(() => {
    const buttons:string[] = [];

    ["1", "2", "3", "4", "5"].forEach( async (mainId)=>{
      ["1", "2", "3", "4", "5"].forEach( async (subId)=>{
          const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
          if (process.env[key]) {
            buttons.push(`${mainId}${subId}`)
          }
      })
    })
    setMenus(buttons);
  }, []);

  const handleTabClick = (main:string, sub:string) => {
    console.log("tabClick", main, sub)
    dispatch(setSelectTab({main: Number(main), sub: Number(sub)}));
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
  
      ones.push(<TabButton key={number} onClick = {(e)=>{handleTabClick(ten, one)}} >
        {process.env[`REACT_APP_INIT_REPORT_TYPE${ten}_SUB${one}`]}
      </TabButton>); // 결과 배열에 1의 자리 수를 삽입
    }
  
    return ones;
  };

    
  return (
    <TopBar>
    {processArray(menus)}
    </TopBar>
  );
}

const TopBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

const MainTabLabel = styled.label` 
  margin: 10px 10px 10px 30px;
  padding: 10px;
`;

const TabButton = styled.button`
  margin: 10px;
  padding: 10px;
  width: 80px;
  border: 0px solid #333;
  border-bottom: 2px solid #333;
`;

export default TabControlBar;
