import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDropdown, removeDropdown, setTimes } from "../../features/reducers/tabPageSlice";
import styled from "styled-components";
import { RootStore } from '../../store/congifureStore';
import { STRING_SETTING_SET_TIME_ADD, STRING_SETTING_SET_TIME_DELETE } from '../../static/consts';


const TimeDropdowns: React.FC = () => {
  const dispatch = useDispatch();

  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSet = useSelector((state : RootStore) => state.tabPageReducer);

  const mainTab = settingSet.selectedTab.main;
  const subTab = settingSet.selectedTab.sub;

  const handleAddDropdown = () => {
    dispatch(addDropdown({ mainTab :mainTab, subTab: subTab}));
  };

  const handleRemoveDropdown = (index:number) => {
    dispatch(removeDropdown({mainTab:mainTab, subTab:subTab, index:index}));
  };

  const handleTimeChange = (index:number, e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTimes({mainTab:mainTab, subTab:subTab, index:index, time:e.target.value}));
  };
  
  const key = process.env.REACT_APP_CONST_TABINFO_NAME || "tabPageInfo";

  return (
    <Container>
      {tabPageSet[key + `${mainTab}${subTab}`]?.times.map((time:string, index:number) => (
        <SelectDiv key={index}>
          <TimeSelect value={time} onChange={(e) => handleTimeChange(index, e)}>
            {Array.from({ length: 24 }).map((_, hour) => {
              const timeValue = String(hour).padStart(2, '0') + ':00';
              return <option key={timeValue} value={timeValue}>{timeValue}</option>;
            })}
          </TimeSelect>
          {tabPageSet[key + `${mainTab}${subTab}`]?.times.length > 4 
          ? <button onClick={() => handleRemoveDropdown(index)}>{STRING_SETTING_SET_TIME_DELETE}</button> 
          : null}
          
        </SelectDiv>
      ))}
       {tabPageSet[key + `${mainTab}${subTab}`]?.times.length < 12 
       ? <SettingButton onClick={handleAddDropdown}>{STRING_SETTING_SET_TIME_ADD}</SettingButton>
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