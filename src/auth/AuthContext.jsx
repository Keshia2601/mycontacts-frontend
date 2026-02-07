import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/axios.js";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // run once on app load
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token")

    if(!tokenFromStorage){
      setLoading(false)
      return
    }
    api.defaults.headers.common.Authorization = `Bearer ${tokenFromStorage}`;

    const loadUser = async () => {
      try {
        const res = await api.get("/users/current")
        setUser(res.data)
        setIsAuthenticated(true)
      } catch (err) {
        localStorage.removeItem("token")
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email, password) => {
    const res = await api.post("/users/login", { email, password })
    localStorage.setItem("token", res.data.accessToken)

    const userRes = await api.get("/users/current")
    setUser(userRes.data)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    delete api.defaults.headers.common.Authorization;
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
