import React, {useEffect, useState} from "react";
import { IDevice, IDivision, IStation, Unit } from "../../../static/types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BaseFlex1Row, BaseOption, BaseSelect } from "../../../static/componentSet";
import { setCurrentUnitDevice } from "../../../features/reducers/tabPageSlice";
import { updateCurrentGroup } from "../../../features/reducers/unitGroupSlice";
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/congifureStore";
import { DeviceState } from "../../../features/reducers/deviceSlice";

type UnitGroupAutoSelectProps = {
  pos: number;
  devicelist: DeviceState;
};

const UnitGroupAutoSelect: React.FC<UnitGroupAutoSelectProps> = ({
  pos,
  devicelist
}) => {
  const dispatch = useDispatch();

  const unitGroupSlice = useSelector((state: RootStore) => state.unitGroupReducer);

  const [selectedSt, setSelectedStation] = useState<number>(unitGroupSlice.currentGroup.st);
  const [selectedDiv, setSelectedDivision] = useState<number>(unitGroupSlice.currentGroup.div);
  const [selecteddevice, setSelectedDevice] = useState<number>(unitGroupSlice.currentGroup.dvList[pos]);
  const [device, setDevice] = useState<IDevice>(
    {id: 0,
    xmlId: "",
    name: "",
    pathId: 0,
    type: 0,
    stationId: 0,
    divisionId: 0});
  const searchWord = useSelector((state: RootStore) => state.settingReducer.deviceSearchWord);


  useEffect(() => {
    // You can use currentGroup here to set initial state or react to changes
    // For example, if currentGroup has stationId and divisionId, you can set them:
    if (unitGroupSlice.currentGroup) {
      if (unitGroupSlice.currentGroup.dvList[pos] > 0) {

        setDevice(devicelist.devices[unitGroupSlice.currentGroup.dvList[pos]])
        setSelectedStation(devicelist.devices[unitGroupSlice.currentGroup.dvList[pos]].stationId);
        
        setSelectedDivision(devicelist.devices[unitGroupSlice.currentGroup.dvList[pos]].divisionId);

        setSelectedDevice(devicelist.devices[unitGroupSlice.currentGroup.dvList[pos]].id);
      }
      else{
        setSelectedStation(unitGroupSlice.currentGroup.st);
        setSelectedDivision(unitGroupSlice.currentGroup.div);
        setSelectedDevice(0);
      }
    }
  }, [unitGroupSlice.currentGroup, pos]);


  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
  };

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDeviceId = Number(e.target.value);

    dispatch(setCurrentUnitDevice({unitPosition : 0 , devicePosition: pos, deviceId: newDeviceId }));
  };
  
  console.log("selecteddevice", selecteddevice)
  
  return (
    <InnerDiv>
      <SelectDivision onChange={handleStationChange} value={selectedSt}>
        {devicelist.stations.map((st: IStation) => (
          <BaseOption key={st.id} value={st.id}>
            {st.name}
          </BaseOption>
        ))}
      </SelectDivision>
      <SelectDivision onChange={handleDivisionChange} value={selectedDiv}>
        {
          (selectedDiv > 0) ? ( 
            devicelist.divisions.filter((div: IDivision) => div.id === selectedDiv)
            .map((div: IDivision) => (
              <BaseOption key={div.id} value={div.id}>
                {div.name}
              </BaseOption>)
            )) : ( 
              devicelist.divisions.filter((div: IDivision) => div.stationId === selectedSt)
              .map((div: IDivision) => (
                <BaseOption key={div.id} value={div.id}>
                  {div.name}
                </BaseOption>)
            ))
        }
      </SelectDivision> 
      <SelectDevice onChange={handleDeviceChange} value={selecteddevice}>
        {
            Object.values(devicelist.devices).filter((dev:IDevice) => {
              if (dev.stationId === selectedSt && dev.divisionId === selectedDiv) {
                if (searchWord.length > 0) {
                  return dev.name.toLowerCase().includes(searchWord.toLowerCase()) 
                          ? true 
                          : false;
                }
                return true;
              }
              return false;
            }).map((dev:any) => (
              <BaseOption key={dev.id} value={dev.id}>
                {dev.name}
              </BaseOption>
            ))
        }
     
      </SelectDevice>
    </InnerDiv>
  );
};


const InnerDiv = styled(BaseFlex1Row)`
  justify-content: center;
  align-items: stretch;
  text-align: center;
`;


const SelectDivision = styled(BaseSelect)`
  min-width: 70px;
  text-align: center;
`

const SelectDevice = styled(BaseSelect)`
  flex: 1;
  min-width: 200px;
  text-align: center;
`

export default UnitGroupAutoSelect;
