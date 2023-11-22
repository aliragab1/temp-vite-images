import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

function getInitialDarkMode() {
  const prefersDerkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  // console.log(prefersDerkMode);
  const storedDarkMode = localStorage.getItem("darkTheme") === "true";
  // console.log(storedDarkMode);

  return storedDarkMode || prefersDerkMode;
}

function AppProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("cat");

  function toggleDarkTheme() {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  }

  useEffect(
    function () {
      document.body.classList.toggle("dark-theme", isDarkTheme);
    },
    [isDarkTheme]
  );

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const value = useContext(AppContext);
  if (value === undefined)
    throw new Error("AppContext was used outside of the AppProvider");
  return value;
}

export { AppProvider, useAppContext };
