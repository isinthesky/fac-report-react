import React, {useState} from "react";
import styled from "styled-components";
import { FONTSET_MAIN_MENU_SIZE } from "../../static/fontSet";
import { COLORSET_FONT_HIGHLIGHT, COLORSET_HEADER_BG } from "../../static/colorSet";

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
            <FlatButton
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
            </FlatButton>
          );
        } else {
          return <div key={obj.id} />;
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

  return (
    <>
      {subMenu.map((obj) => {
        if (process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${obj.id}`]) {
          return (
            <MarginButton
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
            </MarginButton>
          );
        } else {
          return <div key={obj.id} />;
        }
      })}
    </>
  );
};

const FlatButton = styled.button<{ BGColor?: string, fontcolor?: string, fontsize?: string, enable?: string }>`
  height: 45px;
  color:  ${(props) => props.fontsize || COLORSET_FONT_HIGHLIGHT};
  background-color: ${(props) => props.fontsize || COLORSET_HEADER_BG};
  border: 2px solid black;
  border-color: ${(props) => props.fontsize || COLORSET_HEADER_BG};

  border-bottom: ${(props) => props.enable === "true" ? "3px solid #500" : "0px solid #d55"};
  font-size: ${(props) => props.fontsize || FONTSET_MAIN_MENU_SIZE};
`;

const MarginButton = styled.button<{ fontsize?: string, enable?: string }>`
  height: 25px;
  color:  ${(props) => props.fontsize || COLORSET_FONT_HIGHLIGHT};
  background-color: ${(props) => props.fontsize || COLORSET_HEADER_BG};

  border: 2px solid black;
  border-color: ${(props) => props.fontsize || COLORSET_HEADER_BG};

  border-bottom: ${(props) => props.enable === "true" ? "3px solid #500" : "0px solid #d55"};
  font-size: ${(props) => props.fontsize || FONTSET_MAIN_MENU_SIZE};
`;