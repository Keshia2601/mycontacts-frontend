import { useContext, createContext, useState } from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    open: false,
  });

  const showSuccess = (message) => {
    setNotification({ message, type: "success", open: true });
  };
  const showError = (message) => {
    setNotification({ message, type: "error", open: true });
  };
  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showSuccess,
        showError,
        closeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }
  return ctx;
};
