import styled from "styled-components";
import MainScreen from "./screens/MainScreen";

const AppContent = styled.div`
  overflow: hidden;
  position: relative;
  left: calc(50% - 200px);
  width: 400px;
  height: 600px;
  background-color: rgb(200, 200, 200);
`;

function App() {
  return (
    <AppContent>
      <MainScreen></MainScreen>
    </AppContent>
  );
}

export default App;
