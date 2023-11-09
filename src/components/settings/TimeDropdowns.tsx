import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDropdown, removeDropdown, setTimes } from "../../features/reducers/optionSlice";
import { optionState } from '../../static/interface';
import styled from "styled-components";


const TimeDropdowns: React.FC = () => {
  const dispatch = useDispatch();

  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  const mainTab = optionlist.selectedTab.main;
  const subTab = optionlist.selectedTab.sub;

  const handleAddDropdown = () => {
    dispatch(addDropdown({ mainTab :mainTab, subTab: subTab}));
  };

  const handleRemoveDropdown = (index:number) => {
    dispatch(removeDropdown({mainTab:mainTab, subTab:subTab, index:index}));
  };

  const handleTimeChange = (index:number, e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTimes({mainTab:mainTab, subTab:subTab, index:index, time:e.target.value}));
  };
  
  const key = process.env.REACT_APP_CONST_TABINFO_NAME;

  return (
    <Container>
      {optionlist[key + `${mainTab}${subTab}`].times.map((time:number, index:number) => (
        <SelectDiv key={index}>
          <TimeSelect value={time} onChange={(e) => handleTimeChange(index, e)}>
            {Array.from({ length: 24 }).map((_, hour) => {
              const timeValue = String(hour).padStart(2, '0') + ':00';
              return <option key={timeValue} value={timeValue}>{timeValue}</option>;
            })}
          </TimeSelect>
          {optionlist[key + `${mainTab}${subTab}`].times.length > 4 
          ? <button onClick={() => handleRemoveDropdown(index)}>Del</button> 
          : null}
          
        </SelectDiv>
      ))}
       {optionlist[key + `${mainTab}${subTab}`].times.length < 12 
       ? <SettingButton onClick={handleAddDropdown}>Add Time</SettingButton>
       : null}
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  justify-content: end;
  flex-direction: column;
  width: 180px;
  padding: 10px 100px;
`;

const SelectDiv = styled.div`
`;

const TimeSelect = styled.select`
  margin: 5px;
  padding: 5px;
  min-width: 80px;
`;

const SettingButton = styled.button`
  padding: 5px;
`;

export default TimeDropdowns;