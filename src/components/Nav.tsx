import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Nav() {
  const navigate = useNavigate();

  const handleGoWeekly = async () => {
    navigate("/weekly");
  };

  const handleGoDaily = async () => {
    navigate("/daily");
  };

  return (
    <LeftNav>
      <PageButton onClick={handleGoWeekly}>Weekly</PageButton>
      <PageButton onClick={handleGoDaily}>Daily</PageButton>
    </LeftNav>
  );
}

const LeftNav = styled.nav`
  display: flex;
  width: 130px;

  flex-direction: column;

  background-color: #cceeff;
`;

const PageButton = styled.button`
  justify-content: center;
  align-items: center;

  height: 40px;
  width: 100px;

  margin: 10px;
`;

export default Nav;
