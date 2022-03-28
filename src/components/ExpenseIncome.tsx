import { IconButton } from "@mui/material";
import Ammount from "./Ammount";
import Currency from "./Currency";
import Name from "./Name";
import ToggleExpenseIncome from "./ToggleExpenseIncome";
import DeleteIcon from "@mui/icons-material/Delete";

interface ExpenseIncomeProps {
  index: number;
  deleteFromList: (index: number) => void;
}

const ExpenseIncome: React.FC<ExpenseIncomeProps> = ({
  index,
  deleteFromList,
}) => {
  return (
    <div className="columns">
      <div className="column">
        <ToggleExpenseIncome index={index} />
      </div>
      <div className="column">
        <Name index={index} />
      </div>
      <div className="column">
        <Currency index={index} />
      </div>
      <div className="column">
        <div className="is-flex">
          <Ammount index={index} />
          <IconButton
            aria-label="delete"
            title="Remove Row"
            className="ml-3"
            onClick={() => deleteFromList(index)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ExpenseIncome;
