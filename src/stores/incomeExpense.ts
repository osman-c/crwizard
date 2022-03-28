import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpenseIncome } from "../App";
import type { RootState } from "./store";

// Define a type for the slice state

interface State {
  value: ExpenseIncome[];
}

export const getInitialState = () => {
  const item = localStorage.getItem("list");
  if (item != null) return JSON.parse(item);
  else {
    const def = {
      value: [
        {
          isExpense: true,
          name: "",
          ammount: "",
          currency: "",
        },
      ],
    };
    localStorage.setItem("list", JSON.stringify(def));
    return def;
  }
};
// Define the initial state using that type
const initialState: State = getInitialState();

interface UpdateAction {
  payload: {
    index: number;
    value: any;
  };
}

export const appSlice = createSlice({
  name: "expenseIncome",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state) => {
      state.value = [
        ...state.value,
        {
          isExpense: true,
          name: "",
          ammount: "",
          currency: "",
        },
      ];
      localStorage.setItem("value", JSON.stringify(state.value));
    },
    remove: (state, action) => {
      state.value = state.value.filter((v, i) => i != action.payload);
    },
    updateIncomeExpense: (state, action: UpdateAction) => {
      state.value[action.payload.index].isExpense = action.payload.value;
    },
    updateName: (state, action: UpdateAction) => {
      state.value[action.payload.index].name = action.payload.value;
    },
    updateCurrency: (state, action: UpdateAction) => {
      state.value[action.payload.index].currency = action.payload.value;
    },
    updateAmmount: (state, action: UpdateAction) => {
      state.value[action.payload.index].ammount = action.payload.value;
    },
  },
});

export const {
  add,
  remove,
  updateIncomeExpense,
  updateName,
  updateCurrency,
  updateAmmount,
} = appSlice.actions;

export default appSlice.reducer;
