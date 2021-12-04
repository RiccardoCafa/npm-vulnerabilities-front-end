import React, { useContext } from 'react';

import { UserContext } from './User';

export default function useUser() {
  const userState = useContext(UserContext);

  return userState;
}