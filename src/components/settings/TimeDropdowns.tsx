import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDropdown, removeDropdown, setTimes } from "../../features/reducers/optionSlice";
import { AddDropDownType } from '../../static/types';
import { optionState } from '../../static/interface';
import styled from "styled-components";


const TimeDropdowns: React.FC<AddDropDownType> = ({mainTab, subTab}) => {
  const dispatch = useDispatch();

  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  const handleAddDropdown = () => {
    dispatch(addDropdown({ mainTab :mainTab, subTab: subTab}));
  };

  const handleRemoveDropdown = (index:number) => {
    dispatch(removeDropdown({mainTab:mainTab, subTab:subTab, index:index}));
  };

  const handleTimeChange = (index:number, e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTimes({mainTab:mainTab, subTab:subTab, index:index, time:e.target.value}));
  };

  const key = `tab${mainTab}${subTab}`;

  console.log("time #",key, optionlist[`tab${mainTab}${subTab}`], optionlist.tap11)

  return (
    <Container>
      {optionlist[`tab${mainTab}${subTab}`].map((time:number, index:number) => (
        <SelectDiv key={index}>
          <TimeSelect value={time} onChange={(e) => handleTimeChange(index, e)}>
            {Array.from({ length: 24 }).map((_, hour) => {
              const timeValue = String(hour).padStart(2, '0') + ':00';
              return <option key={timeValue} value={timeValue}>{timeValue}</option>;
            })}
          </TimeSelect>
          {optionlist[`tab${mainTab}${subTab}`].length > 4 
          ? <button onClick={() => handleRemoveDropdown(index)}>Remove</button> 
          : null}
          
        </SelectDiv>
      ))}
       {optionlist[`tab${mainTab}${subTab}`].length < 12 
       ? <button onClick={handleAddDropdown}>Add Time</button>
       : null}
    </Container>
  );
};


const Container = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`;

const SelectDiv = styled.div`
`;

const TimeSelect = styled.select`
  margin: 0px 10px;
  min-width: 80px;
`;

export default TimeDropdowns;