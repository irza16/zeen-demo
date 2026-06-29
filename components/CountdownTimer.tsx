'use client';

import { useEffect, useMemo, useState } from 'react';

function getRemaining(targetTime: number) {
  const total = Math.max(0, targetTime - Date.now());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { total, days, hours, minutes, seconds };
}

export default function CountdownTimer() {
  const [targetTime] = useState(() => Date.now() + 48 * 60 * 60 * 1000);
  const [remaining, setRemaining] = useState(() => getRemaining(targetTime));

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(targetTime));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [targetTime]);

  const units = useMemo(
    () => [
      { label: 'Days', value: remaining.days },
      { label: 'Hours', value: remaining.hours },
      { label: 'Mins', value: remaining.minutes },
      { label: 'Secs', value: remaining.seconds },
    ],
    [remaining]
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {units.map((unit) => (
        <div key={unit.label} className="card-soft px-4 py-5 text-center">
          <div className="font-display text-3xl text-ink tabular-nums sm:text-4xl">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[0.65rem] uppercase tracking-[0.35em] text-muted">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
