'use client'

import { useLocalStorage } from './useLocalStorage'
import type { UserSettings } from '@/types'

const DEFAULT_SETTINGS: UserSettings = {
  distanceUnit: 'km',
  theme: 'dark',
}

export function useSettings() {
  const [settings, setSettings, isLoaded] = useLocalStorage<UserSettings>('amf_settings', DEFAULT_SETTINGS)

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  return { settings, updateSettings, isLoaded }
}
