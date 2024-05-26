import { useEffect, useState, useRef, useCallback, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setApproves, setMenus, setReportTable, setTabSetting, setTableDate, setViewType } from "../../features/reducers/settingSlice";
import { useReactToPrint } from 'react-to-print';
import ReportGuide from "../viewer/ReportGuide";
import PrintModal from "../PrintModal";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RootStore } from "../../store/congifureStore";
import { ActiveButton, BaseButton, BaseFlex1Column, BaseFlexColumn, BaseFlexDiv, BaseFlexRow, BaseModalBack, MiniButton, BaseFlexCenterDiv } from "../../static/componentSet";
import { STRING_DAILY_MAIN_BTN_PRINT, STRING_DAILY_MAIN_SELECT_DATE, STRING_DAILY_MAIN_TITLE } from "../../static/langSet";
import { COLORSET_BACKGROUND_COLOR, COLORSET_SIGNITURE_COLOR } from "../../static/colorSet";
import Header from "../header/Header";
import { getDeviceInfo } from "../../features/api/device";
import { loadDeviceList } from "../../features/reducers/deviceSlice";
import { getSettings } from "../../features/api";
import { CONST_TABINFO_NAME, INIT_TAB_COUNT } from "../../env";
import { setTabPage, setViewSelect } from "../../features/reducers/tabPageSlice";

interface CustomInputProps {
  value: string;
  onClick: () => void;
}

function Daily() {
  const dispatch = useDispatch();
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const [date, setDate] = useState(settingSet.date);
  const [isOpen, setIsOpen] = useState(false);
  const { id1, id2 } = useParams();
  const componentRef = useRef<HTMLDivElement>(null);

  const ExampleCustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(({ value, onClick }, ref: any) => (
    <CalendarButton onClick={onClick} ref={ref}>
      {value}
    </CalendarButton>
  ));

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
        dispatch(setApproves(response.approves))
        dispatch(setTabSetting({length: Number(INIT_TAB_COUNT)}));

        let count = 1;
        const keyName = CONST_TABINFO_NAME;
        const buttons: string[] = [];

        if (Number(INIT_TAB_COUNT) >= count) {
          [1, 2, 3, 4, 5].forEach((mainId)=>{
            [1, 2, 3, 4, 5].forEach((subId)=>{
              const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
              if (process.env[key]) {
                buttons.push(`${mainId}${subId}`);
                dispatch(setTabPage({mainTab: mainId, subTab: subId, 
                                     object: response[keyName + `${count++}`]}));
              }
            })
          })
        }
        
        dispatch(setMenus(buttons));
      }

      const resDeviceSet = await getDeviceInfo();
      dispatch(loadDeviceList(resDeviceSet));
      dispatch(setViewSelect({mainTab: Number(id1), subTab: Number(id2)}));
    })();
  }, []);

  useEffect(() => {

    console.log("changed date", date);
    dispatch(setTableDate(date));
  }, [date, dispatch]);

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
        <Controls>
          <CalendarContainer1>
            <DateLabel>{STRING_DAILY_MAIN_SELECT_DATE}</DateLabel>
            <BaseFlexDiv>
              <DatePicker
                selected={new Date(date)}
                onChange={(value: Date) => setDate(value.getTime())}
                showIcon={true}
                dateFormatCalendar="YYYY MM"
                dateFormat=" yyyy / MM / dd"
                customInput={<ExampleCustomInput value={date.toString()} onClick={() => {}} />}
              />
            </BaseFlexDiv>
          </CalendarContainer1>
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

const DateLabel = styled(BaseFlexCenterDiv)`
  font-size: 14px;
`;

const CalendarButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  font-size: 13px;
  color: black;
  background-color: white;
  border: 2px solid ${COLORSET_SIGNITURE_COLOR};

  &:hover {
    cursor: pointer;
    background-color: #ddd;
  }
`;

const DivHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`;

const CalendarContainer1 = styled(BaseFlexRow)`
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
const ExitBtn = styled(MiniButton)<{ bgColor?: string }>
(props => ({

  margin: '20px',
  width: '30px',
  height: '30px',
  fontsize: '20px',
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
