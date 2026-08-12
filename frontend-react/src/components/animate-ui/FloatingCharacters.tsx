import { useEffect, useState } from "react";

const characters = [
  "A", "B", "C", "m", "n", "o", "X", "Y", "Z",
  "0", "1", "2", "3", "4", "5",
  "_", "?", "×", "%", "$", "&", "!",
  "{", "}", "[", "]", "@",
];

type FloatingChar = {
  id: number;
  char: string;
  x: number;
  y: number;
  duration: number;
};

export default function FloatingCharacters() {
  const [items, setItems] = useState<FloatingChar[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;

      // Random distance from center
      const distance = 120 + Math.random() * 80; // Between 120px and 200px

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const newItem: FloatingChar = {
        id: Date.now() + Math.random(),
        char: characters[Math.floor(Math.random() * characters.length)],
        x,
        y,
        duration: 5 + Math.random() * 5, // Between 5s and 10s
      };

      setItems((prev) => [...prev, newItem]);

      // Remove after animation
      setTimeout(() => {
        setItems((prev) =>
          prev.filter((item) => item.id !== newItem.id)
        );
      }, newItem.duration * 1000);
    }, 180);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute left-1/2 top-0 z-0 size-15 -translate-x-1/2">
      <div className="absolute inset-0 bg-amber-50 blur-2xl"></div>
      {items.map((item) => (
        <span
          key={item.id}
          className="pointer-events-none absolute left-1/2 top-1/2 font-mono text-2xl font-bold text-white"
          style={
            {
              "--x": `${item.x}px`,
              "--y": `${item.y}px`,
              "--duration": `${item.duration}s`,
              animation: "floatCharacter var(--duration) ease-out forwards",
            } as React.CSSProperties
          }
        >
          {item.char}
        </span>
      ))}

      <style>{`
        @keyframes floatCharacter {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }

          20% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }

          100% {
            transform:
              translate(
                calc(-50% + var(--x)),
                calc(-50% + var(--y))
              )
              scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}