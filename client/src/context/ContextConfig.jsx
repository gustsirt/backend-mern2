import { createContext, useState } from 'react'

export const ContextConfig = createContext()

const ConfigProvider = ({children}) => {
  const [config, setConfig] = useState({
    uriBase: "http://localhost:8080"
  })

  return (
    <ContextConfig.Provider value={config}>
      {children}
    </ContextConfig.Provider>
  )
}

export default ConfigProvider