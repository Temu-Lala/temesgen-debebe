"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type LanguageContextType = {
  language: string
  setLanguage: (language: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en")

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)

