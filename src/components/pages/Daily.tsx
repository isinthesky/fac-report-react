import React, { useEffect, useState, useRef, useCallback, forwardRef, useMemo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import ReportGuide from "../viewer/ReportGuide";
import PrintModal from "../print/PrintModal";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RootStore } from "../../store/congifureStore";
import { ActiveButton, BaseButton, BaseFlex1Column, BaseFlexColumn, BaseFlexDiv, BaseFlexRow, BaseModalBack, MiniButton, BaseFlexCenterDiv } from "../../static/componentSet";
import { STRING_DAILY_MAIN_BTN_PRINT, STRING_DEFAULT_SAVE, STRING_DAILY_MAIN_SELECT_DATE, STRING_DAILY_MAIN_TITLE, STRING_DAILY_MAIN_BTN_LOAD_HISTORY } from "../../static/langSet";
import { COLORSET_BACKGROUND_COLOR, COLORSET_SIGNITURE_COLOR } from "../../static/colorSet";
import Header from "../header/Header";
import { setMenus, setViewMode, setIsLoading, setApproves } from "../../entities/reducers/settingSlice";
import { timestampToYYYYMMDD } from "../../static/utils";
import LoadingSpinner from "../viewer/LoadingSpinner";
import { get_page_setting, updateTabDate, update_tab_device_value, get_history_page_setting, update_tab_user_table_info, save_page_setting, reset_tab_user_table_info } from "../../entities/api/page"
import { setTabPage, setViewSelect, setCurrentTab } from "../../entities/reducers/tabPageSlice";
import { fetchPageSettings } from "../../entities/api/common";
import { TabPageInfotype, Unit, UserTableType } from "../../static/types";
import { isUserTableTypeByInt } from "../../static/utils";
import { getTabPageSetting, saveTabPage } from "../../features/page";

interface CustomInputProps {
  value: string;
  onClick: () => void;
}

const ExampleCustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(({ value, onClick }, ref) => (
  <CalendarButton onClick={onClick} ref={ref}>
    {value}
  </CalendarButton>
));

const DEFAULT_MAIN_TAB = 1;

const MemoizedReportGuide = React.memo(ReportGuide);

