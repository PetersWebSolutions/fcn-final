import { useEffect, useState } from "react";

type Status = {
  isOpen: boolean;
  label: string;
  nextLabel: string;
};

function getManilaNow(): Date {
  // Get current time in Asia/Manila timezone
  const now = new Date();
  const manilaString = now.toLocaleString("en-US", { timeZone: "Asia/Manila" });
  return new Date(manilaString);
}

function getStatus(now: Date = getManilaNow()): Status {
  const day = now.getDay(); // 0 Sun, 1 Mon, ... 6 Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeInMinutes = hour * 60 + minute;

  const isWeekday = day >= 1 && day <= 5;
  const isSaturday = day === 6;

  // Open hours: Mon-Fri 8:00-17:00, Sat 8:00-16:00
  const openWeekday = timeInMinutes >= 8 * 60 && timeInMinutes < 17 * 60;
  const openSaturday = timeInMinutes >= 8 * 60 && timeInMinutes < 16 * 60;

  const isOpen = (isWeekday && openWeekday) || (isSaturday && openSaturday);

  if (isOpen) {
    return {
      isOpen: true,
      label: "Open now — walk-ins welcome",
      nextLabel: "",
    };
  }

  // Closed — find next open day/time
  // Build next open message
  let nextDay = day;
  let daysAhead = 0;
  // Look ahead up to 7 days
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (d >= 1 && d <= 6) {
      // Mon-Sat has opening
      daysAhead = i;
      nextDay = d;
      break;
    }
  }

  let nextText = "open tomorrow at 8am";
  if (daysAhead === 1) {
    // Check if tomorrow is Sunday (closed)
    const tomorrow = (day + 1) % 7;
    if (tomorrow === 0) {
      nextText = "open Monday at 8am";
    } else {
      nextText = "open tomorrow at 8am";
    }
  } else if (daysAhead > 1) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    nextText = `open ${dayNames[nextDay]} at 8am`;
  }

  // Special case: today is Saturday after 4pm -> tomorrow Sunday closed, so Monday
  if (day === 6 && timeInMinutes >= 16 * 60) {
    nextText = "open Monday at 8am";
  }
  if (day === 0) {
    nextText = "open tomorrow at 8am"; // Monday
  }

  return {
    isOpen: false,
    label: "Now closed",
    nextLabel: nextText,
  };
}

export default function OpenStatusBar() {
  const [status, setStatus] = useState<Status>(() => getStatus());

  useEffect(() => {
    const update = () => setStatus(getStatus());
    update();
    const id = setInterval(update, 60 * 1000); // update every minute
    return () => clearInterval(id);
  }, []);

  const hoursText = "Mon-Fri 8:00 AM – 5:00 PM · Sat 8:00 AM – 4:00 PM";

  return (
    <div className="relative w-full overflow-hidden border-b border-white/10 bg-navy-950 text-white">
      {/* subtle blueprint texture */}
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative flex items-center">
        {/* Left fixed status with blinking light */}
        <div className="hidden shrink-0 items-center gap-2.5 border-r border-white/10 bg-navy-900/80 px-4 py-2.5 backdrop-blur-sm sm:flex lg:px-6">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${status.isOpen ? "bg-emerald-400" : "bg-amber-400"}`}
              style={{ animationDuration: "1.8s" }}
            />
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${status.isOpen ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"}`}
            />
            <span
              className={`animate-pulse-dot absolute inline-flex h-full w-full rounded-full ${status.isOpen ? "bg-emerald-500" : "bg-amber-500"}`}
            />
          </span>
          <span className={`text-[0.72rem] font-bold tracking-wide ${status.isOpen ? "text-emerald-300" : "text-yellow-300"}`}>
            {status.isOpen ? status.label : `${status.label}, ${status.nextLabel}`}
          </span>
        </div>

        {/* Mobile fixed status */}
        <div className="flex shrink-0 items-center gap-2 border-r border-white/10 bg-navy-900/80 px-3 py-2.5 backdrop-blur-sm sm:hidden">
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${status.isOpen ? "bg-emerald-400" : "bg-amber-400"}`}
              style={{ animationDuration: "1.8s" }}
            />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${status.isOpen ? "bg-emerald-400" : "bg-amber-400"}`} />
          </span>
          <span className={`text-[0.7rem] font-bold ${status.isOpen ? "text-emerald-300" : "text-yellow-300"}`}>
            {status.isOpen ? "Open now" : "Closed"}
          </span>
        </div>

        {/* Scrolling marquee */}
        <div className="flex flex-1 overflow-hidden py-2.5">
          <div className="animate-marquee flex w-max items-center" style={{ animationDuration: "28s" }}>
            {/* Duplicate tracks for seamless loop */}
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center">
                <span className="flex items-center gap-2 whitespace-nowrap px-5 text-[0.72rem] font-semibold tracking-wide text-white">
                  <span className="relative flex h-2 w-2 sm:hidden">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${status.isOpen ? "bg-emerald-400" : "bg-amber-400"}`} style={{ animationDuration: "1.8s" }} />
                    <span className={`relative inline-flex h-2 w-2 rounded-full ${status.isOpen ? "bg-emerald-400" : "bg-amber-400"}`} />
                  </span>
                  <span className="text-white">
                    {status.isOpen ? "● Open now — walk-ins welcome" : `● ${status.label}, ${status.nextLabel}`}
                  </span>
                  <span className="mx-2 h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-white">{hoursText}</span>
                  <span className="mx-2 h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-white">Room 601 San Luis Terrace, Kalaw Ave. Ermita Manila</span>
                  <span className="mx-2 h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-white">Room 601 · Walk-ins welcome</span>
                  <span className="mx-3 text-white/20">·</span>
                </span>
                <span className="flex items-center gap-2 whitespace-nowrap px-5 text-[0.72rem] font-semibold tracking-wide text-white">
                  <span className="text-white">
                    {status.isOpen ? "● Open now" : "● Now closed"}
                  </span>
                  <span className="mx-2 h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-white">{hoursText}</span>
                  <span className="mx-2 h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-white">Room 601 San Luis Terrace, Kalaw Ave. Ermita Manila</span>
                  <span className="mx-2 h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-white">FCN Medical & Vaccination Center</span>
                  <span className="mx-3 text-white/20">·</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right hours fixed on desktop */}
        <div className="hidden shrink-0 items-center gap-2 border-l border-white/10 bg-navy-900/50 px-4 py-2.5 text-[0.68rem] font-medium tracking-wide text-white backdrop-blur-sm lg:flex">
          <span className="text-white/60">Hours:</span>
          <span className="font-semibold text-white">{hoursText}</span>
        </div>
      </div>
    </div>
  );
}
