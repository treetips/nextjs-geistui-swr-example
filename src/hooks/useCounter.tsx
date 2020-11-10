import { useCallback, useReducer } from "react";
import { ContextDevTool } from "react-context-devtool";
import {
  CounterContext,
  counterInitialState,
  counterReducer,
  decrementCountAction,
  divideCountAction,
  incrementCountAction,
  multiplyCountAction,
  resetCountAction,
} from "../store/context-api";

/**
 * Custom Hooks for Counter
 * @author treetips
 */
export const useCounter = () => {
  const [state, dispatch] = useReducer(counterReducer, counterInitialState);

  /**
   * n + 1
   */
  const incrementCount = useCallback(() => {
    dispatch(incrementCountAction());
  }, [dispatch]);

  /**
   * n - 1
   */
  const decrementCount = useCallback(() => {
    dispatch(decrementCountAction());
  }, [dispatch]);

  /**
   * n * 1
   */
  const multiplyCount = useCallback(
    (inputValue: number) => {
      dispatch(multiplyCountAction(inputValue));
    },
    [dispatch]
  );

  /**
   * n / 1
   */
  const divideCount = useCallback(
    (inputValue: number) => {
      dispatch(divideCountAction(inputValue));
    },
    [dispatch]
  );

  /**
   * Reset count
   */
  const resetCount = useCallback(() => {
    dispatch(resetCountAction());
  }, [dispatch]);

  /**
   * Get Context Provider of Counter
   */
  const CounterContextProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    return (
      <CounterContext.Provider value={{ state, dispatch }}>
        <ContextDevTool
          context={CounterContext}
          id="CounterContext.Provider"
          displayName="Counter/Provider"
          disable={process.env.NODE_ENV === "production"}
        />
        {children}
      </CounterContext.Provider>
    );
  };

  return {
    CounterContextProvider,
    incrementCount,
    decrementCount,
    multiplyCount,
    divideCount,
    resetCount,
    counterState: state,
  } as const;
};
