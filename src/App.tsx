import { useCallback, useEffect, useState } from "react";
import "./App.css";

type Cell = ["X" | "O" | "", boolean];
type CellsState = Record<number, Cell>;

export function Square({
  shape,
  index,
}: {
  shape: "X" | "O" | "";
  index: number;
}) {
  return (
    <div
      key={index}
      className={`w-[30px] h-[30px] text-center  m-2.5  text-xl p-auto  `}
    >
      {shape}
    </div>
  );
}

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
    <div className="max-w-44 h-44">
      Select first shape
      <div className="flex flex-row  justify-center mb-3">
        {/* <div className=" mb-5 text-center p-auto flex flex-row align-middle w-full "> */}
        <div
          onClick={() => {
            if (shape === "") {
              setShape("X");
            }
          }}
          className=" w-[40px] h-[40px] text-center  m-0.5 shadow-2xl shadow-gray-500  py-1 text-2xl border-[0.1px] border-gray-500"
        >
          X
        </div>
        <div
          onClick={() => {
            if (shape === "") {
              setShape("O");
            }
          }}
          className=" w-[40px] h-[40px] text-center  m-0.5  py-1 text-2xl shadow-2xl shadow-gray-500 border-[0.1px] border-gray-500"
        >
          O
        </div>
        <div
          onClick={resetCells}
          className="w-[70px] h-[40px] border-[0.1px] m-0.5 border-gray-500 shadow-2xl shadow-gray-500 bg-red-900 py-1 text-xl text-white text-center "
        >
          Reset
        </div>
      </div>
      {/* --------------------------------------------------- */}
      {shape && (
        <div>
          <div className="grid grid-cols-3 gap-1 mb-4 justify-center p-1  border-2 border-gray-500 m-auto">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
              <div
                onClick={() => detectBox(i)}
                className={`${
                  cells[i][1] ? "bg-green-500 border-none" : ""
                } border-[0.1px] border-gray-500`}
              >
                <Square shape={cells[i][0]} index={i} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
