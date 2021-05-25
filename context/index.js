import { createContext, useEffect, useReducer } from "react";

//initial state
const initialState = {
  user: null,
};
//create context
const Context = createContext();

//root reducer

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,

        user: action.payload,
      };

    case "LOGOUT":
      console.log("context-logging out");
      window.localStorage.removeItem("EprUser");

      return { ...state, user: { token: null, status: "0" } };
    default:
      return state;
  }
};

//context provider

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  //preserves state on refresh
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("EprUser"));

    // console.log("use effect inside context", user);
    dispatch({
      type: "LOGIN",
      payload: user,
    });
  }, []);
  ///

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
