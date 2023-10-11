import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DeviceInfo from "./DeviceInfo";
import { RootState } from "../../static/interface";

type ComposeViewProps = {
  row: number;
  column: number;
};

const ComposeView: React.FC<ComposeViewProps> = ({ row, column }) => {
  const deviceSet = useSelector(
    (state: RootState) => state.deviceReducer.value
  );

  useEffect(() => {
    try {
      renderButtons();
    } catch (error) {
      console.error(error);
    }
  }, [deviceSet]);

  const renderButtons = () => {
    const rows = [];
    let keyCounter = 0;

    for (let r = 0; r < row; r++) {
      const buttons = [];
      for (let c = 0; c < column; c++) {
        if (deviceSet.deviceList?.value?.length < 1) {
          return;
        }

        if (deviceSet.deviceList.length > 0) {
          buttons.push(
            <DeviceInfo
              key={keyCounter}
              type={deviceSet.deviceList[keyCounter].type}
              name={deviceSet.deviceList[keyCounter].name}
              id={deviceSet.deviceList[keyCounter].id}
              st={deviceSet.deviceList[keyCounter].st}
              div={deviceSet.deviceList[keyCounter].div}
              dv1={deviceSet.deviceList[keyCounter].dv1}
              dv2={deviceSet.deviceList[keyCounter].dv2}
              dv3={deviceSet.deviceList[keyCounter].dv3}
              dv4={deviceSet.deviceList[keyCounter].dv4}
              dv5={deviceSet.deviceList[keyCounter].dv5}
              dv6={deviceSet.deviceList[keyCounter].dv6}
              dv7={deviceSet.deviceList[keyCounter].dv7}
              dv8={deviceSet.deviceList[keyCounter].dv8}
              dv9={deviceSet.deviceList[keyCounter].dv9}
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

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-around;
`;

export default ComposeView;
