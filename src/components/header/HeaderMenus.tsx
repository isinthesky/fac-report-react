import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "@/store/congifureStore";
import styled from "styled-components";
import { FONTSET_MAIN_MENU_SIZE } from "@/static/fontSet";
import { COLORSET_SIGNITURE_COLOR, COLORSET_HEADER_BTN_LINEAR1, COLORSET_HEADER_BTN_LINEAR2 } from "@/static/colorSet";
import {
  INIT_REPORT_MENU1,
  INIT_REPORT_MENU1_SUB1,
  INIT_REPORT_MENU1_SUB2,
} from "@/config/env";


interface MenuProps {
  onClickCallback: (mainId: number, subId: number) => void;
  isSettingsActive: boolean;
}

type MenuStructure = { id: number; name: string; subMenus: { id: number; name: string }[] }[];

export const HeaderMenus: React.FC<MenuProps> = ({ onClickCallback, isSettingsActive }) => {
  const viewPosition = useSelector(
    (state: RootStore) => state.tabPageReducer.viewPosition
  );

  const [menuStructure, setMenuStructure] = useState<MenuStructure>([]);


  useEffect(() => {
    const structure: MenuStructure = [];
    const menuEnvVars = [
      { main: INIT_REPORT_MENU1, subs: [INIT_REPORT_MENU1_SUB1, INIT_REPORT_MENU1_SUB2] }
    ];

    menuEnvVars.forEach((menuVar, index) => {
      if (menuVar.main) {
        const subMenus = menuVar.subs
          .filter(subMenu => subMenu)
          .map((subMenu, subIndex) => ({
            id: subIndex + 1,
            name: subMenu
          }));

        if (subMenus.length > 0) {
          structure.push({
            id: index + 1,
            name: menuVar.main,
            subMenus
          });
        }
      }
    });

    setMenuStructure(structure);
  }, []);

  const mainMenuComponents = useMemo(() => {
    return (
      <MainMenuGrid>
        {menuStructure.map((mainMenu) => (
          <MainButton
            key={mainMenu.id}
            $isActive={mainMenu.id === viewPosition.main && !isSettingsActive}
            $isEmpty={!mainMenu}
            onClick={() =>
              mainMenu &&
              onClickCallback(
                mainMenu.id,
                mainMenu.subMenus[0]?.id || 0
              )
            }
          >
            {mainMenu.name || ""}
          </MainButton>
        ))}
      </MainMenuGrid>
    );
  }, [menuStructure, viewPosition, isSettingsActive, onClickCallback]);

  const subMenuComponents = useMemo(() => {
    const activeMainMenu = menuStructure.find(
      (menu) => menu.id === viewPosition.main
    );
    if (!activeMainMenu) return null;

    return (
      <SubMenuGrid>
        {activeMainMenu.subMenus.map((subMenu) => (
          <SubButton
            key={subMenu.id}
            $isActive={
              viewPosition.main === activeMainMenu.id &&
              subMenu.id === viewPosition.sub &&
              !isSettingsActive
            }
            $isEmpty={!subMenu}
            onClick={() =>
              subMenu && onClickCallback(activeMainMenu.id, subMenu.id)
            }
          >
            {subMenu.name}
          </SubButton>
        ))}
      </SubMenuGrid>
    );
  }, [menuStructure, viewPosition, isSettingsActive, onClickCallback]);

  return (
    <MenuContainer>
      {mainMenuComponents}
      {subMenuComponents}
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
