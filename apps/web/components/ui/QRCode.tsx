// Decorative QR-code-like pattern built from SVG rects.
// Not a real QR code — purely visual placeholder.

type QRCodeProps = {
  size?: number;
};

// Deterministic "random" grid pattern that looks like a QR code
const MODULES = 21;

function seededBit(row: number, col: number): boolean {
  // Finder patterns (top-left, top-right, bottom-left corners)
  const inFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= MODULES - 7) || (r >= MODULES - 7 && c < 7);

  if (inFinder(row, col)) {
    // Draw finder pattern squares
    const inTopLeft = row < 7 && col < 7;
    const inTopRight = row < 7 && col >= MODULES - 7;
    const inBottomLeft = row >= MODULES - 7 && col < 7;

    const localRow = inTopLeft ? row : inTopRight ? row : row - (MODULES - 7);
    const localCol = inTopLeft ? col : inTopRight ? col - (MODULES - 7) : col;

    if (inTopLeft || inTopRight || inBottomLeft) {
      const r = inBottomLeft ? row - (MODULES - 7) : localRow;
      const c = inBottomLeft ? col : localCol;
      // Outer border
      if (r === 0 || r === 6 || c === 0 || c === 6) return true;
      // Inner fill
      if (r >= 2 && r <= 4 && c >= 2 && c <= 4) return true;
      return false;
    }
  }

  // Timing patterns
  if (row === 6 || col === 6) return (row + col) % 2 === 0;

  // Pseudo-random data modules
  const hash = (row * 31 + col * 17 + row * col * 7) % 100;
  return hash < 55;
}

export function QRCode({ size = 120 }: QRCodeProps) {
  const cellSize = size / MODULES;
  const cells: { row: number; col: number }[] = [];

  for (let r = 0; r < MODULES; r++) {
    for (let c = 0; c < MODULES; c++) {
      if (seededBit(r, c)) {
        cells.push({ row: r, col: c });
      }
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label="QR code"
      style={{ display: 'block' }}
    >
      <rect width={size} height={size} fill="white" rx="4" />
      {cells.map(({ row, col }) => (
        <rect
          key={`${row}-${col}`}
          x={col * cellSize + 0.5}
          y={row * cellSize + 0.5}
          width={cellSize - 1}
          height={cellSize - 1}
          fill="var(--ink)"
          rx="0.5"
        />
      ))}
    </svg>
  );
}