import { createContext, useReducer } from 'react'
import alertReducer from './AlertReducer'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)

  const setAlert = (msg) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg },
    })
    setTimeout(() => dispatch({ type: 'CLEAR_ALERT' }), 3500)
  }

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext
