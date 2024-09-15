import React, { useEffect, useState, useRef, useCallback, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import ReportGuide from "../viewer/ReportGuide";
import PrintModal from "../print/PrintModal";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RootStore } from "../../store/congifureStore";
import { ActiveButton, BaseButton, BaseFlex1Column, BaseFlexColumn, BaseFlexDiv, BaseFlexRow, BaseModalBack, MiniButton, BaseFlexCenterDiv } from "../../static/componentSet";
import { STRING_DAILY_MAIN_BTN_PRINT, STRING_DEFAULT_SAVE, STRING_DAILY_MAIN_SELECT_DATE, STRING_DAILY_MAIN_TITLE } from "../../static/langSet";
import { COLORSET_BACKGROUND_COLOR, COLORSET_SIGNITURE_COLOR } from "../../static/colorSet";
import Header from "../header/Header";
import { setViewMode, setApproves, setMenus } from "../../features/reducers/settingSlice";
import { timestampToYYYYMMDD } from "../../static/utils";
import { get_page_setting, updateTabDate, update_tab_device_value, get_history_page_setting } from "../../features/api/page"
import { setTabPage, setViewSelect, setCurrentTab } from "../../features/reducers/tabPageSlice";
import { fetchPageSettings } from "../../features/api/common";
import { TabPageInfotype } from "../../static/types";

interface CustomInputProps {
  value: string;
  onClick: () => void;
}

interface ViewPosition {
  main: number;
  sub: number;
}

const ExampleCustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(({ value, onClick }, ref) => (
  <CalendarButton onClick={onClick} ref={ref}>
    {value}
  </CalendarButton>
));

const DEFAULT_MAIN_TAB = "1";

const Daily: React.FC = () => {
  const dispatch = useDispatch();
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSet = useSelector((state: RootStore) => state.tabPageReducer);
  const [prevViewPosition, setPrevViewPosition] = useState<ViewPosition>({ main: -1, sub: -1 });
  const [prevDate, setPrevDate] = useState<number>(0);
  const [date, setDate] = useState<number>(settingSet.date);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id1 } = useParams<{ id1?: string }>();
  const componentRef = useRef<HTMLDivElement>(null);

  // Memoized functions
  const handleIdCheck = useCallback(() => {
    dispatch(setViewMode(settingSet.viewMode === "view" ? "idCheck" : "view"));
  }, [dispatch, settingSet.viewMode]);

  const updatePageSettings = useCallback(async (mainId: number, subId: number) => {
    const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
    
    if (process.env[key]) {  
      const tabInfo = tabPageSet.currentTabPage;
      await updateTabDate(tabInfo.name, timestampToYYYYMMDD(date));
      await update_tab_device_value(tabInfo.name);

      const resPageSetting = await get_page_setting(tabInfo.name, true, false);
      if (resPageSetting) {     
        resPageSetting.name = tabInfo.name;
        dispatch(setTabPage({mainTab: mainId, subTab: subId, tabInfo: resPageSetting}));
        dispatch(setApproves(resPageSetting.approves));
      }

      dispatch(setViewSelect({mainTab: Number(mainId), subTab: Number(subId)}));
    }
  }, [dispatch, date, tabPageSet.currentTabPage]);

  // Effect for keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        handleIdCheck();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleIdCheck]);
  
  // Effect for fetching and updating data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { main: mainId, sub: subId } = tabPageSet.viewPosition;

        if (mainId < 1 || subId < 1) {
          const buttons = await fetchPageSettings(dispatch);
          dispatch(setMenus(buttons));
        }

        if (mainId !== prevViewPosition.main || subId !== prevViewPosition.sub || date !== prevDate) {
          setPrevViewPosition({ main: mainId, sub: subId });
          setPrevDate(date);
          updatePageSettings(mainId, subId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date, tabPageSet.viewPosition, prevViewPosition, prevDate, dispatch, updatePageSettings]);

  // Print related functions
  const handlePrintFunction = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { size: A4 landscape; }
    body {
      -webkit-print-color-adjust: exact;
    }`,
    documentTitle: `${settingSet.printTitle}_${new Date(date).toLocaleDateString("en-CA").replace(/-/g, '')}`
  });

  const handleOpenPrint = useCallback(() => {
    setIsOpen(true);
    dispatch(setViewMode("print"))
  }, [dispatch]);

  const handlePrintClose = useCallback(() => {
    setIsOpen(false);
    dispatch(setViewMode("view"))
  }, [dispatch]);

  // Other handlers
  const handleOpenSave = () => {
    // TODO: Implement save functionality
  };

  const handleHistoryPage = useCallback(async () => {
    if (tabPageSet.currentTabPage.name) {
      const resHistoryPage = await get_history_page_setting(tabPageSet.currentTabPage.name, timestampToYYYYMMDD(date));
      console.log("resHistoryPage", resHistoryPage);

      if (resHistoryPage === false) {
        console.log("저장된 페이지가 없습니다.");
        return;
      }

      // resHistoryPage.name = tabPageSet.currentTabPage.name;

      const tabPageInfo: TabPageInfotype = {
        id: resHistoryPage.id,
        name: resHistoryPage.name,
        tbl_row: resHistoryPage.tbl_row,
        tbl_column: resHistoryPage.tbl_column,
        times: resHistoryPage.times,
        tables: resHistoryPage.tables,
        approves: resHistoryPage.approves,
      }

      dispatch(setCurrentTab(tabPageInfo));
    }
  }, [tabPageSet.currentTabPage.name, date]);

  return (
    <Flat>
      <Header mainTab={Number(id1 || DEFAULT_MAIN_TAB)} />
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
                dateFormatCalendar="yyyy MM"
                dateFormat=" yyyy / MM / dd"
                customInput={<ExampleCustomInput value={date.toString()} onClick={() => {}} />}
              />
            </BaseFlexDiv>
            <button onClick={handleHistoryPage}>load history page</button>
          </CalendarContainer1>
          <ButtonControls>
            <ActiveButton onClick={handleOpenPrint}>{STRING_DAILY_MAIN_BTN_PRINT}</ActiveButton>
            <ActiveButton onClick={handleOpenSave}>{STRING_DEFAULT_SAVE}</ActiveButton>
          </ButtonControls>
        </Controls>
      </ControlContainer>
      <ReportLine>
        <ReportGuide row={tabPageSet.currentTabPage.tbl_row} column={tabPageSet.currentTabPage.tbl_column} />
      </ReportLine>
      {isOpen && 
        <BaseModalBack onClick={handlePrintClose}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <DivHeader>
              <HideBtn></HideBtn>
              <PrintBtn onClick={handlePrintFunction}>{STRING_DAILY_MAIN_BTN_PRINT}</PrintBtn>
              <ExitBtn onClick={handlePrintClose}>x</ExitBtn>
            </DivHeader>
            <PrintModal 
              row={tabPageSet.currentTabPage.tbl_row}
              column={tabPageSet.currentTabPage.tbl_column} 
              ref={componentRef} 
            />
          </ModalView>
        </BaseModalBack>
      } 
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
