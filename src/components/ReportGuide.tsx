import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import DeviceType1 from "./DeviceType1";

type ReportGuideProps = {
  row: number;
  column: number;
};

interface RootState {
  deviceReducer: {
    value: any;
  };
}

const ReportGuide: React.FC<ReportGuideProps> = ({ row, column }) => {
  const devicelist = useSelector(
    (state: RootState) => state.deviceReducer.value
  );

  const renderDevice = () => {
    if (devicelist.deviceList.length < 1) {
      return;
    }

    const rows = [];
    let keyCounter = 0;

    for (let r = 0; r < row; r++) {
      const buttons = [];
      for (let c = 0; c < column; c++) {
        buttons.push(
          <Container1>
            <Divide1>
              <Row1 key="r01">
                <Column1 key="c01">{"구 분"}</Column1>
              </Row1>
              <Row1 key="r02">
                <Column1 key="c01">{"/"}</Column1>
              </Row1>
              <Row1 key="r03">
                <Column1 key="c01">{"시 간"}</Column1>
              </Row1>
              <Row1 key="r04">
                <Column1 key="c01">{"07:00"}</Column1>
              </Row1>
              <Row1 key="r05">
                <Column1 key="c01">{"11:00"}</Column1>
              </Row1>
              <Row1 key="r06">
                <Column1 key="c01">{"17:00"}</Column1>
              </Row1>
              <Row1 key="r07">
                <Column1 key="c01">{"23:00"}</Column1>
              </Row1>
            </Divide1>
            <Divide2>
              <DeviceType1 divName={devicelist.deviceList[r].name} />
            </Divide2>
          </Container1>
        );
      }

      keyCounter++;
      rows.push(<Container1 key={r}>{buttons}</Container1>);
    }

    return rows;
  };

  return <>{renderDevice()}</>;
};

const Container1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;

  margin: 5px;
`;

const Divide1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Divide2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const Row1 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column1 = styled.div`
  flex: 1;
  padding: 3px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-around;
`;

export default ReportGuide;
