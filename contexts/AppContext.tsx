import { createContext, useState } from "react";
import { AppContextData, IAppState } from "../utils/types";


const AppContext = createContext({} as AppContextData);

type ChildrenProps = {
    children: React.ReactNode;
}

export default function AppProvider({ children }: ChildrenProps) {
    const [appState, setAppState] = useState<IAppState>({
        isDark: false,
        isOffline: false,
        isLocal: true,
    });

    return(
        <AppContext.Provider value={{ appState }}>
            {children}
        </AppContext.Provider>
    )
}