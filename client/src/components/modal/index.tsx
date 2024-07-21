import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  forceClose?: boolean;
}

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  size = "md",
  forceClose = false,
}: ModalProps) => {
  function closePopup() {
    if (forceClose) {
      return;
    }
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog className="relative z-50" onClose={closePopup}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className={clsx(
              size === "sm" && "sm:max-w-sm",
              size === "md" && "sm:max-w-md",
              size === "lg" && "sm:max-w-lg",
              size === "xl" && "sm:max-w-xl",
              size === "2xl" && "sm:max-w-2xl",
              size === "3xl" && "sm:max-w-3xl",
              size === "4xl" && "sm:max-w-4xl",
              size === "5xl" && "sm:max-w-5xl",
              size === "6xl" && "sm:max-w-6xl",
              "my-8 inline-block w-full transform overflow-hidden rounded-2xl border bg-white p-6 text-left align-middle shadow-xl transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",
            )}
          >
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
