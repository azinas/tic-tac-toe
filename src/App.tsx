import { useCallback, useEffect, useState } from "react";

type Cell = ["X" | "O" | "", boolean];
type CellsState = Record<number, Cell>;

function App() {
  const [shape, setShape] = useState<"X" | "O" | "">("");
  const [cells, setCells] = useState<CellsState>({
    1: ["", false],
    2: ["", false],
    3: ["", false],
    4: ["", false],
    5: ["", false],
    6: ["", false],
    7: ["", false],
    8: ["", false],
    9: ["", false],
  });

  const winCells = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [7, 5, 3],
    [1, 5, 9],
  ];

  function detectBox(index: number) {
    if (!Object.values(cells).every((value) => value[0] === "")) {
      setShape((prevShape) => {
        const newShape = prevShape === "X" ? "O" : "X";
        setCells((prevCells: CellsState) => {
          return { ...prevCells, [index]: [newShape, false] };
        });
        return newShape;
      });
    } else {
      setCells((prevCells) => {
        return { ...prevCells, [index]: [shape, false] };
      });
    }
  }

  const isWin = useCallback(() => {
    setCells((prevCells) => {
      const newCells = { ...prevCells };
      let updated = false;
      winCells.forEach(([a, b, c]) => {
        if (
          newCells[a][0] &&
          newCells[a][0] === newCells[b][0] &&
          newCells[a][0] === newCells[c][0]
        ) {
          [a, b, c].forEach((i) => {
            if (!newCells[i][1]) {
              newCells[i] = [newCells[i][0], true];
              updated = true;
            }
          });
        }
      });
      return updated ? newCells : prevCells;
    });
  }, []);

  useEffect(() => {
    isWin();
  }, [cells]);

  function resetCells() {
    setShape("");
    setCells({
      1: ["", false],
      2: ["", false],
      3: ["", false],
      4: ["", false],
      5: ["", false],
      6: ["", false],
      7: ["", false],
      8: ["", false],
      9: ["", false],
    });
  }

  return (
    <div className="min-h-dvh max-w-md mx-auto bg-gradient-to-br from-0% from-sky-400 to-sky-900 text-white w-full flex flex-col">
      <div className="flex-grow w-full flex flex-col items-center justify-center h-full">
        {!shape && (
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-lg font-black">Please select shape</h1>
            <div className="flex flex-row justify-center">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShape("X")}
                  className="bg-white rounded-2xl size-24 font-bold text-7xl cursor-pointer"
                >
                  <svg
                    width="90"
                    height="90"
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.8"
                      d="M25 27L44.9526 46.9526M64.9052 66.9052L44.9526 46.9526M44.9526 46.9526L25 66.9052M44.9526 46.9526L64.9052 27"
                      stroke="#F54D62"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => setShape("O")}
                  className="bg-white rounded-2xl size-24 font-bold text-7xl cursor-pointer"
                >
                  <svg
                    width="90"
                    height="90"
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.8"
                      cx="46.0429"
                      cy="48.0429"
                      r="20.0429"
                      stroke="#87E43A"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {shape && (
          <button
            type="button"
            onClick={resetCells}
            className="rounded-lg bg-white px-8 py-2 text-2xl cursor-pointer text-sky-950 font-semibold"
          >
            Reset
          </button>
        )}
      </div>

      {/* --------------------------------------------------- */}
      {shape && (
        <div className="flex-grow flex-shrink-0 px-8">
          <div className="grid grid-cols-3 grid-rows-3 justify-center overflow-hidden rounded-2xl bg-white aspect-square">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => detectBox(i)}
                className={`text-black font-bold text-4xl flex justify-center items-center border-[0.25px] border-gray-300 ${
                  cells[i][1] ? "" : "bg-transparent"
                } `}
              >
                {cells[i][0] === "X" ? (
                  <svg
                    width="90"
                    height="90"
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.8"
                      d="M25 27L44.9526 46.9526M64.9052 66.9052L44.9526 46.9526M44.9526 46.9526L25 66.9052M44.9526 46.9526L64.9052 27"
                      stroke="#F54D62"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                    />
                  </svg>
                ) : (
                  ""
                )}

                {cells[i][0] === "O" ? (
                  <svg
                    width="90"
                    height="90"
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.8"
                      cx="46.0429"
                      cy="48.0429"
                      r="20.0429"
                      stroke="#87E43A"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
