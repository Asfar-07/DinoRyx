import React from "react";
import './notifyicon.css'
import { FaRegBell} from "react-icons/fa";

export default function NotifyIcon() {
  return (
    <div className="header-notify-bell">
      <button>
        <FaRegBell />
        <samp></samp>
      </button>
    </div>
  );
}
