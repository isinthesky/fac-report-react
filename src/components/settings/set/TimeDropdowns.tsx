import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDropdown, removeDropdown, setTimes } from "../../../features/reducers/tabPageSlice";
import styled from "styled-components";
import { RootStore } from '../../../store/congifureStore';
import { STRING_SETTING_SET_TIME_ADD } from '../../../static/langSet';
import { BaseButton, BaseFlex1Column, BaseFlex1Row, BaseFlexDiv, BaseOption, BaseSelect, MiniButton } from '../../../static/componentSet';
import { ICON_DAY_DELETE } from '../../../static/constSet';
import { COLORSET_DARK_CONTROL_BG, COLORSET_GRID_CONTROL_BG, COLORSET_GRID_CONTROL_BORDER } from '../../../static/colorSet';
import { COLORSET_DARK_CONTROL_FONT } from '../../../static/colorSet';

const TimeDropdowns: React.FC = () => {
  const dispatch = useDispatch();
  const tabPageSlice = useSelector((state : RootStore) => state.tabPageReducer);

  const handleAddDropdown = () => {
    dispatch(addDropdown());
  };

  const handleRemoveDropdown = (index:number) => {
    dispatch(removeDropdown({index:index}));
  };

  const handleTimeChange = (index:number, e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTimes({index:index, time:e.target.value}));
  };

  const tabPageInfo = tabPageSlice.currentTabPage;

  return (
    <TimeSettingContainer>
      <BottomDiv>
        {tabPageInfo.times.map((time:string, index:number) => (
          <SelectDiv key={index}>
            <TimeSelect value={time} onChange={(e) => handleTimeChange(index, e)}>
              {Array.from({ length: 24 }).map((_, hour) => {
                const timeValue = String(hour).padStart(2, '0') + ':00';
                return <BaseOption key={timeValue} value={timeValue}>{timeValue}</BaseOption>;
              })}
            </TimeSelect>
            {tabPageInfo.times.length > 4 
            ? <DeleteTimeButton onClick={() => handleRemoveDropdown(index)}>  <img src={ICON_DAY_DELETE} width={15} height={15} alt="Delete" /></DeleteTimeButton> 
            : null}
            
          </SelectDiv>
        ))}
        {tabPageInfo.times.length < 12 
        ? <SettingButton onClick={handleAddDropdown}>{STRING_SETTING_SET_TIME_ADD}</SettingButton>
        : null}
      </BottomDiv>
    </TimeSettingContainer>
  );
};

const TimeSettingContainer = styled(BaseFlexDiv)`
  width: 110px;
  
  background-color: ${COLORSET_GRID_CONTROL_BG};
  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

const BottomDiv = styled(BaseFlex1Column)`
  margin-top: auto;
  padding: 10px;

  background-color: ${COLORSET_GRID_CONTROL_BG};
`;

const SelectDiv = styled(BaseFlex1Row)`
  justify-content: space-between;
  margin-top: auto;
  gap: 5px;

  background-color: ${COLORSET_DARK_CONTROL_BG};
`;

const TimeSelect = styled(BaseSelect)`
  padding: 3px;
  
  color: ${COLORSET_DARK_CONTROL_FONT};
  background-color: ${COLORSET_DARK_CONTROL_BG};
`;

const DeleteTimeButton = styled(MiniButton)`
  width:  25px;
  height: 25px;
`;

const SettingButton = styled(BaseButton)`
  width: 90px;
`;

export default TimeDropdowns;
