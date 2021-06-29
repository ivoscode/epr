import { createContext, useEffect, useReducer } from "react";
//initial state
const initialState = {};
//create context
const Context = createContext();

//root reducer

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...action.payload,
      };

    case "LOGOUT":
      console.log("context-logging out");
      window.sessionStorage.removeItem("EprUser");
      window.sessionStorage.clear();
      window.location.replace("/");

      return {};

    default:
      return state;
  }
};

//context provider

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  //preserves state on refresh
  useEffect(() => {
    const userState = JSON.parse(window.sessionStorage.getItem("EprUser"));

    // console.log("use effect inside context", user);
    dispatch({
      type: "LOGIN",
      payload: userState,
    });
  }, []);
  ///

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
