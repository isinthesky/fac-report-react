import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setApproves, setPrintTitle } from '../features/reducers/settingSlice';
import { setUpdateSettingsApprove } from '../features/api';
import { RootStore } from '../store/congifureStore';
import styled from "styled-components";
import { BaseButton, BaseInput, BaseFlex1Column, BaseFlex1Row, BaseLabel, ActiveButton, BaseFlexDiv } from '../static/componentSet';
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE, STRING_SETTING_SET_PRINT_TITLE } from '../static/langSet';

const ApproveSetModal = () => {
  const dispatch = useDispatch();

  const settingSet = useSelector((state: RootStore) => state.settingReducer);

  const [approvals, setApprovals] = useState([
    { checked: false, text: '' },
    { checked: false, text: '' },
    { checked: false, text: '' }
  ]);

  const [print, setTitle] = useState(settingSet.printTitle); // printTitle을 로컬 state로 관리합니다.

  useEffect(() => {
    if (settingSet.savedApprovals.length > 0) {
      setApprovals(settingSet.savedApprovals);
    }
  }, [settingSet.savedApprovals]);

  const handleCheckboxChange = (index: number) => {
    const newGroups = approvals.map((group, idx) => {
      if (idx === index) {
        return { ...group, checked: !group.checked };
      }
      return group;
    });
    setApprovals(newGroups);
  };

  const handlePrintTitleChange = (title: string) => {
    setTitle(title); // printTitle 값을 업데이트합니다.
  };

  const handleInputChange = (index: number, value: string) => {
    const newGroups = approvals.map((group, idx) => {
      if (idx === index) {
        return { ...group, text: value };
      }
      return group;
    });
    setApprovals(newGroups);
  };

  const handleSave = async () => {
    dispatch(setApproves(approvals));
    dispatch(setPrintTitle(print));
    try {
      await setUpdateSettingsApprove(approvals);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
  };

  return (
    <CenterContainer>
      <TitleContainer>
        <TitleLabel>{STRING_SETTING_SET_PRINT_TITLE}</TitleLabel>
        <BaseInput
          type="text"
          value={print}
          onChange={(e) => handlePrintTitleChange(e.target.value)}
        />
      </TitleContainer>
      <ControlContainer>
        {approvals.map((group, index) => (
          <BaseFlex1Row key={index}>
            <BaseInput
              type="checkbox"
              checked={group.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            <InputJobTitle
              type="text"
              value={group.text}
              disabled={!group.checked}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </BaseFlex1Row>
        ))}
      </ControlContainer>
      <ButtonsContainer>
        <ActiveButton onClick={handleSave}>{STRING_DEFAULT_SAVE}</ActiveButton>
        <BaseButton onClick={handleCancel}>{STRING_DEFAULT_CANCEL}</BaseButton>
      </ButtonsContainer>
    </CenterContainer>
  );
};

const CenterContainer = styled(BaseFlexDiv)`
  flex-direction: column;
  gap: 30px;
`

const TitleContainer = styled(BaseFlex1Column)`
  gap: 3px;
`

const TitleLabel = styled(BaseLabel)`
  font-size: 16px;
`

const ButtonsContainer =  styled(BaseFlex1Row)`
  gap: 40px;
  align-content: center;
  justify-content: center; // Add this line to center-align the buttons
`

const InputJobTitle = styled(BaseInput)`
  width: 100px;
`

const ControlContainer = styled(BaseFlex1Row)`
  gap: 20px;
`

export default ApproveSetModal;