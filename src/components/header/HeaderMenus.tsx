import React, {useState} from "react";
import styled from "styled-components";
import { FONTSET_MAIN_MENU_SIZE } from "../../static/fontSet";
import { COLORSET_HEADER_BTN_LINEAR1, COLORSET_HEADER_BTN_LINEAR2, COLORSET_HEADER_SUB_BTN_LINEAR1, COLORSET_HEADER_SUB_BTN_LINEAR2, COLORSET_HEADER_SUB_BTN_LINEAR3, COLORSET_HEADER_SUB_BTN_LINEAR4 } from "../../static/colorSet";

interface MainMenuProps {
  onClickCallback: (id: string) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onClickCallback }) => {
  const [mainMenu, setMainMenu] = useState(
    Array.from({ length: 5 }, (_, i) => (
      { id: (i + 1).toString(), enable: "false" }))
  );

  return (
    <>
      {mainMenu.map((obj) => {
        if (process.env[`REACT_APP_INIT_REPORT_TYPE${obj.id}`]) {
          return (
            <MainButton
              key={obj.id}
              id={obj.id}
              enable={obj.enable}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                onClickCallback(obj.id);
                setMainMenu(Array.from({ length: 5 }, (_, i) => ({
                  id: (i + 1).toString(), 
                  enable: target.id === (i + 1).toString() ? "true" : "false" })));
              }}
            >
              {process.env[`REACT_APP_INIT_REPORT_TYPE${obj.id}`] ||
                `REPORT_TYPE${obj.id}`}
            </MainButton>
          );
        } else  {
          return <MainButton key={obj.id} id={obj.id} enable="false" />
        }
      })}
    </>
  );
};

interface SubMenuProps {
  mainId: string;
  onClickCallback: (mainId: string, subId: string) => void;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  mainId,
  onClickCallback,
}) => {
  const [subMenu, setSubMenu] = useState(
    Array.from({ length: 5 }, (_, i) => (
      { id: (i + 1).toString(), enable: "false" }))
  );

  if (mainId === "0") {
    return <></>
  }

  return (
    <>
      {subMenu.map((obj) => {
        if (process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${obj.id}`]) {
          return (
            <SubButton
              key={obj.id}
              id={obj.id}
              enable={obj.enable} 
              onClick={(e) => {
                const target = e.target as HTMLElement;
                onClickCallback(mainId, obj.id);
                setSubMenu(Array.from({ length: 5 }, (_, i) => ({
                  id: (i + 1).toString(), 
                  enable: target.id === (i + 1).toString() ? "true" : "false" 
                })));
              }}
            >
              {process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${obj.id}`] ||
                `TYPE${mainId}_Sub${obj.id}`}
            </SubButton>
          );
        } else {
          return <div key={obj.id} />;
        }
      })}
    </>
  );
};


const FlatButtonBase = styled.button<{ BGColor?: string, fontColor?: string, fontSize?: string }>`
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 0px solid black;
  background: linear-gradient(to bottom, ${COLORSET_HEADER_SUB_BTN_LINEAR1}, ${COLORSET_HEADER_SUB_BTN_LINEAR2});
`;

const MainButton = styled(FlatButtonBase)<{ enable?: string }>`
  color: ${(props) => props.enable === "true" ? "white" : "#444"};
  background: ${(props) => props.enable === "true" 
    ? `linear-gradient(to bottom, #3D252B, #3D252B)`  // Enabled background color
    : `linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2})`};
`;

const SubButton = styled.button<{ fontSize?: string, enable?: string }>`
  height: 30px;
  border: 1px solid #444; /* Consolidated border property */
  font-size: ${(props) => props.fontSize || FONTSET_MAIN_MENU_SIZE};
  background: ${(props) => props.enable === "true" 
    ? `linear-gradient(to bottom, ${COLORSET_HEADER_SUB_BTN_LINEAR1}, ${COLORSET_HEADER_SUB_BTN_LINEAR2})` 
    : `linear-gradient(to bottom, ${COLORSET_HEADER_SUB_BTN_LINEAR3}, ${COLORSET_HEADER_SUB_BTN_LINEAR4})`};
  color: ${(props) => props.enable === "true" ? "white" : "#444"};
`;
