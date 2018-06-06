// getFromStorage :: String -> (_ -> String)
export const getFromStorage = key => () => localStorage.getItem(key);

// setToStorage :: String -> (a -> b)
export const setToStorage = key => value => localStorage.setItem(key, value)
