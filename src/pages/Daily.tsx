import { useEffect, useState, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setTableDate, setViewType } from "../features/reducers/optionSlice";
import { useReactToPrint } from 'react-to-print';
import ReportGuide from "../components/viewer/ReportGuide";
import PrintModal from "../components/PrintModal";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface OptionState {
  optionReducer: {
    value: any;
  };
}

function Daily() {
  const dispatch = useDispatch()  
  const option = useSelector((state: OptionState) => state.optionReducer.value);
  const [date, setDate] = useState(option.date);
  const [isOpen, setIsOpen] = useState(false);
  const { id1, id2 } = useParams();
  const componentRef = useRef<HTMLDivElement>(null);

  const handleApply = () => {
  };

  useEffect(() => {
    dispatch(setTableDate(date))
  }, [date]);

  const handleDaily = () => {
    dispatch(setViewType(option.viewType === 0 ? 1 : 0))
  };

  const handleWeekly = async () => {};

  const handleOpenPrint = () => {
    const isConfirmed = window.confirm("인쇄하시겠습니까??");

    if (isConfirmed) {
      setIsOpen(true) 
    }
  };

  const handlePrintClose = () => {
    setIsOpen(false) 
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Flat>
      <Controls>
        <DatePicker
          selected={date}
          onChange={(date: Date) => setDate(date.getTime())}
        />
        <ApplyButton onClick={handleApply}>Apply</ApplyButton>
        <ApplyButton onClick={handleDaily}>Daily</ApplyButton>
        <ApplyButton onClick={handleWeekly}>Weekly</ApplyButton>
        <ApplyButton onClick={handleOpenPrint}>Print</ApplyButton>
      </Controls>
      <ReportLine>
        <ReportGuide
          row={option.daily.row}
          column={option.daily.column}
          mainTab={id1 ? id1 : "1"}
          subTab={id2 ? id2 : "1"}
        ></ReportGuide>
      </ReportLine>
      {isOpen ? 
        <ModalBackdrop onClick={handlePrintClose}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <Header>
              <HideBtn></HideBtn>
              <PrintBtn onClick={handlePrint}>PRINT</PrintBtn>
              <ExitBtn onClick={handlePrintClose}>x</ExitBtn>
            </Header>
            <PrintModal row={option.daily.row}
                        column={option.daily.column}
                        mainTab={id1 ? id1 : "1"}
                        subTab={id2 ? id2 : "1"}
                        title={"수변전일지"}
                        ref={componentRef} />
          </ModalView>
        </ModalBackdrop>
      : null} 
    </Flat>
  );
}

const Flat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  background-color: #F5F5F5;
`;

const Header = styled.div`
  // flex: 1;
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

const ReportLine = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;

  margin: 20px;
  border: 1px solid #555;
`;

const ApplyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 21px;
  width: 100px;

  font-size: 1em;
`;


const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;

const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
  font-size: 1em;
`;

const ExitBtn = styled(ModalBtn) `
background-color : #4000c7;
border-radius: 10px;
text-decoration: none;
margin: 10px;
padding: 5px 10px;
width: 30px;
height: 30px;
display : flex;
justify-content : center;
align-items : center;
align-self : end;
`;


const PrintBtn = styled(ModalBtn) `
background-color : #4000c7;
border-radius: 10px;
text-decoration: none;
margin: 10px;
padding: 5px 10px;
width: 60px;
height: 30px;
display : flex;
justify-content : center;
align-items : center;
align-self : end;
`;


const HideBtn = styled(ModalBtn) `
background-color : translate;
border-radius: 10px;
text-decoration: none;
margin: 10px;
padding: 5px 10px;
width: 30px;
height: 30px;
display : flex;
`;


const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
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
