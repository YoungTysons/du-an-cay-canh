import React from "react";
import { useClock } from "../hooks/useClock";
import "./LichVaGio.css";

const LichVaGio = () => {
  const { ngayThang, gioPhutGiay } = useClock();

  return (
    <div className="top-bar-info">
      <div className="clock-item">
        <span className="icon">🕒</span>
        <span className="time-text">{gioPhutGiay}</span>
      </div>
      <div className="calendar-item">
        <span className="icon">📅</span>
        <span className="date-text">{ngayThang}</span>
      </div>
    </div>
  );
};

export default LichVaGio;
