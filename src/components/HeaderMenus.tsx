import React from "react";
import styled from "styled-components";

const FlatButton = styled.button`
  height: 50px;
`;

const MarginButton = styled.button`
  height: 20px;
`;

interface MainMenuProps {
  onClickCallback: (id: string) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onClickCallback }) => {
  return (
    <>
      {["1", "2", "3", "4", "5"].map((id) => {
        if (process.env[`REACT_APP_INIT_REPORT_TYPE${id}`]) {
          return (
            <FlatButton
              key={id}
              onClick={() => {
                onClickCallback(id);
              }}
            >
              {process.env[`REACT_APP_INIT_REPORT_TYPE${id}`] ||
                `REPORT_TYPE${id}`}
            </FlatButton>
          );
        } else {
          return <div key={id} />;
        }
      })}
    </>
  );
};

interface SubMenuProps {
  mainId: string;
  onClickCallback: (mainId: string, subId: string) => void;
}

// REACT_APP_INIT_REPORT_TYPE2_SUB2

export const SubMenu: React.FC<SubMenuProps> = ({
  mainId,
  onClickCallback,
}) => {
  return (
    <>
      {["1", "2", "3", "4", "5"].map((id) => {
        if (process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${id}`]) {
          return (
            <MarginButton
              key={id}
              onClick={() => {
                onClickCallback(mainId, id);
              }}
            >
              {process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${id}`] ||
                `TYPE${mainId}_Sub${id}`}
            </MarginButton>
          );
        } else {
          return <div key={id} />;
        }
      })}
    </>
  );
};
