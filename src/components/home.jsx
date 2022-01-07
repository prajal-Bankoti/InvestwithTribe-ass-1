import { useEffect, useState } from "react";
import { ShowDate } from "./date";
import { Display } from "./show";
import BasicDateRangePicker from "./datepicker";
import "./style.css";
export function Home() {
  const [data, setData] = useState([[], [], []]);
  const [select, setSelect] = useState();
  const [show, setShow] = useState(true);
  const [cal, setCal] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetch("https://www.gov.uk/bank-holidays.json");
      const res = await data.json();
      const setdata = [];
      for (const key in res) {
        setdata.push(res[key].events);
      }
      console.log(res);
      setData(setdata);
    }
    getData();
  }, []);

  return (
    <div>
      <div className="navbar">
        <select
          name=""
          id="country-s"
          onChange={(e) => {
            setSelect(e.target.value);
            setShow(true);
            console.log(e.target.value);
          }}
        >
          <option value="elgland">england</option>
          <option value="ireland">northern-ireland</option>
          <option value="scotland">scotland</option>
        </select>
        <select
          name=""
          id="country-s"
          onChange={(e) => {
            if (e.target.value === "1") {
              setCal(ShowDate(data, 1, select));
            } else if (e.target.value === "7") {
              setCal(ShowDate(data, 7, select));
            } else {
              setCal(ShowDate(data, 30, select));
            }
            setShow(false);
          }}
        >
          <option value="1">yesterday</option>
          <option value="7">last week</option>
          <option value="30">last month</option>
        </select>
      </div>
      <div style={{ width: "30%", margin: "auto" }}>
        {" "}
        <BasicDateRangePicker date={[data, 7, select,setCal,setShow]} />
      </div>

      {show ? (
        select === "scotland" ? (
          <Display data={data[1]} />
        ) : select === "ireland" ? (
          <Display data={data[2]} />
        ) : (
          <Display data={data[0]} />
        )
      ) : (
        <Display data={cal} />
      )}
    </div>
  );
}
