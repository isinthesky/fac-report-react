import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DeviceInfo from "./DeviceInfo";
import { RootState, optionState } from "../../static/interface";
import { ComposeProps } from "../../static/types";

const ComposeView: React.FC<ComposeProps> = ({ row, column}) => {
  
  const deviceSet = useSelector(
    (state: RootState) => state.deviceReducer.value
  );
  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

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

    const key = process.env.REACT_APP_CONST_TABINFO_NAME + `${optionlist.selectedTab.main}${optionlist.selectedTab.sub}`;


    console.log("optionlist[key].unitList", optionlist[key].unitList)
    
    for (let r = 0; r < row * column; r++) {

      if (optionlist[key]) {
          if (optionlist[key].unitList.length < 1) return;

          if (optionlist[key].unitList.length > 0) {


            rows.push(
              <DeviceInfo
                key={keyCounter}
                type={optionlist[key].unitList[keyCounter].type}
                name={optionlist[key].unitList[keyCounter].name}
                id={optionlist[key].unitList[keyCounter].id}
                st={optionlist[key].unitList[keyCounter].st}
                div={optionlist[key].unitList[keyCounter].div}
                dv1={optionlist[key].unitList[keyCounter].dv1}
                dv2={optionlist[key].unitList[keyCounter].dv2}
                dv3={optionlist[key].unitList[keyCounter].dv3}
                dv4={optionlist[key].unitList[keyCounter].dv4}
                dv5={optionlist[key].unitList[keyCounter].dv5}
                dv6={optionlist[key].unitList[keyCounter].dv6}
                dv7={optionlist[key].unitList[keyCounter].dv7}
                dv8={optionlist[key].unitList[keyCounter].dv8}
                dv9={optionlist[key].unitList[keyCounter].dv9}
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
