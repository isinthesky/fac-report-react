
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { updateCurrentUnit } from "../../../features/reducers/tabPageSlice";
import { RootStore } from "../../../store/congifureStore";
import { BaseInput, BaseSelect, BaseOption, BaseFlex1Column,BaseFlexRow, MediumLabel, BaseFlexColumn, } from "../../../static/componentSet";
import { IDivision, IStation } from "../../../static/types";
import { CONST_TYPE_INFO_NAMES } from "../../../env";
import { COLORSET_GRID_CONTROL_BG, COLORSET_GRID_CONTROL_BORDER } from "../../../static/colorSet";
import DeviceSearch from "./DeviceSearch";
import { STRING_SETTING_DEVICE_FILTER, STRING_SETTING_DEVICE_NAME_SETTING, STRING_SETTING_DEVICE_TYPE_SELECT } from "../../../static/langSet";

const DeviceHeaderSet = () => {
  const dispatch = useDispatch();
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const [deviceType, setDeviceType] = useState(tabPageSlice.currentTabPage.tab_table_infos[tabPageSlice.unitPosition.index].type);
  const [selectedStation, setSelectedStation] = useState<number>(tabPageSlice.currentTabPage.tab_table_infos[tabPageSlice.unitPosition.index].st);
  const [selectedDivision, setSelectedDivision] = useState<number>(0);
  const [deviceName, setDeviceName] = useState<string>("");

  useEffect(() => {
    const currentUnit = tabPageSlice.currentTabPage.tab_table_infos[tabPageSlice.unitPosition.index]

    console.log("currentUnit", currentUnit)

    if (currentUnit.type === 0) {
      setDeviceType(1);
      dispatch(updateCurrentUnit({arrPos:tabPageSlice.unitPosition.index,
          arrKey:"type",
          deviceId: 1
      }));
    }

    if (currentUnit.st === 0) {
      setSelectedStation(deviceSet.stations[0].id);
      dispatch(
        updateCurrentUnit({
          arrPos: tabPageSlice.unitPosition.index,
          arrKey: "st",
          deviceId: deviceSet.stations[0].id,
        })
      );
    }

    setDeviceName(currentUnit.name);
  }, [tabPageSlice.currentTabPage, tabPageSlice.unitPosition]);

  useEffect(() => {
    if (!selectedStation) 
      return;

    setSelectedDivision(deviceSet.divisions.filter((item) => item.station_id === selectedStation)[0].id);
    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "div",
        deviceId: deviceSet.divisions.filter((item) => item.station_id === selectedStation)[0].id,
      })
    );
  }, [selectedStation]);


  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = Number(e.target.value);
    setDeviceType(newType);
    dispatch(updateCurrentUnit({arrPos:tabPageSlice.unitPosition.index,
        arrKey:"type",
        deviceId: newType
    }));
  };

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "st",
        deviceId: Number(e.target.value),
      })
    );
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "div",
        deviceId: Number(e.target.value),
      })
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceName(e.target.value);

    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "name",
        deviceId: e.target.value,
      })
    );
  };

  return (
    <UnitSettingContainer>
      <OptionContainer>
        <MediumLabel>{STRING_SETTING_DEVICE_NAME_SETTING}</MediumLabel>
        <BaseInput type="text" onChange={handleNameChange} value={deviceName} />
      </OptionContainer>
      <OptionContainer>
        <MediumLabel>{STRING_SETTING_DEVICE_TYPE_SELECT}</MediumLabel>
        <BaseSelect onChange={handleTypeChange} value={deviceType}>
          { CONST_TYPE_INFO_NAMES.map((item, index) => (
            <BaseOption key={index} value={index+1}>
              {item}
            </BaseOption>
          ))}
        </BaseSelect>
      </OptionContainer>
      <FilterContainer>
        <MediumLabel>{STRING_SETTING_DEVICE_FILTER}</MediumLabel>
        <BaseFlexRow>
          <BaseSelect onChange={handleStationChange} value={selectedStation}>
            {deviceSet.stations.map((st: IStation) => (
              <BaseOption key={st.id} value={st.id}>
                {st.name}
              </BaseOption>
            ))}
          </BaseSelect>
          <BaseSelect onChange={handleDivisionChange} value={selectedDivision}>
            {deviceSet.divisions.filter((item) => item.station_id === selectedStation).map(
              (div: IDivision) => (
                <BaseOption key={div.id} value={div.id}>
                  {div.name}
                </BaseOption>
              )
            )}
          </BaseSelect>
        </BaseFlexRow>
        <DeviceSearch />
      </FilterContainer>
    </UnitSettingContainer>
  );
};

const UnitSettingContainer = styled(BaseFlex1Column)`
  justify-content: start;
`;

const OptionContainer = styled(BaseFlexColumn)`
  gap: 10px;
  padding: 10px 10px 15px 10px;
  background-color: ${COLORSET_GRID_CONTROL_BG};
  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

const FilterContainer = styled(BaseFlexColumn)`
  gap: 10px;
  padding: 10px 10px 15px 10px;
  background-color: ${COLORSET_GRID_CONTROL_BG};
  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

export default DeviceHeaderSet;