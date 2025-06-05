// src/context/ConfigContext.tsx
"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { normalizeConfig } from "../config/configFixTypes";
import localConfig from "../config/localConfig";

interface ConfigContextType {
  config: any;
  isHydrated: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({
  children,
  config: propConfig,
}: {
  children: ReactNode;
  config?: any;
}) {
  // Use the provided config or fall back to localConfig
  const [config] = useState(normalizeConfig(propConfig || localConfig));
  // Track if the context is hydrated
  const [isHydrated, setIsHydrated] = useState(false);

  // Set hydrated state after mount
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <ConfigContext.Provider value={{ config, isHydrated }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context.config;
}

// New hook to check if config is hydrated
export function useConfigHydration() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfigHydration must be used within a ConfigProvider");
  }
  return context.isHydrated;
}
