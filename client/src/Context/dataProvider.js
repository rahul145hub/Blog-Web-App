import { useSnackbar } from "notistack";
import { createContext, useState } from "react"

export const DataContext = createContext(null)

const DataProvider = ({ children }) => {
   const [account, setAccount] = useState({ email: "", name: "" })
   const { enqueueSnackbar } = useSnackbar();
   return (
      <DataContext.Provider value={{
         account, setAccount, enqueueSnackbar
      }}>
         {children}
      </DataContext.Provider>
   )
}

export default DataProvider