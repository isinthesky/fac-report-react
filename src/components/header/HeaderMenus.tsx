import React, {useState} from "react";
import styled from "styled-components";
import { FONTSET_MAIN_MENU_SIZE } from "../../static/fontSet";
import { COLORSET_HEADER_BTN_LINEAR1, COLORSET_HEADER_BTN_LINEAR2, COLORSET_HEADER_SUB_BTN_LINEAR1, COLORSET_HEADER_SUB_BTN_LINEAR2, COLORSET_HEADER_SUB_BTN_LINEAR3, COLORSET_HEADER_SUB_BTN_LINEAR4 } from "../../static/colorSet";
import { DEFAULT_BGIMG_HEADER } from "../../../src/env";

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
          return obj.enable === "true" ? (
            <FlatButtonEnabled
              key={obj.id}
              id={obj.id}
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
            </FlatButtonEnabled>
          ): (<FlatButtonDisabled
                key={obj.id}
                id={obj.id}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  onClickCallback(obj.id);
                  setMainMenu(Array.from({ length: 5 }, (_, i) => ({
                    id: (i + 1).toString(), 
                    enable: target.id === (i + 1).toString() ? "true" : "false" })));
                }}>
            {process.env[`REACT_APP_INIT_REPORT_TYPE${obj.id}`] ||
                `REPORT_TYPE${obj.id}`}
          </FlatButtonDisabled>
          )
        } else {
          return <FlatButtonDisabled
          key={obj.id}
          id={obj.id}
          />
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


const FlatButtonBase = styled.button<{ BGColor?: string, fontColor?: string, fontSize?: string }>`
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 0px solid black;
  background: linear-gradient(to bottom, ${COLORSET_HEADER_SUB_BTN_LINEAR1}, ${COLORSET_HEADER_SUB_BTN_LINEAR2});
`;

const FlatButtonEnabled = styled(FlatButtonBase)`
  color: white;
  background-color: #3D252B; /* Enabled background color */
`;

const FlatButtonDisabled = styled(FlatButtonBase)`
  color: #444;
  background: linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2});
`;

const MarginButton = styled.button<{ fontSize?: string, enable?: string }>`
  height: 30px;
  border: 1px solid #444; /* Consolidated border property */
  font-size: ${(props) => props.fontSize || FONTSET_MAIN_MENU_SIZE};
  background: ${(props) => props.enable === "true" 
    ? `linear-gradient(to bottom, ${COLORSET_HEADER_SUB_BTN_LINEAR1}, ${COLORSET_HEADER_SUB_BTN_LINEAR2})` 
    : `linear-gradient(to bottom, ${COLORSET_HEADER_SUB_BTN_LINEAR3}, ${COLORSET_HEADER_SUB_BTN_LINEAR4})`};
  color: ${(props) => props.enable === "true" ? "white" : "#444"};
`;
