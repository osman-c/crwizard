import TextField from "@mui/material/TextField";
import React, { FormEvent, useState } from "react";
import { ExpenseIncome } from "../App";
import { updateAmmount } from "../stores/incomeExpense";
import { useAppSelector } from "../stores/reduxHooks";
import { store } from "../stores/store";

interface AmmountProps {
  index: number;
}

const Ammount: React.FC<AmmountProps> = ({ index }) => {
  const list: ExpenseIncome[] = useAppSelector(
    (state) => state.incomeExpense.value
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.dispatch(
      updateAmmount({
        index: index,
        value: e.target.value,
      })
    );
  };

  return (
    <TextField
      id="standard-basic"
      label="Ammount"
      variant="standard"
      value={list[index].ammount}
      type="number"
      fullWidth
      onChange={handleChange}
    />
  );
};

export default Ammount;
