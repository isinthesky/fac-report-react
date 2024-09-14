import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useReactToPrint } from 'react-to-print';
import { BaseInput, BaseFlexCenterDiv, BaseButton, ActiveButton, BaseFlex1Row } from '../../static/componentSet';
import { RootStore } from '../../store/congifureStore';
import { setPrintTitle, setApproves, setPrintFontSize, setViewMode } from "../../features/reducers/settingSlice"; // Assuming similar actions exist
import { BaseFlexColumn, MediumLabel, BaseModalBack, MiniButton } from '../../static/componentSet';
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE, STRING_SETTING_SET_PRINT_TITLE,STRING_SETTING_SET_PRINT_PREVIEW, STRING_SETTING_SET_PRINT_APPROVE, STRING_SETTING_SET_PRINT_FONT_SIZE, STRING_DAILY_MAIN_BTN_PRINT } from '../../static/langSet';
import { update_page_approve } from '../../features/api/page';
import { ApprovalsType } from '../../static/types';
import { COLORSET_ACTIVE_CONTROL_BORDER, COLORSET_SETTING_TAB_BG, COLORSET_SIGNITURE_COLOR } from '../../static/colorSet';
import PrintModal from "../print/PrintModal";

const PrintSetting: React.FC = () => {
  const dispatch = useDispatch();
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSet = useSelector((state: RootStore) => state.tabPageReducer);

  const [title, setTitle] = useState(settingSet.printTitle);  
  const [approvals, setApprovalState] = useState(settingSet.approvals as ApprovalsType[]);
  const [fontSize, setFontSizeState] = useState(settingSet.printFontSize);
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (index: number, value: string) => {
    const newApprovals = approvals.map((approval, idx) => {
      if (idx === index) {
        return { ...approval, text: value };
      }
      return approval;
    });
    setApprovalState(newApprovals);
  };

  const handleCheckboxChange = (index: number) => {
    const newGroups = approvals.map((group, idx) => {
      if (idx === index) {
        return { ...group, checked: group.checked === 1 ? 0 : 1 };
      }
      return group;
    });

    setApprovalState(newGroups as ApprovalsType[]);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleFontSizeChange = (value: string) => {
    setFontSizeState(Number(value));
    dispatch(setPrintFontSize(Number(value)));
  };

  const handlePreview = () => {
    dispatch(setViewMode("print"))
    setIsOpen(true);
  };

  const handlePrintClose = () => {
    dispatch(setViewMode("view"))
    setIsOpen(false);
  };

  const handlePrintFunction = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { size: A4 landscape; }
    body {
      -webkit-print-color-adjust: exact;
    }`,
    documentTitle: settingSet.printTitle + "_" + new Date(settingSet.date).toLocaleDateString("en-CA").replace(/-/g, '')
  });

  const handlePrint = () => {
    handlePrintFunction();
  };

  const handleSave = async (tab_name: string) => {
    dispatch(setPrintTitle(title));

    try {
      await update_page_approve(tab_name, approvals)

    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    // Handle cancel logic
  };

  useEffect(() => {
    dispatch(setApproves(approvals as ApprovalsType[]));
    
    console.log("approvals", approvals, "approvals")

  }, [approvals]);

  return (
    <SettingContainer>
      <ControlContainer gap='30px'>
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
                checked={approval.checked === 1}
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

        <BaseFlexColumn>
          <DescriptLabel>{STRING_SETTING_SET_PRINT_FONT_SIZE}</DescriptLabel>
          <BaseInput
            type="number"
            value={fontSize}
            onChange={(e) => handleFontSizeChange(e.target.value)}
          />
        </BaseFlexColumn>
        
        {isOpen ? 
          <BaseModalBack onClick={handlePrintClose}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <DivHeader>
                <HideBtn></HideBtn>
                <PrintBtn onClick={handlePrint}>{STRING_DAILY_MAIN_BTN_PRINT}</PrintBtn>
                <ExitBtn onClick={handlePrintClose}>x</ExitBtn>
              </DivHeader>
              <PrintModal row={tabPageSet.currentTabPage.tbl_row}
                          column={tabPageSet.currentTabPage.tbl_column} 
                          ref={componentRef} />
            </ModalView>
          </BaseModalBack>
        : null} 

        <ButtonsContainer>
          <BaseButton onClick={handlePreview}>{STRING_SETTING_SET_PRINT_PREVIEW}</BaseButton>
          <BaseButton onClick={handleCancel}>{STRING_DEFAULT_CANCEL}</BaseButton>
          <ActiveButton onClick={() => handleSave(tabPageSet.currentTabPage.name)}>{STRING_DEFAULT_SAVE}</ActiveButton>
        </ButtonsContainer>
      </ControlContainer>
    </SettingContainer>
  );
};

const SettingContainer = styled(BaseFlexCenterDiv)`
  padding: 30px;
  // border: 1px solid ${COLORSET_ACTIVE_CONTROL_BORDER};
`;

const ControlContainer = styled(BaseFlexColumn)`
  padding: 30px;
  background-color: ${COLORSET_SETTING_TAB_BG};
  // border: 1px solid ${COLORSET_ACTIVE_CONTROL_BORDER};
`;

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

const DivHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExitBtn = styled(MiniButton)<{ bgColor?: string }>
(props => ({
  margin: '20px',
  width: '30px',
  height: '30px',
  fontsize: '20',
  color: 'white',
  backgroundColor: props.bgColor || COLORSET_SIGNITURE_COLOR,
  borderRadius: '10px',
}));

const PrintBtn = styled(ActiveButton) `
  margin: 20px;
  border-radius: 10px;
`;


const HideBtn = styled(BaseButton) `
  background-color : transparent;
  border: 0px solid #555;
`;

const ModalView = styled.div.attrs(() => ({
  role: 'dialog',
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 90vw;
  height: 90vh;
  background-color: #ffffff;
`;

export default PrintSetting;