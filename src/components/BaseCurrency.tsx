import { Autocomplete, TextField } from "@mui/material";
import currencies from "currencies.json";
import { Dispatch, SetStateAction, useState } from "react";

interface BaseCurrencyProps {
  getter: string | null;
  setter: Dispatch<SetStateAction<string | null>>;
}

const BaseCurrency: React.FC<BaseCurrencyProps> = ({ getter, setter }) => {
  const [inputValue, setInputValue] = useState<string>();
  const currencyList = currencies.currencies;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={currencyList.map((c) => c.code)}
      value={getter ? getter : ""}
      onChange={(event: any, newValue: string | null) => {
        setter(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Currency" variant="standard" />
      )}
    />
  );
};

export default BaseCurrency;
