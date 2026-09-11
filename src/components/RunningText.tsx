"use client";

export default function RunningText() {
  const text = " OPEN TO WORK — ";

  return (
    <div className="w-full bg-[#FB4516] text-white py-3 overflow-hidden whitespace-nowrap flex select-none z-10 relative">
      {/* Set inline style animationDuration untuk memperlambat pergerakan marquee (misal: 65s) */}
      <div
        className="flex animate-marquee font-bold text-3xl md:text-5xl tracking-tight uppercase"
        style={{ animationDuration: "20s" }}
      >
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
      </div>
      <div
        className="flex animate-marquee font-bold text-3xl md:text-5xl tracking-tight uppercase"
        aria-hidden="true"
        style={{ animationDuration: "20s" }}
      >
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
      </div>
    </div>
  );
}
