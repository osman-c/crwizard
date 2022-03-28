import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import currencies from "currencies.json";
import { useState } from "react";
import { ExpenseIncome } from "../App";
import { updateCurrency } from "../stores/incomeExpense";
import { useAppSelector } from "../stores/reduxHooks";
import { store } from "../stores/store";

interface CurrencyProps {
  index: number;
}

const Currency: React.FC<CurrencyProps> = ({ index }) => {
  const [inputValue, setInputValue] = useState<string>();

  const list: ExpenseIncome[] = useAppSelector(
    (state) => state.incomeExpense.value
  );

  const handleChange = (value: string | null) => {
    store.dispatch(
      updateCurrency({
        index: index,
        value: value,
      })
    );
  };
  const currencyList = currencies.currencies;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={currencyList.map((c) => c.code)}
      value={list[index].currency}
      onChange={(event: any, newValue: string | null) => {
        handleChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Currency" variant="standard" />
      )}
    />
  );
};

export default Currency;
