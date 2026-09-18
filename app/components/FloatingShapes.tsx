"use client";

const triangles = [
  { top: "8%",  left: "4%",   size: 70,  rotate: 15,   opacity: 0.45, color: "#a855f7", duration: "7s",  delay: "0s"   },
  { top: "18%", right: "7%",  size: 55,  rotate: 130,  opacity: 0.35, color: "#c084fc", duration: "9s",  delay: "1s"   },
  { top: "35%", left: "2%",   size: 90,  rotate: 45,   opacity: 0.25, color: "#7c3aed", duration: "11s", delay: "2s"   },
  { top: "50%", right: "4%",  size: 50,  rotate: 200,  opacity: 0.4,  color: "#a855f7", duration: "8s",  delay: "0.5s" },
  { top: "65%", left: "6%",   size: 65,  rotate: 260,  opacity: 0.3,  color: "#c084fc", duration: "10s", delay: "3s"   },
  { top: "75%", right: "10%", size: 80,  rotate: 320,  opacity: 0.35, color: "#7c3aed", duration: "12s", delay: "1.5s" },
  { top: "85%", left: "12%",  size: 45,  rotate: 170,  opacity: 0.3,  color: "#a855f7", duration: "8s",  delay: "2.5s" },
  { top: "28%", left: "20%",  size: 38,  rotate: 80,   opacity: 0.2,  color: "#c084fc", duration: "13s", delay: "0.8s" },
  { top: "55%", right: "20%", size: 42,  rotate: 235,  opacity: 0.2,  color: "#a855f7", duration: "9s",  delay: "4s"   },
  { top: "12%", left: "40%",  size: 30,  rotate: 310,  opacity: 0.15, color: "#7c3aed", duration: "14s", delay: "1.2s" },
];

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes floatSpin {
          0%   { transform: translateY(0px) rotate(var(--r)); }
          25%  { transform: translateY(-18px) rotate(calc(var(--r) + 8deg)); }
          50%  { transform: translateY(-28px) rotate(calc(var(--r) + 3deg)); }
          75%  { transform: translateY(-12px) rotate(calc(var(--r) - 5deg)); }
          100% { transform: translateY(0px) rotate(var(--r)); }
        }
      `}</style>

      {triangles.map((t, i) => (
        <svg
          key={i}
          style={{
            position: "absolute",
            top: (t as any).top,
            left: (t as any).left,
            right: (t as any).right,
            width: t.size,
            opacity: t.opacity,
            ["--r" as string]: `${t.rotate}deg`,
            transform: `rotate(${t.rotate}deg)`,
            animation: `floatSpin ${t.duration} ease-in-out infinite`,
            animationDelay: t.delay,
            willChange: "transform",
          }}
          viewBox="0 0 100 87"
        >
          <polygon
            points="50,4 96,83 4,83"
            fill="none"
            stroke={t.color}
            strokeWidth="1.5"
          />
        </svg>
      ))}

      {/* Circuit corners */}
      <svg className="absolute" style={{ top: "5%", left: "2%", width: 100, opacity: 0.3 }} viewBox="0 0 100 80">
        <line x1="10" y1="10" x2="55" y2="10" stroke="#a855f7" strokeWidth="1" />
        <line x1="55" y1="10" x2="55" y2="50" stroke="#a855f7" strokeWidth="1" />
        <circle cx="10" cy="10" r="3" fill="none" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="55" cy="50" r="3" fill="none" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="55" y1="50" x2="90" y2="50" stroke="#a855f7" strokeWidth="1" />
      </svg>

      <svg className="absolute" style={{ top: "5%", right: "2%", width: 100, opacity: 0.3, transform: "scaleX(-1)" }} viewBox="0 0 100 80">
        <line x1="10" y1="10" x2="55" y2="10" stroke="#c084fc" strokeWidth="1" />
        <line x1="55" y1="10" x2="55" y2="50" stroke="#c084fc" strokeWidth="1" />
        <circle cx="10" cy="10" r="3" fill="none" stroke="#c084fc" strokeWidth="1.5" />
        <circle cx="55" cy="50" r="3" fill="none" stroke="#c084fc" strokeWidth="1.5" />
        <line x1="55" y1="50" x2="90" y2="50" stroke="#c084fc" strokeWidth="1" />
      </svg>

      <svg className="absolute" style={{ bottom: "5%", right: "2%", width: 100, opacity: 0.3, transform: "scale(-1,-1)" }} viewBox="0 0 100 80">
        <line x1="10" y1="10" x2="55" y2="10" stroke="#a855f7" strokeWidth="1" />
        <line x1="55" y1="10" x2="55" y2="50" stroke="#a855f7" strokeWidth="1" />
        <circle cx="10" cy="10" r="3" fill="none" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="55" cy="50" r="3" fill="none" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="55" y1="50" x2="90" y2="50" stroke="#a855f7" strokeWidth="1" />
      </svg>

      <svg className="absolute" style={{ bottom: "5%", left: "2%", width: 100, opacity: 0.3, transform: "scaleY(-1)" }} viewBox="0 0 100 80">
        <line x1="10" y1="10" x2="55" y2="10" stroke="#7c3aed" strokeWidth="1" />
        <line x1="55" y1="10" x2="55" y2="50" stroke="#7c3aed" strokeWidth="1" />
        <circle cx="10" cy="10" r="3" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
        <circle cx="55" cy="50" r="3" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
        <line x1="55" y1="50" x2="90" y2="50" stroke="#7c3aed" strokeWidth="1" />
      </svg>
    </div>
  );
}
