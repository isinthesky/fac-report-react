import { createGlobalStyle } from 'styled-components';

export const COLORSET_SIGNITURE_COLOR = "#9b3332"
export const COLORSET_BASE_COLOR = "#f0f0f0"
export const COLORSET_HEADER_BG = "#9b3332"
export const COLORSET_DISABLE_COLOR = "lightgray"
export const COLORSET_BUTTON_COLOR = "darkgray"
export const COLORSET_FONT_BASE = "black"
export const COLORSET_FONT_HIGHLIGHT = "white"

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