import { CounterActionNames, CounterActionTypes } from "./";
import { counterInitialState, CounterStateType } from "./state";

export const counterReducer = (
  state: CounterStateType = counterInitialState,
  action: CounterActionTypes
) => {
  switch (action.type) {
    case CounterActionNames.increment:
      return { count: state.count + 1 };
    case CounterActionNames.decrement:
      return { count: state.count - 1 };
    case CounterActionNames.multiply:
      return { count: state.count * action.payload.inputValue };
    case CounterActionNames.divide:
      return { count: state.count / action.payload.inputValue };
    case CounterActionNames.reset:
      return { count: counterInitialState.count };
    default:
      throw new Error();
  }
};
