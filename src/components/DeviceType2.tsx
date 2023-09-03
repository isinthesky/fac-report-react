import React from "react";
import styled from "styled-components";
import DeviceValue from "./DeviceValue";

const DeviceType2: React.FC = () => {
  return (
    <Container2>
      <Row2 key="r01">
        <TitleColumn key="c01">{"Name"}</TitleColumn>
      </Row2>
      <Row2 key="r02">
        <div>
          <Row2 key="r03">
            <MiddleColumn key="c11">{"Middle"}</MiddleColumn>
          </Row2>
          <Row2 key="r04">
            <ValueColumn key="c11">{"R-S"}</ValueColumn>
            <ValueColumn key="c12">{"S-T"}</ValueColumn>
            <ValueColumn key="c13">{"T-R"}</ValueColumn>
          </Row2>
          <Row2>
            <DeviceValue row={4} col={3} />
          </Row2>
        </div>
        <div>
          <Row2 key="r03">
            <MiddleColumn key="c21">{"Middle"}</MiddleColumn>
          </Row2>
          <Row2 key="r04">
            <ValueColumn key="c21">{"R-S"}</ValueColumn>
            <ValueColumn key="c22">{"S-T"}</ValueColumn>
            <ValueColumn key="c23">{"T-R"}</ValueColumn>
          </Row2>
          <Row2>
            <DeviceValue row={4} col={3} />
          </Row2>
        </div>
        <div>
          <ValueColumn key="c31">{"/"}</ValueColumn>{" "}
          <ValueColumn key="c32">{"PF"}</ValueColumn>{" "}
          <Row2>
            <DeviceValue row={4} col={1} />
          </Row2>
        </div>
        <div>
          <ValueColumn key="c33">{"/"}</ValueColumn>{" "}
          <ValueColumn key="c34">{"Hz"}</ValueColumn>{" "}
          <Row2>
            <DeviceValue row={4} col={1} />
          </Row2>
        </div>
        <div>
          <ValueColumn key="c35">{"/"}</ValueColumn>{" "}
          <ValueColumn key="c36">{"kW"}</ValueColumn>{" "}
          <Row2>
            <DeviceValue row={4} col={1} />
          </Row2>
        </div>
      </Row2>
    </Container2>
  );
};

const Container2 = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
`;

const Row2 = styled.div`
  display: flex;
  flex-direction: row;
`;

const TitleColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 3px;
  border: 1px solid #ccc;
`;

const MiddleColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 3px;
  border: 1px solid #ccc;
`;

const ValueColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 3px;
  border: 1px solid #ccc;

  min-width: 20px;
`;

export default DeviceType2;
