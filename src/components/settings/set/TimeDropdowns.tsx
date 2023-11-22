import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDropdown, removeDropdown, setTimes } from "../../../features/reducers/tabPageSlice";
import styled from "styled-components";
import { RootStore } from '../../../store/congifureStore';
import { STRING_SETTING_SET_TIME_ADD, STRING_SETTING_SET_TIME_DELETE } from '../../../static/consts';
import { TabPageInfotype } from '../../../static/types';
import { BaseSelect, MiniButton } from '../../../static/styledComps';


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


  const key = process.env.REACT_APP_CONST_TABINFO_NAME || "tabPageInfo"
  const tabkey = `${key}${mainTab}${subTab}`;

  const tabPageInfo = tabPageSet[tabkey] as TabPageInfotype;


  return (
    <Container>
      {tabPageInfo.times.map((time:string, index:number) => (
        <SelectDiv key={index}>
          <TimeSelect value={time} onChange={(e) => handleTimeChange(index, e)}>
            {Array.from({ length: 24 }).map((_, hour) => {
              const timeValue = String(hour).padStart(2, '0') + ':00';
              return <option key={timeValue} value={timeValue}>{timeValue}</option>;
            })}
          </TimeSelect>
          {tabPageInfo.times.length > 4 
          ? <MiniButton onClick={() => handleRemoveDropdown(index)}>{STRING_SETTING_SET_TIME_DELETE}</MiniButton> 
          : null}
          
        </SelectDiv>
      ))}
       {tabPageInfo.times.length < 12 
       ? <SettingButton onClick={handleAddDropdown}>{STRING_SETTING_SET_TIME_ADD}</SettingButton>
       : null}
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  justify-content: end;
  flex-direction: column;
  width: 130px;
  padding: 0px 20px;

  gap: 9px;

  border: 1px solid #111;
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const TimeSelect = styled(BaseSelect)`
  width: 100%
`;

const SettingButton = styled.button`
  padding: 5px;
`;

export default TimeDropdowns;