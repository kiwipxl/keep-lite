import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import MainScreen from "./screens/MainScreen";
import theme from "./theme";

const AppContent = styled.div`
  overflow: hidden;
  position: relative;
  left: calc(50% - 200px);
  width: 400px;
  height: 600px;
  background-color: rgb(200, 200, 200);
  color: ${(props) => props.theme.primaryColor};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContent>
        <MainScreen></MainScreen>
      </AppContent>
    </ThemeProvider>
  );
}

export default App;
