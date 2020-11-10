export const CounterActionNames = {
  increment: "Counter/increment",
  decrement: "Counter/decrement",
  multiply: "Counter/multiply",
  divide: "Counter/divide",
  reset: "Counter/reset",
} as const;

export const incrementCountAction = () => ({
  type: CounterActionNames.increment,
});

export const decrementCountAction = () => ({
  type: CounterActionNames.decrement,
});

export const multiplyCountAction = (inputValue: number) => ({
  type: CounterActionNames.multiply,
  payload: {
    inputValue,
  },
});

export const divideCountAction = (inputValue: number) => ({
  type: CounterActionNames.divide,
  payload: {
    inputValue,
  },
});

export const resetCountAction = () => ({
  type: CounterActionNames.reset,
});

export type CounterActionTypes =
  | ReturnType<typeof incrementCountAction>
  | ReturnType<typeof decrementCountAction>
  | ReturnType<typeof multiplyCountAction>
  | ReturnType<typeof divideCountAction>
  | ReturnType<typeof resetCountAction>;
