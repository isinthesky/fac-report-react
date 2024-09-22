import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SetDeviceType, Unit } from "../../../static/types";
import DeviceAutoSelect from "./DeviceSelector";
import { RootStore } from "../../../store/congifureStore";
import { BaseFlex1Column, BaseFlex1Div, BaseFlexColumn, BaseFlexDiv, SmallLabel } from "../../../static/componentSet";
import { COLORSET_GRID_CONTROL_BG2, COLORSET_GRID_CONTROL_BORDER, COLORSET_GRID_CONTROL_FONT } from "../../../static/colorSet";

interface BaseUnitTypeProps extends SetDeviceType {
  unitKeys: string[];
  containerStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  userTable?: boolean;
}

const BaseTableType: React.FC<BaseUnitTypeProps> = ({ name, unitKeys, containerStyle, titleStyle, userTable }) => {
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const [currUnit, setCurrUnit] = useState<Unit>(
    tabPageSlice.currentTabPage?.tables[tabPageSlice.unitPosition.index] || {} as Unit  
  );
  
  useEffect(() => {
    if (!tabPageSlice.currentTabPage) {
      return;
    }

    setCurrUnit(tabPageSlice.currentTabPage.tables[tabPageSlice.unitPosition.index]);
  }, [tabPageSlice.unitPosition]);
  
  return (
    <UnitContainer style={containerStyle}>
      <Section>
        <TitleDiv style={titleStyle}>{name}</TitleDiv>
      </Section>
      <DivicesContainer>
        {unitKeys.map((value, idx) => {
          if (currUnit.devices.length <= idx) {
            return null;
          }

          const initStationId =
            currUnit.devices[idx].path_id !== 0
              ? currUnit.devices[idx].station_id
              : currUnit.search_st;
          const initDivisionId =
            currUnit.devices[idx].path_id !== 0
              ? currUnit.devices[idx].division_id
              : currUnit.search_div;

          return (
            <DiviceDiv key={idx}>
              <ValueColumn>{value}</ValueColumn>
              {userTable ? (
                <input type="text" value={"user input"} disabled={true} />
              ) : (
                <DeviceAutoSelect
                  unitPosition={tabPageSlice.unitPosition.index}
                  devicePosition={idx}
                  devicelist={deviceSet}
                  initStationId={initStationId}
                  stationValue={currUnit.search_st}
                  initDivisionId={initDivisionId}
                  divisionValue={currUnit.search_div}
                  currentDevice={currUnit.devices[idx]}
                />
              )}
            </DiviceDiv>
          );
        })}
      </DivicesContainer>
    </UnitContainer>
  );
};

const UnitContainer = styled(BaseFlex1Column)`
  justify-content: space-between;
  flex-direction: column;
  align-items: stretch;
  gap: 0px;

  background-color: ${COLORSET_GRID_CONTROL_BG2};
`;

const TitleDiv = styled(BaseFlex1Div)`
  align-items: center;
  justify-content: start;
  
  padding: 0px 10px;

  color: ${COLORSET_GRID_CONTROL_FONT};

  background-color: ${COLORSET_GRID_CONTROL_BORDER};
`;

const ValueColumn = styled(SmallLabel)`
  padding: 0px 3px;
  width: 40px;
`;

const Section = styled(BaseFlexDiv)`
  height: 25px;
`;

const DivicesContainer = styled(BaseFlex1Column)`
  padding: 10px;
  gap: 7px;

  background-color: ${COLORSET_GRID_CONTROL_BG2};
`;

const DiviceDiv = styled(BaseFlexColumn)`
  gap: 0px;
`;

export default BaseTableType;
