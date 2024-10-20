import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/congifureStore";
import styled from "styled-components";
import { FONTSET_MAIN_MENU_SIZE } from "../../static/fontSet";
import { COLORSET_SIGNITURE_COLOR, COLORSET_HEADER_BTN_LINEAR1, COLORSET_HEADER_BTN_LINEAR2 } from "../../static/colorSet";
import { SelectedTab } from "../../static/types";

interface MenuProps {
  onClickCallback: (mainId: number, subId: number) => void;
  isSettingsActive: boolean;
}

export const HeaderMenus: React.FC<MenuProps> = ({ onClickCallback, isSettingsActive }) => {
  const viewPosition = useSelector((state: RootStore) => state.tabPageReducer.viewPosition) as SelectedTab;
  const [menuStructure, setMenuStructure] = useState<{ id: number; name: string; subMenus: { id: number; name: string }[] }[]>([]);

  useEffect(() => {
    console.log("HeaderMenus : useEffect");
    const structure = [];
    for (let i = 1; i <= 5; i++) {
      const mainMenuName = process.env[`REACT_APP_INIT_REPORT_MENU${i}`];
      if (mainMenuName) {
        const subMenus = [];
        for (let j = 1; j <= 10; j++) {
          const subMenuName = process.env[`REACT_APP_INIT_REPORT_MENU${i}_SUB${j}`];
          if (subMenuName) {
            subMenus.push({ id: j, name: subMenuName });
          }
        }
        structure.push({ id: i, name: mainMenuName, subMenus });
      }
    }
    setMenuStructure(structure);
  }, []);

  return (
    <MenuContainer>
      <MainMenuGrid>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => {
          const mainMenu = menuStructure.find(menu => menu.id === index);
          return (
            <MainButton
              key={index}
              $isActive={mainMenu?.id === viewPosition.main && !isSettingsActive}
              $isEmpty={!mainMenu}
              onClick={() => mainMenu && onClickCallback(mainMenu.id, mainMenu.subMenus[0]?.id || 0)}
            >
              {mainMenu?.name || ''}
            </MainButton>
          );
        })}
      </MainMenuGrid>
      <SubMenuGrid>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((index) => {
          const activeMainMenu = menuStructure.find(menu => menu.id === viewPosition.main);
          const subMenu = activeMainMenu?.subMenus.find(sub => sub.id === index);
          return (
            <SubButton
              key={index}
              $isActive={viewPosition.main === activeMainMenu?.id && subMenu?.id === viewPosition.sub && !isSettingsActive}
              $isEmpty={!subMenu}
              onClick={() => subMenu && onClickCallback(activeMainMenu?.id || 0, subMenu.id)}
            >
              {subMenu?.name || ''}
            </SubButton>
          );
        })}
      </SubMenuGrid>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainMenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 50px;
`;

const SubMenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  height: 30px;
`;

const MainButton = styled.button<{ $isActive: boolean; $isEmpty?: boolean; }>`
  height: 50px;
  color: ${(props) => props.$isActive ? "white" : "#444"};
  background: ${(props) => props.$isActive
    ? `linear-gradient(to bottom, ${COLORSET_SIGNITURE_COLOR}, ${COLORSET_SIGNITURE_COLOR})`
    : `linear-gradient(to bottom, ${COLORSET_HEADER_BTN_LINEAR1}, ${COLORSET_HEADER_BTN_LINEAR2})`};
  border: 0px solid black;
  visibility: ${(props) => props.$isEmpty ? "hidden" : "visible"};
`;

const SubButton = styled.button<{ $isActive: boolean; $isEmpty?: boolean; }>`
  height: 30px;
  font-size: ${FONTSET_MAIN_MENU_SIZE};
  color: ${(props) => props.$isActive ? "white" : "#444"};
  background-color: transparent;
  border: 0px solid black;
  visibility: ${(props) => props.$isEmpty ? "hidden" : "visible"};
`;