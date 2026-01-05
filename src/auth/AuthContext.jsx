import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/axios.js";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // run once on app load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get("/users/current", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser(res.data)
        setIsAuthenticated(true)
      } catch (err) {
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email, password) => {
    const res = await api.post("api/users/login", { email, password })
    localStorage.setItem("token", res.data.accessToken)

    const userRes = await api.get("/users/current")
    setUser(userRes.data)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
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
