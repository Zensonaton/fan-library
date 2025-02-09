import { useState, useEffect } from "react";

/**
 * Hook, возвращающий true, если в браузере включена тёмная тема, и false, если светлая.
 * @returns {boolean} - true, если включена тёмная тема, и false, если светлая.
 */
const useDarkMode = (): boolean => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
			console.debug("Dark mode enabled: ", event.matches);

      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isDarkMode;
};

export default useDarkMode;
