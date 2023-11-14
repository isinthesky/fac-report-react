import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DeviceInfo from "./DeviceInfo";
import { ComposeProps } from "../../static/types";
import { RootStore } from "../../store/congifureStore";

const ComposeView: React.FC<ComposeProps> = ({ row, column}) => {
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer.value);
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSet = useSelector((state : RootStore) => state.tabPageReducer);

  
  useEffect(() => {
    (async () => {
      try {
        renderButtons();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [deviceSet]);

  const renderButtons = () => {
    const rows = [];
    let keyCounter = 0;

    const key = process.env.REACT_APP_CONST_TABINFO_NAME + `${settingSet.selectedTab.main}${settingSet.selectedTab.sub}`;

    console.log("optionlist[key].unitList", tabPageSet, key, tabPageSet[key])
    
    for (let r = 0; r < row * column; r++) {

      if (tabPageSet[key]) {
          if (tabPageSet[key].unitList.length < 1) return;

          if (tabPageSet[key].unitList.length > 0) {


            rows.push(
              <DeviceInfo
                key={keyCounter}
                type={tabPageSet[key].unitList[keyCounter].type}
                name={tabPageSet[key].unitList[keyCounter].name}
                id={tabPageSet[key].unitList[keyCounter].id}
                st={tabPageSet[key].unitList[keyCounter].st}
                div={tabPageSet[key].unitList[keyCounter].div}
                dv1={tabPageSet[key].unitList[keyCounter].dv1}
                dv2={tabPageSet[key].unitList[keyCounter].dv2}
                dv3={tabPageSet[key].unitList[keyCounter].dv3}
                dv4={tabPageSet[key].unitList[keyCounter].dv4}
                dv5={tabPageSet[key].unitList[keyCounter].dv5}
                dv6={tabPageSet[key].unitList[keyCounter].dv6}
                dv7={tabPageSet[key].unitList[keyCounter].dv7}
                dv8={tabPageSet[key].unitList[keyCounter].dv8}
                dv9={tabPageSet[key].unitList[keyCounter].dv9}
              />
            );
          } 
          keyCounter++;
      }
      
    }

    return rows;
  };

  return (
    <ColumnContainer>
      {renderButtons()}
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  margin: 30px;
`;

export default ComposeView;
