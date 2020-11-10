import { createContext } from "react";
import { CounterActionTypes } from "./action";
import { CounterStateType } from "./state";

type CounterContextType = {
  state: CounterStateType;
  dispatch: React.Dispatch<CounterActionTypes>;
};

export const CounterContext = createContext({} as CounterContextType);
