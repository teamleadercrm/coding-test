import AppRouter from "./routes";
import { theme } from "./theme";
import MainLayout from "./layouts";
import { ThemeProvider } from "@mui/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
