import { useEffect, useState } from "react";
import { ShowDate } from "./date";
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
      <select
        name=""
        id=""
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
        id=""
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
      {show ? (
        select === "scotland" ? (
          <div>
            {data[1].map((e, index) => (
              <div key={index}>{e.title}</div>
            ))}
          </div>
        ) : select === "ireland" ? (
          <div>
            {data[2].map((e, index) => (
              <div key={index}>{e.title}</div>
            ))}
          </div>
        ) : (
          <div>
            {data[0].map((e, index) => (
              <div key={index}>{e.title}</div>
            ))}
          </div>
        )
      ) : (
        <div>
          {" "}
          {cal.map((e, index) => (
            <div key={index}>
              {e.title}
              {e.date}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
