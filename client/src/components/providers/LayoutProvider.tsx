import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export interface LayoutContextType {
  toggleSidebar: boolean;
}

export interface LayoutActionsContextType {
  setToggleSidebar: Dispatch<SetStateAction<boolean>>;
}

const LayoutContext = createContext<LayoutContextType>({
  toggleSidebar: true,
});
const LayoutActionsContext = createContext<LayoutActionsContextType>({
  setToggleSidebar: () => {},
});

export const useLayout = () => useContext(LayoutContext);
export const useLayoutActions = () => useContext(LayoutActionsContext);

interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <LayoutContext.Provider
      value={{
        toggleSidebar,
      }}
    >
      <LayoutActionsContext.Provider
        value={{
          setToggleSidebar,
        }}
      >
        {children}
      </LayoutActionsContext.Provider>
    </LayoutContext.Provider>
  );
}
