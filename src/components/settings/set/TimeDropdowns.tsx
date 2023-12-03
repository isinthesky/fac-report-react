import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDropdown, removeDropdown, setTimes } from "../../../features/reducers/tabPageSlice";
import styled from "styled-components";
import { RootStore } from '../../../store/congifureStore';
import { STRING_SETTING_SET_TIME_ADD, STRING_SETTING_SET_TIME_DELETE } from '../../../static/langSet';
import { TabPageInfotype } from '../../../static/types';
import { BaseButton, BaseFlex1Row, BaseFlexDiv, BaseOption, BaseSelect, MiniButton } from '../../../static/componentSet';
import { ICON_DAY_DELETE } from '../../../static/constSet';

const TimeDropdowns: React.FC = () => {
  const dispatch = useDispatch();

  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSlice = useSelector((state : RootStore) => state.tabPageReducer);

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

  const tabPageInfo = tabPageSlice[tabkey] as TabPageInfotype;

  return (
    <Container>
      {tabPageInfo.times.map((time:string, index:number) => (
        <SelectDiv key={index}>
          <TimeSelect value={time} onChange={(e) => handleTimeChange(index, e)}>
            {Array.from({ length: 24 }).map((_, hour) => {
              const timeValue = String(hour).padStart(2, '0') + ':00';
              return <BaseOption key={timeValue} value={timeValue}>{timeValue}</BaseOption>;
            })}
          </TimeSelect>
          {tabPageInfo.times.length > 4 
          ? <MiniButton onClick={() => handleRemoveDropdown(index)}>  <img src={ICON_DAY_DELETE} alt="Delete" /></MiniButton> 
          : null}
          
        </SelectDiv>
      ))}
       {tabPageInfo.times.length < 12 
       ? <SettingButton onClick={handleAddDropdown}>{STRING_SETTING_SET_TIME_ADD}</SettingButton>
       : null}
    </Container>
  );
};


const Container = styled(BaseFlexDiv)`
  justify-content: end;
  flex-direction: column;
  

  width: 110px;

  margin-top: auto;

  


  padding: 0px 20px;
`;

const SelectDiv = styled(BaseFlex1Row)`
  display: flex;
  flex-direction: row;
  
  margin-top: auto;
`;

const TimeSelect = styled(BaseSelect)`
  width: 100%
`;

const SettingButton = styled(BaseButton)`
  width: 100%
`;

export default TimeDropdowns;