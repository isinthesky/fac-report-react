import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Main from "./pages/Main";
import Daily from "./pages/Daily";
import Weekly from "./pages/Weekly";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Header from "./components/Header";
import store from "./store/congifureStore";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <RowContainer>
          <Nav />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/weekly" element={<Weekly />} />
            <Route path="/settings" element={<Settings />} />
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
  width: 100wv;
  height: calc(100vh - 50px);

  font: 0.7em "Fira Sans", sans-serif;
`;
