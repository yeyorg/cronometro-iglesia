import "./modal.css";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";

export function Modal({ setOpenModal, initTimer }) {
  const [value, setValue] = useState(dayjs(Date.now()));

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Seleccione la hora de finalizacion</h1>
        </div>
        <div className="body">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              timeSteps={{ hours: 1, minutes: 1 }}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              initTimer(value.$d);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
