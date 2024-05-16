import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, ReactNode } from "react";
import { selectSnack } from "../store/slices/snackSlice";

interface Snack {
  text?: string;
}

interface SnackProviderWrapperProps {
  children: ReactNode;
}

const SnackProviderWrapper: React.FC<SnackProviderWrapperProps> = ({
  children,
}) => {
  const snack: Snack = useSelector(selectSnack);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (snack?.text)
      enqueueSnackbar(snack?.text, { autoHideDuration: 1500, ...snack });
  }, [snack, enqueueSnackbar]);

  return <>{children}</>;
};

export default SnackProviderWrapper;
