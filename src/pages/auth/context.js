import React, { createContext, useState } from 'react';

// Create a context
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [value, setValue] = useState("default value");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};
