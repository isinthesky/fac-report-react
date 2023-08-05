import React from "react";
import styled from "styled-components";
import DeviceGuide from "./DeviceGuide";

const ReportGuide: React.FC = () => {
  return (
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
        <DeviceGuide />
        <DeviceGuide />
        <DeviceGuide />
        <DeviceGuide />
      </Divide2>
    </Container1>
  );
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

export default ReportGuide;
