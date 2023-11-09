import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import styled from "styled-components";
import Main from "./pages/Main";
import Daily from "./pages/Daily";
import Weekly from "./pages/Weekly";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import store from "./store/congifureStore";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <RowContainer>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/daily/:id1/:id2" element={<Daily />} />
            <Route path="/weekly/:id1/:id2" element={<Weekly />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/:page" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </RowContainer>
      </div>
    </Provider>
  );
}

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;

  font: 1em "Fira Sans", sans-serif;
`;
