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
      isActive: false
    }))
  );

  useEffect(() => {
    setMainMenu(mainMenu.map(menu => ({
      ...menu,
      isActive: menu.id === tabPositionSlice.main
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
              $isActive={obj.isActive}
              onClick={() => {
                onClickCallback(obj.id);
                setMainMenu(mainMenu.map(menu => ({
                  ...menu,
                  isActive: menu.id === obj.id
                })));
              }}
            >
              {process.env[`REACT_APP_INIT_REPORT_TYPE${obj.id}`] || `REPORT_TYPE${obj.id}`}
            </MainButton>
          )
        } else  {
          return <MainButton key={obj.id} id={obj.id.toString()} $isActive={false} />
        }
      })}
    </>
  );
};

interface SubMenuProps {
  mainId: number;
  subId: number;
  onClickCallback: (mainId: number, subId: number) => void;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  mainId,
  subId,
  onClickCallback,
}) => {
  const [subMenu, setSubMenu] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      isActive: false
    }))
  );

  useEffect(() => {
    setSubMenu(subMenu.map(sub => ({
      ...sub,
      isActive: sub.id === subId
    })));
  }, [mainId, subId]);

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
                $isActive={obj.isActive}
                onClick={() => {
                  onClickCallback(mainId, obj.id);
                  setSubMenu(subMenu.map(sub => ({
                    ...sub,
                    isActive: sub.id === obj.id
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

const FlatButtonBase = styled.button<{ BGColor?: string, fontColor?: string}>`
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 0px solid black;
`;

const MainButton = styled(FlatButtonBase)<{ $isActive: boolean }>`
  color: ${(props) => props.$isActive ? "white" : "#444"};
  background: ${(props) => props.$isActive
    ? `linear-gradient(to bottom, ${COLORSET_SIGNITURE_COLOR}, ${COLORSET_SIGNITURE_COLOR})`  // Active background color
    : `linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2})`};
  border-bottom: 1px solid ${COLORSET_HEADER_BORDER2};
  border-left: 1px solid ${COLORSET_HEADER_BORDER2};
`;

const SubButton = styled.button<{ fontSize?: string, $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  font-size: ${(props) => props.fontSize ?? FONTSET_MAIN_MENU_SIZE};
  color: ${(props) => props.$isActive ? "white" : "#444"};
  background-color: transparent;
  border: 0px solid black;
`;