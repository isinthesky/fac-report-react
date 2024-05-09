import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setApproves, setReportTable, setTabSetting, setTableDate, setViewType } from "../../features/reducers/settingSlice";
import { useReactToPrint } from 'react-to-print';
import ReportGuide from "../viewer/ReportGuide";
import PrintModal from "../PrintModal";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RootStore } from "../../store/congifureStore";
import { ActiveButton, BaseButton, MediumLabel, BaseFlex1Column, BaseFlexColumn, BaseFlexDiv, BaseFlexRow, BaseModalBack, MiniButton } from "../../static/componentSet";
import { STRING_DAILY_MAIN_BTN_PRINT, STRING_DAILY_MAIN_SELECT_DATE, STRING_DAILY_MAIN_TITLE } from "../../static/langSet";
import { COLORSET_BACKGROUND_COLOR, COLORSET_SIGNITURE_COLOR } from "../../static/colorSet";
import Header from "../header/Header";
import { getDeviceInfo } from "../../features/api/device";
import { loadDeviceList } from "../../features/reducers/deviceSlice";
import { getSettings } from "../../features/api";
import { CONST_TABINFO_NAME } from "../../env";
import { setTabPage, setViewSelect } from "../../features/reducers/tabPageSlice";

function Daily() {
  const dispatch = useDispatch();
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const [date, setDate] = useState(settingSet.date);
  const [isOpen, setIsOpen] = useState(false);
  const { id1, id2 } = useParams();
  const componentRef = useRef<HTMLDivElement>(null);

  const handleIdCheck = useCallback(() => {
    dispatch(setViewType(settingSet.idViewMode === 0 ? 1 : 0));
  }, [dispatch, settingSet.idViewMode]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        handleIdCheck();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleIdCheck]);

  useEffect(() => {
    (async () => {
      const response = await getSettings();
  
      if (response) {
        dispatch(setReportTable(response.settings));
        dispatch(setTabSetting(response.tabSetting));
        dispatch(setApproves(response.approves))

        let count = 1;
        const keyName = CONST_TABINFO_NAME;

        if (response.tabSetting.length) {
          [1, 2, 3, 4, 5].forEach((mainId)=>{
            [1, 2, 3, 4, 5].forEach((subId)=>{
              const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
              if (process.env[key]) {
                dispatch(setTabPage({mainTab: mainId, subTab: subId, 
                                     object: response[keyName + `${count++}`]}));
              }
            })
          })
        }
      }

      const resDeviceSet = await getDeviceInfo();
      dispatch(loadDeviceList(resDeviceSet));
      dispatch(setViewSelect({mainTab: Number(id1), subTab: Number(id2)}));
    })();
  }, []);

  useEffect(() => {
    dispatch(setTableDate(date));
  }, [date, dispatch]);

  // Call useReactToPrint at the top level and store the returned function
  const handlePrintFunction = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { size: A4 landscape; }`,
    documentTitle: settingSet.printTitle + "_" + new Date(date).toLocaleDateString("en-CA").replace(/-/g, '')
  });

  const handleOpenPrint = () => {
    setIsOpen(true);
  };

  const handlePrintClose = () => {
    setIsOpen(false);
  };

  const handlePrint = () => {
    handlePrintFunction();
  };

  return (
    <Flat>
      <Header mainTab={Number(id1 ? id1 : "1")} />
      <Title>{STRING_DAILY_MAIN_TITLE}</Title>
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
            <ActiveButton onClick={handleOpenPrint}>{STRING_DAILY_MAIN_BTN_PRINT}</ActiveButton>
          </ButtonControls>
      </Controls>
      </ControlContainer>
      <ReportLine>
        <ReportGuide row={settingSet.daily.row} column={settingSet.daily.column} />
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
                        ref={componentRef} />
          </ModalView>
        </BaseModalBack>
      : null} 
    </Flat>
  );
}

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExitBtn = styled(MiniButton)<{ bgColor?: string }>(props => ({
  margin: '20px',
  width: '30px',
  height: '30px',
  fontSize: '20px',
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

export default Daily;
