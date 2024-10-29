import { getFormattedNumber } from "../lib/util";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTimerActive, increaseTimes } from "../redux/timerSlice";

export default function Timer() {
  const { times, timerActive } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval: number | undefined;
    if (times >= 999) {
      dispatch(setTimerActive(false));
    }
    if (timerActive) {
      interval = setInterval(() => {
        dispatch(increaseTimes());
      }, 1000);
    } else if (!timerActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, times]);

  return (
    <div className="flex justify-center items-center w-10 h-8 border">
      {getFormattedNumber(times)}
    </div>
  );
}
