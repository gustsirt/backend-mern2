import ConfigProvider from "./ContextConfig.jsx"
import UserProvider from "./ContextUser.jsx"

const ContextProvider = ({children}) => {
  return (
    <ConfigProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </ConfigProvider>
  )
}

export default ContextProvider