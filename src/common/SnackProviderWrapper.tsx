import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, ReactNode, memo } from "react";
import { ISnackState, selectSnack } from "../store/slices/snackSlice";

interface SnackProviderWrapperProps {
  children: ReactNode;
}

const SnackProviderWrapper: React.FC<SnackProviderWrapperProps> = ({
  children,
}) => {
  const snack: ISnackState = useSelector(selectSnack);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (snack?.text)
      enqueueSnackbar(snack?.text, { autoHideDuration: 1500, ...snack });
  }, [snack, enqueueSnackbar]);

  return <>{children}</>;
};

export default memo(SnackProviderWrapper);
