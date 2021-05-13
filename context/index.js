import { createContext, useEffect, useReducer } from "react";

//initial state
const initialState = {
  user: { username: null },
};
//create context
const Context = createContext();

//root reducer

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      console.log("context-logging out");
      window.localStorage.removeItem("EprUser");
      return { ...state, user: { username: null } };
    default:
      return state;
  }
};

//context provider

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  //preserves state on refresh
  useEffect(() => {
    dispatch({
      type: "STORE-USER",
      payload: JSON.parse(window.localStorage.getItem("EprUser")),
    });
  }, []);
  ///

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