const Daily: React.FC = () => {
  const dispatch = useDispatch();
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSet = useSelector((state: RootStore) => state.tabPageReducer);
  const viewPosition = useSelector(
    (state: RootStore) => state.tabPageReducer.viewPosition,
    shallowEqual
  );
  const currentTabPage = useSelector(
    (state: RootStore) => state.tabPageReducer.currentTabPage
  );
  const [date, setDate] = useState<number>(settingSet.date);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHistoryAvailable, setIsHistoryAvailable] = useState<boolean>(true);
  const componentRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  // Fetch initial settings on component mount
  const initializeSettings = async () => {
    dispatch(setIsLoading(true));
    try {
      // Fetch page settings only once
      const buttons = await fetchPageSettings(dispatch, timestampToYYYYMMDD(date));
      if (buttons.length > 0) {
        dispatch(setMenus(buttons));
        const [mainId, subId] = buttons[0].split('').map(Number);
        dispatch(setViewSelect({ mainTab: mainId, subTab: subId }));
      }
    } catch (error) {
      console.error("Error during initialization:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  initializeSettings();
}, [dispatch]);

  // Define handleMenuClick
  const handleMenuClick = useCallback(
    (mainTab: number, subTab: number) => {
      console.log("mainTab", mainTab, "subTab", subTab);
      if (
        mainTab !== viewPosition.main ||
        subTab !== viewPosition.sub
      ) {
        const selectedTab = tabPageSet.tabPageInfo[mainTab][subTab];

        console.log("setViewSelect", mainTab, subTab, selectedTab);
        dispatch(setViewSelect({ mainTab, subTab }));
      }
    },
    [dispatch, viewPosition]
  );
  
  useEffect(() => {
    // Fetch data for current tab whenever currentTabPage or date changes
    const fetchDataForTab = async () => {
      dispatch(setIsLoading(true));
      try {
        await resetTabUserTableInfo();
  
        if (currentTabPage) {
          const resHistoryInfo = await get_history_page_setting(
            currentTabPage.name,
            timestampToYYYYMMDD(date)
          );
  
          setIsHistoryAvailable(resHistoryInfo !== false);
        }
      } catch (error) {
        console.error("Error during data fetching:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  
    fetchDataForTab();
  }, [currentTabPage, date, dispatch]);
    
  const resetTabUserTableInfo = useCallback(async () => {
    if (!tabPageSet.currentTabPage) {
      return false;
    }
    if (!tabPageSet.currentTabPage.name){
      return false;
    }

    await reset_tab_user_table_info(tabPageSet.currentTabPage.name);
    await updateTabDate(tabPageSet.currentTabPage.name, timestampToYYYYMMDD(date));
    await update_tab_device_value(tabPageSet.currentTabPage.name);

    console.log(tabPageSet.currentTabPage.name);

    const resPage = await getTabPageSetting(tabPageSet.currentTabPage.name);
    if (resPage) {
      dispatch(setApproves(resPage.approves));
      dispatch(
        setTabPage({
          mainTab: viewPosition.main,
          subTab: viewPosition.sub,
          tabInfo: resPage,
        })
      );
    }

    return true;
  }, [date, dispatch, currentTabPage]);

  // Print related functions
  const handlePrintFunction = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { size: A4 landscape; }
    body {
      -webkit-print-color-adjust: exact;
    }`,
    documentTitle: `${settingSet.printTitle}_${new Date(date).toLocaleDateString("en-CA").replace(/-/g, '')}`,
  });

  const handleOpenPrint = useCallback(() => {
    setIsOpen(true);
    dispatch(setViewMode("print"));
  }, [dispatch]);

  const handlePrintClose = useCallback(() => {
    setIsOpen(false);
    dispatch(setViewMode("view"));
  }, [dispatch]);

  const handlePageSave = async () => {
    try {
      dispatch(setIsLoading(true));
      if (!tabPageSet.currentTabPage) {
        dispatch(setIsLoading(false));
        return;
      }
      
      await saveTabPage(tabPageSet.currentTabPage);

    } catch (error) {
      console.error("Error saving page:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleHistoryPage = async () => {
    if (!tabPageSet.currentTabPage) {
      return;
    }

    try {
      dispatch(setIsLoading(true));
      const resHistoryPage = await get_history_page_setting(
        tabPageSet.currentTabPage.name,
        timestampToYYYYMMDD(date)
      );

      if (resHistoryPage === false) {
        setIsHistoryAvailable(false); // Update state accordingly
        return;
      }

      resHistoryPage.name = tabPageSet.currentTabPage.name;

      const newTables = resHistoryPage.tables.map((table: Unit) => {
        if (isUserTableTypeByInt(table.type)) {
          const userTable = resHistoryPage.user_tables.find((
            userTable: UserTableType) => userTable.idx === table.idx
          );
          if (userTable) {
            table.id = userTable.id;
            table.name = userTable.name;
            table.disable = userTable.disable;
            table.device_values = userTable.user_data;
          }
        }
        return table;
      })

      resHistoryPage.tables = newTables;
      dispatch(setCurrentTab(resHistoryPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  const renderReportGuide = useMemo(
    () => (
      <MemoizedReportGuide
        row={currentTabPage?.tbl_row || 0}
        column={currentTabPage?.tbl_column || 0}
      />
    ),
    [currentTabPage?.tbl_row, currentTabPage?.tbl_column]
  );

  return (
    <Flat>
      <Header
        paramMain={viewPosition.main || DEFAULT_MAIN_TAB}
        onMenuClick={handleMenuClick}
      />
      <Title>{STRING_DAILY_MAIN_TITLE}</Title>
      <ControlContainer>
        <Controls>
          <CalendarContainer1>
            <DateLabel>{STRING_DAILY_MAIN_SELECT_DATE}</DateLabel>
            <BaseFlexRow style={{ width: '180px' }}>
              <DatePicker
                selected={new Date(date)}
                onChange={(value: Date) => {
                  setDate(value.getTime());
                }}
                showIcon={true}
                dateFormatCalendar="yyyy MM"
                dateFormat=" yyyy / MM / dd"
                customInput={<ExampleCustomInput value={date.toString()} onClick={() => {}} />}
              />
            </BaseFlexRow>
            {isHistoryAvailable ? (
              <ActiveButton onClick={handleHistoryPage}>{STRING_DAILY_MAIN_BTN_LOAD_HISTORY}</ActiveButton>
            ) : (
              <BaseButton disabled>{STRING_DAILY_MAIN_BTN_LOAD_HISTORY}</BaseButton>
            )}
          </CalendarContainer1>
          <ButtonControls>
            <ActiveButton onClick={handleOpenPrint}>{STRING_DAILY_MAIN_BTN_PRINT}</ActiveButton>
            <ActiveButton onClick={handlePageSave}>{STRING_DEFAULT_SAVE}</ActiveButton>
          </ButtonControls>
        </Controls>
      </ControlContainer>
      <ReportLine>
        {renderReportGuide}
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
              row={tabPageSet.currentTabPage?.tbl_row || 0}
              column={tabPageSet.currentTabPage?.tbl_column || 0} 
              ref={componentRef} 
            />
          </ModalView>
        </BaseModalBack>
      } 

      {settingSet.isLoading && <LoadingSpinner />}
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
  width: 400px;
  gap: 20px;
  justify-content: start;
  align-items: center;
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

const LoadHistoryBtn = styled(ActiveButton) `
  margin: 20px;
  border-radius: 10px;
`;

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
