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
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto shadow-2xl"
          onClose={closePopup}
        >
          <div className="min-h-screen px-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogBackdrop className="fixed inset-0" />
            </TransitionChild>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
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
                  "my-8 inline-block w-full transform overflow-hidden rounded-2xl border bg-white p-6 text-left align-middle shadow-xl transition-all",
                )}
              >
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
