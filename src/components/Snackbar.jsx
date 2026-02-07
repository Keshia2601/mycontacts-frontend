import { useEffect } from "react";
import { useNotification } from "../context/NotificationContext";
import "./Snackbar.css";

function Snackbar() {
  const { notification, closeNotification } = useNotification();

  useEffect(() => {
    if (!notification.open) return;

    const timer = setTimeout(() => {
      closeNotification();
    }, 3000);
    return () => clearTimeout(timer);
  }, [notification.open, closeNotification]);

  if (!notification.open) return null;

  return (
    <div className={`snackbar ${notification.type}`}>
      {notification.message}
    </div>
  );
}

export default Snackbar;
