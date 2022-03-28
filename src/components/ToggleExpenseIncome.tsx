import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ToggleButton } from "@mui/material";
import { updateAmmount, updateIncomeExpense } from "../stores/incomeExpense";
import { store } from "../stores/store";
import { useAppSelector } from "../stores/reduxHooks";
import { ExpenseIncome } from "../App";

interface ToggleExpenseIncomeProps {
  index: number;
}

const ToggleExpenseIncome: React.FC<ToggleExpenseIncomeProps> = ({ index }) => {
  const list: ExpenseIncome[] = useAppSelector(
    (state) => state.incomeExpense.value
  );

  const handleClick = (value: boolean) => {
    store.dispatch(
      updateIncomeExpense({
        index: index,
        value: value,
      })
    );
  };

  return (
    <ToggleButtonGroup value={list[index].isExpense} className="p-0" fullWidth>
      <ToggleButton
        value={false}
        title="Income"
        onClick={() => handleClick(false)}
      >
        Income
      </ToggleButton>
      <ToggleButton
        value={true}
        title="Expense"
        onClick={() => handleClick(true)}
      >
        Expense
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleExpenseIncome;
