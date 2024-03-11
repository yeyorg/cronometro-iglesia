import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TEXT_COLOR, TIMEOUT_PATH_COLOR } from "./logic/const.js";
import { useState, useEffect } from "react";
import { PauseIcon, PlayIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Modal } from "./components/Modal.jsx";

export function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [progressBarPercentage, setProgressBarPercentage] = useState(0);
  const [previousTick, setPreviousTick] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [isModalOn, setModalOn] = useState(false);

  // updating seconds and minutes
  const tick = () => {
    return setTimeout(() => {
      if (seconds >= 59) {
        setSeconds(0);
        setMinutes(minutes - 1);
      } else {
        setSeconds(seconds - 1);
      }
      if (seconds === 0 && minutes === 0) resetTimmer();

      setProgressBarPercentage(
        Math.floor((100 * (seconds + minutes * 60)) / totalSeconds)
      );
    }, 1000);
  };

  const resetTimmer = () => {
    setSeconds(0);
    setMinutes(0);
    setIsPaused(true);
    setProgressBarPercentage(0);
  };

  const initTimer = (endTime) => {
    const minutesLeft =
      Math.floor((endTime - Date.now()) / 1000 / 60) < 0
        ? 0
        : Math.floor((endTime - Date.now()) / 1000 / 60);

    const secondsLeft =
      Math.floor((endTime - Date.now()) / 1000) - minutesLeft * 60 < 0
        ? 0
        : Math.floor((endTime - Date.now()) / 1000) - minutesLeft * 60;

    const play = !(seconds === 0 && minutes === 0);

    setTotalSeconds(secondsLeft + minutesLeft * 60);
    setProgressBarPercentage(100);
    setMinutes(minutesLeft);
    setSeconds(secondsLeft);
    setIsPaused(play);
    setModalOn(false);
  };

  // Tick when is not paused
  useEffect(() => {
    !isPaused ? setPreviousTick(tick()) : clearTimeout(previousTick);
  }, [isPaused, seconds]);

  // * Render de la APP
  return (
    <>
      {isModalOn && <Modal setOpenModal={setModalOn} initTimer={initTimer} />}
      <div>
        <h1>Hacedlo todo decentemente y con orden</h1>
      </div>
      <article>
        <section>
          <CircularProgressbar
            value={progressBarPercentage}
            text={`${(minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)}`}
            styles={buildStyles({
              textColor: TEXT_COLOR,
              pathColor: TIMEOUT_PATH_COLOR,
              textSize: `18px`,
            })}
          />
        </section>
      </article>
      <aside>
        <button
          onClick={() => {
            setIsPaused(!isPaused);
          }}
        >
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </button>
        <button
          onClick={() => {
            setModalOn(!isModalOn);
          }}
        >
          <Cog6ToothIcon />
        </button>
      </aside>
    </>
  );
}
