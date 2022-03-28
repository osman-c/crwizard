import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface FilterExpProps {
  getter: boolean | null;
  setter: Dispatch<SetStateAction<boolean | null>>;
}

const FilterExp: React.FC<FilterExpProps> = ({ getter, setter }) => {
  const handleClick = (res: boolean | null) => {
    setter(res);
  };

  return (
    <ToggleButtonGroup value={getter} className="p-0">
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
      <ToggleButton
        value={null}
        title="Expense"
        onClick={() => handleClick(true)}
      >
        Both
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FilterExp;
