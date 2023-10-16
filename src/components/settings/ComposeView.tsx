import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DeviceInfo from "./DeviceInfo";
import { RootState, optionState } from "../../static/interface";
import { ComposeProps } from "../../static/types";
import { subtle } from "crypto";

const ComposeView: React.FC<ComposeProps> = ({ row, column, mainTab, subTab }) => {
  
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


  console.log("ComposeView", deviceSet, row, column, mainTab, subTab);


  const renderButtons = () => {
    const rows = [];
    let keyCounter = 0;

    const key = `deviceList${mainTab}${subTab}`;

    console.log("deviceSet[key]", deviceSet[key])

    for (let r = 0; r < row; r++) {
      const buttons = [];
      for (let c = 0; c < column; c++) {
        if (deviceSet[key].length < 1) {
          return;
        }

        if (deviceSet[key].length > 0) {
          buttons.push(
            <DeviceInfo
              key={keyCounter}
              type={deviceSet[key][keyCounter].type}
              name={deviceSet[key][keyCounter].name}
              id={deviceSet[key][keyCounter].id}
              st={deviceSet[key][keyCounter].st}
              div={deviceSet[key][keyCounter].div}
              dv1={deviceSet[key][keyCounter].dv1}
              dv2={deviceSet[key][keyCounter].dv2}
              dv3={deviceSet[key][keyCounter].dv3}
              dv4={deviceSet[key][keyCounter].dv4}
              dv5={deviceSet[key][keyCounter].dv5}
              dv6={deviceSet[key][keyCounter].dv6}
              dv7={deviceSet[key][keyCounter].dv7}
              dv8={deviceSet[key][keyCounter].dv8}
              dv9={deviceSet[key][keyCounter].dv9}
            />
          );
        } else {
          buttons.push([]);
        }
        keyCounter++;
      }
      rows.push(<ButtonGrid key={r}>{buttons}</ButtonGrid>);
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
  display: flex;
  flex-direction: column;

  gap: 10px;
  margin: 30px auto;

  border: 1px solid #f0e0e0;
  border-radius: 5px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-around;
`;

const DeviceSelect = styled.select`
  min-width: 70px;
`;

export default ComposeView;
