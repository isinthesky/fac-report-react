import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/congifureStore";
import styled from "styled-components";
import { FONTSET_MAIN_MENU_SIZE } from "../../static/fontSet";
import { COLORSET_SIGNITURE_COLOR, COLORSET_HEADER_BTN_LINEAR1, COLORSET_HEADER_BTN_LINEAR2 ,COLORSET_HEADER_BORDER2 } from "../../static/colorSet";
import { SelectedTab } from "../../static/types";

interface MainMenuProps {
  onClickCallback: (id: number) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onClickCallback }) => {
  const tabPositionSlice = useSelector((state: RootStore) => state.tabPageReducer.viewPosition) as SelectedTab;

  const [mainMenu, setMainMenu] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      enable: "false"
    }))
  );

  // Update enable state based on tabPositionSlice
  useEffect(() => {
    setMainMenu(mainMenu.map(menu => ({
      ...menu,
      enable: menu.id === tabPositionSlice.main ? "true" : "false"
    })));
  }, [tabPositionSlice.main]);

  return (
    <>
      {mainMenu.map((obj) => {
        if (process.env[`REACT_APP_INIT_REPORT_TYPE${obj.id}`]) {
          return (
            <MainButton
              key={obj.id}
              id={obj.id.toString()}
              enable={obj.enable}
              onClick={() => {
                onClickCallback(obj.id);
                setMainMenu(mainMenu.map(menu => ({
                  ...menu,
                  enable: menu.id === obj.id ? "true" : "false"
                })));
              }}
            >
              {process.env[`REACT_APP_INIT_REPORT_TYPE${obj.id}`] || `REPORT_TYPE${obj.id}`}
            </MainButton>
          )
        } else  {
          return <MainButton key={obj.id} id={obj.id.toString()} enable="false" />
        }
      })}
    </>
  );
};

interface SubMenuProps {
  mainId: number;
  onClickCallback: (mainId: number, subId: number) => void;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  mainId,
  onClickCallback,
}) => {
  const [subMenu, setSubMenu] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      enable: "false"
    }))
  );

  // Update enable state based on tabPositionSlice
  useEffect(() => {
    setSubMenu(subMenu.map(sub => ({
      ...sub,
      enable: sub.id === mainId ? "true" : "false"
    })));
  }, [mainId]);

  if (mainId === 0) {
    return <></>;
  } else {
    return (
      <>
        {subMenu.map((obj) => {
          if (process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${obj.id}`]) {
            return (
              <SubButton
                key={obj.id}
                id={obj.id.toString()}
                enable={obj.enable}
                onClick={() => {
                  onClickCallback(mainId, obj.id);
                  setSubMenu(subMenu.map(sub => ({
                    ...sub,
                    enable: sub.id === obj.id ? "true" : "false"
                  })));
                }}
              >
                {process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${obj.id}`] || `TYPE${mainId}_Sub${obj.id}`}
              </SubButton>
            )
          } else {
            return <SubButton key={obj.id} />
          }
        })}
      </>
    );
  }  
};

const FlatButtonBase = styled.button<{ BGColor?: string, fontColor?: string, fontSize?: string }>`
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 0px solid black;
`;

const MainButton = styled(FlatButtonBase)<{ enable?: string }>`
  color: ${(props) => props.enable === "true" ? "white" : "#444"};
  background: ${(props) => props.enable === "true"
    ? `linear-gradient(to bottom, ${COLORSET_SIGNITURE_COLOR}, ${COLORSET_SIGNITURE_COLOR})`  // Enabled background color
    : `linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2})`};
  border-bottom: 1px solid ${COLORSET_HEADER_BORDER2};
  border-left: 1px solid ${COLORSET_HEADER_BORDER2};
`;

const SubButton = styled.button<{ fontSize?: string, enable?: string }>`
  height: 30px;
  // border: 1px solid #444; /* Consolidated border property */
  font-size: ${(props) => props.fontSize || FONTSET_MAIN_MENU_SIZE};
  background-color: transparent;
  color: ${(props) => props.enable === "true" ? "white" : "#444"};
  border: 0px solid black;
`;
