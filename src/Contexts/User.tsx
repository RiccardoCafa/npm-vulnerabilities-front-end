import React, { useState, createContext, ReactNode } from "react";

import { UserContextData, UserState } from '../Components/React/data/userModel';

const initialState: UserContextData = {
    answers: [],
    apiKey: '',
    setUserState: () => {}
}

const UserContext = createContext<UserContextData>(initialState);

function Provider({ children }: { children: ReactNode }) {
  const [userState, setUserState] = useState<UserState>(initialState);

  return (
    <UserContext.Provider value={{...userState, setUserState}}>{children}</UserContext.Provider>
  );
}

export default Provider;
export { UserContext };