import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BaseInput, BaseFlexCenterDiv, BaseButton, ActiveButton, BaseFlex1Row } from '../../static/componentSet';
import { RootStore } from '../../store/congifureStore';
import { setPrintTitle, setApproves } from "../../features/reducers/settingSlice"; // Assuming similar actions exist
import { BaseFlexColumn, MediumLabel } from '../../static/componentSet';
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE, STRING_SETTING_SET_PRINT_TITLE, STRING_SETTING_SET_PRINT_APPROVE } from '../../static/langSet';
import { setUpdateSettingsApprove, updateSettings } from '../../features/api';

const PrintSetting: React.FC = () => {
  const dispatch = useDispatch();
  
  
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const [title, setTitle] = useState(settingSet.printTitle);
  
  const [approvals, setApprovals] = useState(settingSet.approvals);

  const handleInputChange = (index: number, value: string) => {
    const newApprovals = approvals.map((approval, idx) => {
      if (idx === index) {
        return { ...approval, text: value };
      }
      return approval;
    });
    setApprovals(newApprovals);
  };

  const handleCheckboxChange = (index: number) => {
    const newGroups = approvals.map((group, idx) => {
      if (idx === index) {
        return { ...group, checked: !group.checked };
      }
      return group;
    });
    setApprovals(newGroups);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleSave = async () => {
    dispatch(setApproves(approvals));
    dispatch(setPrintTitle(title));

    try {
      await setUpdateSettingsApprove(approvals)
      await updateSettings("printTitle", title)
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    // Handle cancel logic
  };

  return (
    <SettingContainer>
      <BaseFlexColumn>
        <BaseFlexColumn>
          <DescriptLabel>{STRING_SETTING_SET_PRINT_TITLE}</DescriptLabel>
          <BaseInput
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
        </BaseFlexColumn>

      <BaseFlex1Row>
        {approvals.map((approval, index) => (
          <BaseFlexColumn key={index}>
            <DescriptLabel>{STRING_SETTING_SET_PRINT_APPROVE}{"-"}{index + 1}</DescriptLabel>
            <BaseFlex1Row>
              <BaseInput
                type="checkbox"
                checked={approval.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              <BaseInput
                type="text"
                value={approval.text}
                disabled={!approval.checked}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </BaseFlex1Row>
          </BaseFlexColumn>
        ))}
        </BaseFlex1Row>

        <ButtonsContainer>
          <BaseButton onClick={handleCancel}>{STRING_DEFAULT_CANCEL}</BaseButton>
          <ActiveButton onClick={handleSave}>{STRING_DEFAULT_SAVE}</ActiveButton>
        </ButtonsContainer>
      </BaseFlexColumn>
    </SettingContainer>
  );
};

const SettingContainer = styled(BaseFlexCenterDiv)``;

const ButtonsContainer = styled(BaseFlexCenterDiv)`
  flex-wrap: wrap;
  padding: 10px;
  gap: 50px;
`;

const DescriptLabel = styled(MediumLabel)`
  display: flex;  
  align-items: flex-start;
  text-align: left;
  vertical-align: baseline;
`;

export default PrintSetting;