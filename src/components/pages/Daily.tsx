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
import { ActiveButton, BaseButton, BaseFlex1Column, BaseModalBack, MiniButton } from "../../static/componentSet";
import { STRING_DAILY_MAIN_BTN_IDCHECK, STRING_DAILY_MAIN_BTN_PRINT } from "../../static/langSet";
import { COLORSET_SIGNITURE_COLOR } from "../../static/colorSet";

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

  const handleOpenPrint = () => {
    const isConfirmed = window.confirm("인쇄하시겠습니까??");

    if (isConfirmed) {
      setIsOpen(true);
    }
  };

  const handleIdCheck = async () => {
    dispatch(setViewType(settingSet.idViewMode === 0 ? 1 : 0));
  };

  const handlePrintClose = () => {
    setIsOpen(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Flat>
      <Controls>
        <DatePicker
          selected={new Date(date)}
          onChange={(value: Date) => setDate(value.getTime())}
        />
        <ActiveButton onClick={handleOpenPrint}>{STRING_DAILY_MAIN_BTN_PRINT}</ActiveButton>
        <BaseButton onClick={handleIdCheck}>{STRING_DAILY_MAIN_BTN_IDCHECK}</BaseButton>
      </Controls>
      <ReportLine>
        <ReportGuide
          row={settingSet.daily.row}
          column={settingSet.daily.column}
        ></ReportGuide>
      </ReportLine>
      {isOpen ? 
        <BaseModalBack onClick={handlePrintClose}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <Header>
              <HideBtn></HideBtn>
              <PrintBtn onClick={handlePrint}>{STRING_DAILY_MAIN_BTN_PRINT}</PrintBtn>
              <ExitBtn onClick={handlePrintClose}>x</ExitBtn>
            </Header>
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
  background-color: #F5F5F5;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  margin: 20px;
  padding: 10px;

  border: 1px solid #555;
`;

const ReportLine = styled(BaseFlex1Column)`
  justify-content: start;

  margin: 0px 20px;
  gap: 5px;
  
  border: 1px solid #555;
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
