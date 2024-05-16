import AppRouter from "./routes";
import { theme } from "./theme";
import MainLayout from "./layouts";
import { ThemeProvider } from "@mui/styles";
import SnackProvider from "./common/SnackPrivider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackProvider>
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </SnackProvider>
    </ThemeProvider>
  );
}

export default App;
