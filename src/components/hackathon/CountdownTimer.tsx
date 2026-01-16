import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const targetDate = new Date("2026-01-18T00:00:00").getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 md:gap-6 justify-center">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-3 md:gap-6">
          <div className="flex flex-col items-center">
            <div className="glass-card gradient-border rounded-xl p-3 md:p-5 min-w-[70px] md:min-w-[100px]">
              <span className="text-3xl md:text-5xl font-bold gradient-text block text-center">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-muted-foreground text-xs md:text-sm mt-2 uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="text-2xl md:text-4xl text-primary animate-pulse-glow hidden sm:block">:</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
