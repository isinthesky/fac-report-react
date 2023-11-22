import React, {useEffect, useState} from "react";
import { IDivision, IStation, Unit } from "../../../static/types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BaseFlexRow } from "../../../static/styledComps";

type UnitGroupAutoSelectProps = {
  pos: number;
  devicelist: any;
  initStationId: number;
  initDivisionId: number;
  currentGroup: Unit;
};

const UnitGroupAutoSelect: React.FC<UnitGroupAutoSelectProps> = ({
  pos,
  devicelist,
  initStationId,
  initDivisionId,
  currentGroup
}) => {
  const dispatch = useDispatch();
  const [selectedSt, setSelectedStation] = useState<number>(initStationId);
  const [selectedDiv, setSelectedDivision] = useState<number>(initDivisionId);
  const [selecteddevice, setSelectedDevice] = useState<number>(0);


  useEffect(() => {
    // You can use currentGroup here to set initial state or react to changes
    // For example, if currentGroup has stationId and divisionId, you can set them:
    if (currentGroup) {
      // You might also want to set selecteddevice based on currentGroup
    }
  }, [currentGroup]);


  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
  };

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(Number(e.target.value));
  };

  return (
    <InnerDiv>
      <SelectDivision onChange={handleStationChange} value={selectedSt}>
        {devicelist.stations.map((st: IStation) => (
          <option key={st.id} value={st.id}>
            {st.name}
          </option>
        ))}
      </SelectDivision>
      <SelectDivision onChange={handleDivisionChange} value={selectedDiv}>
        {devicelist.divisions
          .filter((div: IDivision) => div.stationId === selectedSt)
          .map((div: IDivision) => (
            <option key={div.id} value={div.id}>
              {div.name}
            </option>
          ))}
      </SelectDivision> 
      <SelectDevice onChange={handleDeviceChange} value={selecteddevice}>
        {
          Object.values(devicelist.devices).filter((dev:any) =>
              dev.stationId === selectedSt && dev.divisionId === selectedDiv
          ).map((dev:any) => (
            <option key={dev.id} value={dev.id}>
              {dev.name}
            </option>
          ))
          }
      </SelectDevice>
    </InnerDiv>
  );
};


const InnerDiv = styled(BaseFlexRow)`
  justify-content: center;
  align-items: stretch;
  text-align: center;
`;


const SelectDivision = styled.select`
  min-width: 70px;
  text-align: center;
`

const SelectDevice = styled.select`
  flex: 1;
  min-width: 200px;
  text-align: center;

`

export default UnitGroupAutoSelect;
