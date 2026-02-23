'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { AppConfig, DEFAULT_CONFIG, WidgetId } from './config.schema'
import { getStoredConfig, saveStoredConfig } from './config.storage'

type ConfigContextValue = {
  config: AppConfig
  toggleWidget: (widgetId: WidgetId) => void
  resetConfig: () => void
}

const ConfigContext = createContext<ConfigContextValue | null>(null)

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(() => getStoredConfig())

  useEffect(() => {
    saveStoredConfig(config)
  }, [config])

  const toggleWidget = useCallback((widgetId: WidgetId) => {
    setConfig((prev) => ({
      ...prev,
      widgets: {
        ...prev.widgets,
        [widgetId]: !prev.widgets[widgetId],
      },
    }))
  }, [])

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
  }, [])

  const value = useMemo(
    () => ({
      config,
      toggleWidget,
      resetConfig,
    }),
    [config, toggleWidget, resetConfig],
  )

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return context
}
