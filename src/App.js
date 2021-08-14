import "./styles.css";
import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <Meeting></Meeting>
    </div>
  );
}

function Meeting() {
  const today = new Date()
    .toLocaleString()
    .slice(0, 10)
    .split("/")
    .reverse()
    .join("-");
  const currentTime = new Date().toLocaleString().slice(12, 17);
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState(currentTime);
  const [endTime, setEndTime] = useState(currentTime);
  const [roomId, setRoomId] = useState("room1");

  const slotArray = Array.from({ length: 24 }, (v, i) => {
    return { id: i + 1, height: 0, startTimeMinute: 0 };
  });

  let startTimeHour = Number(startTime.split(":")[0]);
  let startTimeMinute = Number(startTime.split(":")[1]);
  let endTimeHour = Number(endTime.split(":")[0]);
  let endTimeMinute = Number(endTime.split(":")[1]);
  let height =
    endTimeHour === startTimeHour
      ? endTimeMinute - startTimeMinute
      : (endTimeHour - startTimeHour) * 60 -
        Math.abs(endTimeMinute - startTimeMinute);

  const slotJsx = slotArray.map((item) => {
    return (
      <div className={`slot`} key={item.id} id={item.id}>
        <span className="time">{item.id}</span>
        <div
          className={startTimeHour == item.id ? "active" : ""}
          style={{ height: height + "px", marginTop: startTimeMinute }}
        ></div>
      </div>
    );
  });

  const handleBooking = () => {
    slotArray.map((item) => {
      return {
        ...item,
        height: height,
        startTimeMinute: startTimeMinute
      };
    });
  };

  return (
    <div className="container">
      <div className="left-content">
        Date
        <input
          type="date"
          id="myDate"
          name="myDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        Start Time
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        ></input>
        End Time
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        ></input>
        Room
        <select
          name="room"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        >
          <option value="room1">Room1</option>
          <option value="room2">Room2</option>
          <option value="room3">Room3</option>
        </select>
        <button onClick={handleBooking}>Book</button>
      </div>
      <div className="right-content">{slotJsx}</div>
    </div>
  );
}
