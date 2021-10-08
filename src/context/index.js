import React, {createContext, useState} from 'react';

const MyContext = createContext();

const MyContextProvider = props => {
  const [isSplash, setIsSplash] = useState(true);
  const value = {
    stores: {
      isSplash,
    },
    actions: {
      setIsSplash,
    },
  };

  return <MyContext.Provider value={value}>{props.children}</MyContext.Provider>;
};

export { MyContext, MyContextProvider }