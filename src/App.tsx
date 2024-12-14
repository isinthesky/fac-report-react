
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../src/static/colorSet';

import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import styled from "styled-components";
import Main from "./pages/Main";
import Daily from "./pages/Daily";
import Weekly from "./components/pages/Weekly";
import Settings from "./components/pages/Settings";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import store from "./store/congifureStore";

export default function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle />
        <RowContainer>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/daily/" element={<Daily />} />
            <Route path="/daily/:id1/:id2" element={<Daily />} />
            <Route path="/weekly/:id1/:id2" element={<Weekly />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/:page" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </RowContainer>
      </div>
    </ThemeProvider>
    </Provider>
  );
}

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin: 0px;

  font: 13px "Fira Sans", sans-serif;
`;
