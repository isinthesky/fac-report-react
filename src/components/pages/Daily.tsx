import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setTableDate, setViewType } from "../../features/reducers/settingSlice";
import { useReactToPrint } from 'react-to-print';
import ReportGuide from "../viewer/ReportGuide";
import PrintModal from "../PrintModal";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RootStore } from "../../store/congifureStore";
import { ActiveButton, BaseButton, MediumLabel, BaseFlex1Column, BaseFlexColumn, BaseFlexDiv, BaseFlexRow, BaseModalBack, MiniButton } from "../../static/componentSet";
import { STRING_DAILY_MAIN_BTN_IDCHECK, STRING_DAILY_MAIN_BTN_PRINT, STRING_DAILY_MAIN_SELECT_DATE } from "../../static/langSet";
import { COLORSET_BACKGROUND_COLOR, COLORSET_SIGNITURE_COLOR } from "../../static/colorSet";
import Header from "../header/Header";

function Daily() {
  const dispatch = useDispatch();
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const [date, setDate] = useState(settingSet.date);
  const [isOpen, setIsOpen] = useState(false);
  const { id1, id2 } = useParams();
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setTableDate(date));
  }, [date, dispatch]);

  // Call useReactToPrint at the top level and store the returned function
  const handlePrintFunction = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleOpenPrint = () => {
    setIsOpen(true);
  };

  const handleIdCheck = async () => {
    dispatch(setViewType(settingSet.idViewMode === 0 ? 1 : 0));
  };

  const handlePrintClose = () => {
    setIsOpen(false);
  };

  // Use the stored function inside handlePrint
  const handlePrint = () => {
    if (window.confirm("Do you want to proceed with printing?")) {
      handlePrintFunction();
    }
  };

  return (
    <Flat>
      <Header mainTab={Number(id1 ? id1 : "1")} />
      <Title>일일 보고</Title>
      <ControlContainer>
        <BaseFlexDiv>
          <DateLabel>{STRING_DAILY_MAIN_SELECT_DATE}</DateLabel>
        </BaseFlexDiv>
        <Controls>
          <BaseFlexDiv>
            <DatePicker
              selected={new Date(date)}
              onChange={(value: Date) => setDate(value.getTime())}
            />
          </BaseFlexDiv>
          <ButtonControls>
            <BaseButton onClick={handleIdCheck}>{STRING_DAILY_MAIN_BTN_IDCHECK}</BaseButton>
            <ActiveButton onClick={handleOpenPrint}>{STRING_DAILY_MAIN_BTN_PRINT}</ActiveButton>
          </ButtonControls>
      </Controls>
      </ControlContainer>
      <ReportLine>
        <ReportGuide
          row={settingSet.daily.row}
          column={settingSet.daily.column}
        ></ReportGuide>
      </ReportLine>
      {isOpen ? 
        <BaseModalBack onClick={handlePrintClose}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <DivHeader>
              <HideBtn></HideBtn>
              <PrintBtn onClick={handlePrint}>{STRING_DAILY_MAIN_BTN_PRINT}</PrintBtn>
              <ExitBtn onClick={handlePrintClose}>x</ExitBtn>
            </DivHeader>
            <PrintModal row={settingSet.daily.row}
                        column={settingSet.daily.column}
                        mainTab={Number(id1 ? id1 : "1")}
                        subTab={Number(id2 ? id2 : "1")}
                        ref={componentRef} />
          </ModalView>
        </BaseModalBack>
      : null} 
    </Flat>
  );
}

// Styled components remain unchanged

const Flat = styled(BaseFlex1Column)`
  background-color: ${COLORSET_BACKGROUND_COLOR};
`;


const Title = styled(BaseFlexDiv)`
  justify-content: start;

  margin: 15px 10px 0px 20px;
  gap: 5px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: ${COLORSET_BACKGROUND_COLOR};
`;

const DateLabel = styled(MediumLabel)`
`;

const DivHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`;

const ControlContainer = styled(BaseFlexColumn)`
  justify-content: center;
  gap: 5px;
  margin: 20px 20px 0px 20px;
`;


const Controls = styled(BaseFlexRow)`
  justify-content: space-between;
  align-items: center;
`;

const ButtonControls = styled(BaseFlexRow)`
  justify-content: end;
`;

const ReportLine = styled(BaseFlex1Column)`
  justify-content: start;

  margin: 0px 20px;
  gap: 10px;
`;


const ExitBtn = styled(MiniButton)<{ bgColor?: string }>`
  margin: 20px;
  width: 30px;
  height: 30px;

  font-size: 20px;

  color: white;
  background-color: ${(props) => props.bgColor || COLORSET_SIGNITURE_COLOR};
  border-radius: 10px;
`;

  const PrintBtn = styled(ActiveButton) `
  margin: 20px;
  border-radius: 10px;
`;

const HideBtn = styled(BaseButton) `
  background-color : white;
  border: 0px solid #555;
`;

const ModalView = styled.div.attrs((props) => ({
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

export default Daily;
