import { createContext, useContext, useReducer } from "react";

const initialState = {
  amount: "",
  payment: "",
  amountinEth: "",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "Deposit":
      return {
        ...state,
        amount: payload.amount,
        paymentType: payload.type,
        amountinEth: payload.amountinEth,
      };

    case "Setpayment":
      return {
        ...state,
        payment: payload,
      };

    case "setEth":
      return {
        ...state,
        amountinEth: payload.amountinEth,
      };
    default:
      return state;
  }
}

const Finance = createContext();

function FinanceContext({ children }) {
  const [{ amount, payment, amountinEth }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <Finance.Provider value={{ amount, dispatch, payment, amountinEth }}>
      {children}
    </Finance.Provider>
  );
}

export default FinanceContext;

export function useFinance() {
  const context = useContext(Finance);
  if (context === undefined)
    throw new Error(
      "you are trying to acces the finance context outside its provider"
    );

  return context;
}
