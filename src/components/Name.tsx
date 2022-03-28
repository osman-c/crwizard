import { TextField } from "@mui/material";
import { ExpenseIncome } from "../App";
import { updateAmmount, updateName } from "../stores/incomeExpense";
import { useAppSelector } from "../stores/reduxHooks";
import { store } from "../stores/store";

interface NameProps {
  index: number;
}

const Name: React.FC<NameProps> = ({ index }) => {
  const list: ExpenseIncome[] = useAppSelector(
    (state) => state.incomeExpense.value
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.dispatch(
      updateName({
        index: index,
        value: e.target.value,
      })
    );
  };

  return (
    <TextField
      id="standard-basic"
      label={list[index].isExpense ? "Expense Name" : "Income Name"}
      variant="standard"
      value={list[index].name}
      fullWidth
      onChange={handleChange}
    />
  );
};

export default Name;
