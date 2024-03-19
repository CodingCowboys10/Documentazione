"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ModelContextProps {
  model: string;
  setModel: Dispatch<SetStateAction<string>>;
}

export const ModelContext = createContext<ModelContextProps>({
  setModel: () => {},
  model: "Ollama",
});

interface ModelProviderProps {
  children: ReactNode;
}

export function ModelProvider({ children }: ModelProviderProps) {
  const [model, setModel] = useState<string>("Ollama");

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel(): ModelContextProps {
  return useContext(ModelContext);
}
