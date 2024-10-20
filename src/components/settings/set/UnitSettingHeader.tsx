
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { updateCurrentUnit, updateCurrentTableUserData } from "../../../features/reducers/tabPageSlice";
import { RootStore } from "../../../store/congifureStore";
import { BaseInput, BaseSelect, BaseOption, BaseFlex1Column,BaseFlexRow, MediumLabel, BaseFlexColumn, } from "../../../static/componentSet";
import { IDivision, IStation } from "../../../static/types";
import { CONST_TYPE_INFO, TypeInfo } from "../../../env";
import { COLORSET_GRID_CONTROL_BG, COLORSET_GRID_CONTROL_BORDER } from "../../../static/colorSet";
import DeviceSearch from "./DeviceSearch";
import { STRING_SETTING_DEVICE_FILTER, STRING_SETTING_DEVICE_NAME_SETTING, STRING_SETTING_DEVICE_TYPE_SELECT } from "../../../static/langSet";

const DeviceHeaderSet = () => {
  const dispatch = useDispatch();
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const [deviceType, setDeviceType] = useState(tabPageSlice.currentTabPage?.tables[tabPageSlice.unitPosition.index].type);
  const [selectedStation, setSelectedStation] = useState<number>(tabPageSlice.currentTabPage?.tables[tabPageSlice.unitPosition.index].search_st || 0);
  const [selectedDivision, setSelectedDivision] = useState<number>(0);
  const [deviceName, setDeviceName] = useState<string>("");

  useEffect(() => {
    if (!tabPageSlice.currentTabPage) {
      return;
    }

    const currentUnit = tabPageSlice.currentTabPage.tables[tabPageSlice.unitPosition.index]

    if (currentUnit?.type === 0) {
      setDeviceType(1);
      dispatch(updateCurrentUnit({arrPos:tabPageSlice.unitPosition.index,
          arrKey:"type",
          deviceId: 1
      }));
    }

    if (currentUnit?.search_st === 0) {
      setSelectedStation(deviceSet.stations[0].id);
      dispatch(
        updateCurrentUnit({
          arrPos: tabPageSlice.unitPosition.index,
          arrKey: "search_st",
          deviceId: deviceSet.stations[0].id,
        })
      );
    }

    setDeviceName(currentUnit.name);
    setDeviceType(currentUnit.type);
  }, [tabPageSlice.unitPosition]);

  useEffect(() => {
    if (!selectedStation) 
      return;

    setSelectedDivision(deviceSet.divisions.filter((item) => item.station_id === selectedStation)[0].id);
    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "search_div",
        deviceId: deviceSet.divisions.filter((item) => item.station_id === selectedStation)[0].id,
      })
    );
  }, [selectedStation]);


  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = Number(e.target.value);
    setDeviceType(newType);
    dispatch(updateCurrentUnit({
      arrPos:tabPageSlice.unitPosition.index,
      arrKey:"type",
      deviceId: newType
    }));
    
    const typeInfo = CONST_TYPE_INFO.find(info => info.index === newType);
    const maxDevice = typeInfo?.maxDevice || 0;

    dispatch(updateCurrentUnit({
      arrPos:tabPageSlice.unitPosition.index,
      arrKey:"max_device",
      deviceId: maxDevice
    }));

    if (!tabPageSlice.currentTabPage) {
      return;
    }

    const currentUnit = tabPageSlice.currentTabPage.tables[tabPageSlice.unitPosition.index];
    
    if (newType >= 1001 && newType <= 1999) {
      tabPageSlice.currentTabPage?.user_tables.find((item, index) => {
        if (item.idx === currentUnit.idx) {
          if (item.type === 1001) {

            dispatch(updateCurrentTableUserData({
              arrPos:index,
              key:"user_data",
              value: {"1":["E","E","E","E"],"2":["E","E","E","E"],"3":["E","E","E","E"],"4":["E","E","E","E"],"5":["E","E","E","E"],"6":["E","E"]}
            }));
          }
    
          if (item.type === 1002) {
            dispatch(updateCurrentTableUserData({
              arrPos:index,
              key:"user_data",
              value: {"1":["E","E"],"2":["E","E"],"3":["E","E"],"4":["E"],"5": ["E","E"],"6":["E","E"],"7":["E","E"],"8":["E","E"]}
            }));
          }
        }
      });
    }
  };

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "search_st",
        deviceId: Number(e.target.value),
      })
    );
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "search_div",
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
          {CONST_TYPE_INFO.map((item) => (
            <BaseOption key={item.index} value={item.index}>
              {item.name}
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