import { createGlobalStyle } from 'styled-components';

export const COLORSET_SIGNITURE_COLOR = "#C51950"
export const COLORSET_BASE_COLOR = "#35373E"
export const COLORSET_BACKGROUND_COLOR = "#35373E"
export const COLORSET_HEADER_BG = "#9b3332"
export const COLORSET_DISABLE_COLOR = "lightgray"
export const COLORSET_BUTTON_COLOR = "darkgray"
export const COLORSET_FONT_BASE = "#A3A6A9"
export const COLORSET_FONT_HIGHLIGHT = "white"

export const COLORSET_NORMAL_CONTROL_BG = "#484D54"
export const COLORSET_NORMAL_CONTROL_BORDER = "#575C63"
export const COLORSET_NORMAL_CONTROL_FONT = "#A3A6A9"

export const COLORSET_ACTIVE_CONTROL_BG = "#D41D54"
export const COLORSET_ACTIVE_CONTROL_BORDER = "#000000"
export const COLORSET_ACTIVE_CONTROL_FONT = "#FFFFFF" 

export const COLORSET_GRID_HEADER_BG = "#41454E"
export const COLORSET_GRID_CONTROL_BORDER = "#555555"
export const COLORSET_GRID_CONTROL_BG = "#2E323B"


export const COLORSET_HEADER_BTN_LINEAR1 = "#2C2D34"
export const COLORSET_HEADER_BTN_LINEAR2 = "#212228"

export const COLORSET_HEADER_SUB_BTN_LINEAR1 = "#3D252B"
export const COLORSET_HEADER_SUB_BTN_LINEAR2 = "#312218"

export const COLORSET_HEADER_SUB_BTN_LINEAR3 = "#392935"
export const COLORSET_HEADER_SUB_BTN_LINEAR4 = "#302018"

export const COLORSET_PRINT_BG = "#FFFFFF"
export const COLORSET_PRINT_FONT = "#000000"
export const COLORSET_PRINT_BORDER = "#000000"

export const theme = {
  baseBG: COLORSET_BASE_COLOR,
  headerBG: COLORSET_HEADER_BG,
  signature: COLORSET_SIGNITURE_COLOR,
  disable: COLORSET_DISABLE_COLOR,
  button: COLORSET_BUTTON_COLOR,
  basefont: COLORSET_FONT_BASE,
  lightfont: COLORSET_FONT_HIGHLIGHT
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.baseBG};
    color: ${props => props.theme.basefont};
  }

  div {
    background-color: ${props => props.theme.baseBG};
  }

  header {
    background-color: ${props => props.theme.headerBG};
    color: ${props => props.theme.lightfont};
  }

  header > button {
    background-color: ${props => props.theme.headerBG};
    color: ${props => props.theme.lightfont};
  }
`;