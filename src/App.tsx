import AppRouter from "./routes";
import MainLayout from "./layouts";
import { ThemeProvider } from "@mui/styles";

function App() {
  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
}

export default App;
