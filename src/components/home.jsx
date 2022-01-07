import { useEffect, useState } from "react";
export function Home() {
  const [data, setData] = useState([[], [], []]);
  const [select, setSelect] = useState();
  const [show, setShow] = useState();
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
        onChange={() => {
          const filter = data[2].filter((e) => {
            var day1 = new Date(e.date);
            var day2 = new Date("2022-01-07");

            var difference = Math.abs(day2 - day1);
            var days = difference / (1000 * 3600 * 24);
            console.log(days, e.date);
            return days <= 7;
          });
          console.log(filter);
        }}
      >
        <option value="elgland">yesterday</option>
        <option value="ireland">last week</option>
        <option value="scotland">last month</option>
      </select>

      {select === "scotland" ? (
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
      )}
    </div>
  );
}
