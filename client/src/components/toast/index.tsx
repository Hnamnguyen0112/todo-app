import {
  toast as toastFunction,
  ToastPosition,
  TypeOptions,
} from "react-toastify";

export default function toast({
  message,
  position = "top-right",
  type = "default",
}: {
  message: string;
  position?: ToastPosition;
  type?: TypeOptions;
}) {
  return toastFunction(message, {
    position,
    type,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    style: {
      whiteSpace: "pre-line",
    },
  });
}
