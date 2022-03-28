import React, { useEffect, useState } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "./stores/reduxHooks";
import { add, remove } from "./stores/incomeExpense";
import { AppDispatch, store } from "./stores/store";
import Button from "@mui/material/Button";

import ExpenseIncomeComponent from "./components/ExpenseIncome";
import BaseCurrency from "./components/BaseCurrency";
import FilterExp from "./components/FilterExp";

export interface ExpenseIncome {
  isExpense: boolean;
  name: string;
  ammount: string;
  currency: string;
}

const lightGreen = "#81c784";
const mainGreen = "#66bb6a";
const lightRed = "#e57373";
const mainRed = "#f44336";

function App() {
  const [filterExpense, setFilterExpense] = useState<boolean | null>(null);
  const [filterCurrency, setFilterCurrency] = useState<string | null>(null);

  const [baseCurrency, setBaseCurrency] = useState<string | null>("USD");
  const [rates, setRates] = useState<any>();
  const [result, setResult] = useState<string>();

  const list: ExpenseIncome[] = useAppSelector(
    (state) => state.incomeExpense.value
  );

  const [filteredList, setFilteredList] = useState<ExpenseIncome[]>(list);

  const getRate = async () => {
    fetch(
      "http://api.exchangeratesapi.io/v1/latest?access_key=3437e40c0a92d626a6864e0d5b21f268"
    )
      .then((res) => res.json())
      .then((res) => setRates(res.rates));
  };

  useEffect(() => {
    getRate();
  }, []);

  useEffect(() => {
    const payload = {
      value: list,
    };
    localStorage.setItem("list", JSON.stringify(payload));
    setFilteredList(list);
  }, [list]);

  const addToList = () => {
    store.dispatch(add());
    // useAppDispatch((state) => state.incomeExpense)
  };

  const deleteFromList = (index: number) => {
    store.dispatch(remove(index));
  };

  const calculate = () => {
    let total = 0;
    list.forEach((l) => {
      if (l.isExpense) total -= rates[l.currency] * parseFloat(l.ammount);
      else total += rates[l.currency] * parseFloat(l.ammount);
    });
    total = total / rates[baseCurrency ? baseCurrency : "EUR"];
    setResult(total + " " + baseCurrency);
  };

  const validate = () => {
    if (list) {
      for (let i = 0; i < list.length; i++) {
        if (!list[i].ammount || !list[i].currency) return false;
      }
      return true;
    } else return false;
  };

  const filter = () => {
    const newList = () => {
      if (filterCurrency == null)
        return list.filter((l) => l.isExpense == filterExpense);
      else if (filterExpense == null)
        return list.filter((l) => l.currency == filterCurrency);
      else
        return list.filter(
          (l) => l.isExpense == filterExpense && l.currency == filterCurrency
        );
    };
    setFilteredList(newList);
  };

  const cancelFilter = () => {
    setFilteredList(list);
  };

  return (
    <Container maxWidth="lg" className="mt-5">
      <div className="is-flex mb-5 gap">
        <FilterExp getter={filterExpense} setter={setFilterExpense} />
        <BaseCurrency getter={filterCurrency} setter={setFilterCurrency} />
        <Button
          onClick={filter}
          size={"large"}
          className="ml-3"
          variant="contained"
          disabled={filterCurrency == null && filterExpense == null}
        >
          Filter
        </Button>
        <Button
          onClick={cancelFilter}
          size={"large"}
          className="ml-3"
          variant="outlined"
        >
          Cancel Filter
        </Button>
      </div>
      <Paper>
        <div className="row-layout">
          {list
            ? filteredList.map((item, key) => (
                <ExpenseIncomeComponent
                  key={key}
                  index={key}
                  deleteFromList={deleteFromList}
                />
              ))
            : "???"}
        </div>
        <Button onClick={addToList} size={"large"} fullWidth>
          Add Another
        </Button>
      </Paper>
      <div className="is-flex mt-5">
        <BaseCurrency getter={baseCurrency} setter={setBaseCurrency} />
        <Button
          onClick={calculate}
          size={"large"}
          className="ml-3"
          variant="contained"
          disabled={!validate() || !baseCurrency}
        >
          Calculate
        </Button>
      </div>
      {result && <div className="content is-large mt-3">{result}</div>}
    </Container>
  );
}

export default App;
