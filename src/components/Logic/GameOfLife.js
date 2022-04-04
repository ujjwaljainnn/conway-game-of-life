import React, {useState ,useCallback, useRef} from "react";
import produce from "immer";



const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
  ];
  

export default function GameOfLife () {
    


    const [num_rows, setRows] = useState(100)
    const rowsReference = useRef(num_rows)
    rowsReference.current = num_rows

    

    const [num_cols, setCols] = useState(100)
    const colReference = useRef(num_cols)
    colReference.current = num_cols

    const [running, setRunning] = useState(false);
    const runningReference = useRef(running);
    runningReference.current = running


    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < rowsReference.current; i++) {
            rows.push(Array.from(Array(colReference.current), () => 0));
        }
        return rows;
    });

    

    // const runSimulation = useCallback(() => {
    //     if (runningReference.current) {
    //         return;
    //     }

    //     setGrid(g => {
    //         return produce(g, new_grid => {
    //             for(let i = 0; i < rowsReference.current; i++) {
    //                 for(let k = 0; k < colReference.current; k++) {
    //                     let neighbors = 0;

    //                     operations.forEach(ele => {
                            
    //                         const iTemp = i + ele[0]
    //                         const kTemp = k + ele[1]
                            
    //                         if(iTemp >= 0 && iTemp < rowsReference.current && kTemp >= 0 && kTemp < colReference.current) {
    //                             neighbors += g[iTemp][kTemp]
    //                         }

    //                         // if(iTemp < 0 || iTemp > rowsReference.current) {
    //                         //     rowsReference.current += 1;
    //                         // }
    //                         // if(kTemp < 0 || kTemp > colReference.current) {
    //                         //     colReference.current += 1;
    //                         // }

    //                         if (neighbors == 3 && !g[i][k]) {
    //                             new_grid[i][k] = 1;
    //                         }
    //                         else if(neighbors < 2 || neighbors > 3) {
    //                             new_grid[i][k] = 0;
    //                         }
                        
    //                     })
                        
    //                 }
    //             }
    //         });
    //     });

    //     setTimeout(runSimulation, 1000)
    // }, []);
    const runSimulation = useCallback(() => {
        if (!runningReference.current) {
          return;
        }
    
        setGrid(g => {
          return produce(g, new_grid => {
            
            for (let i = 0; i < rowsReference.current; i++) {
              for (let k = 0; k < colReference.current; k++) {
                let neighbors = 0;
                operations.forEach(ele => {
                            
                    const iTemp = i + ele[0]
                    const kTemp = k + ele[1]
                    
                    if(iTemp >= 0 && iTemp < rowsReference.current && kTemp >= 0 && kTemp < colReference.current) {
                        neighbors += g[iTemp][kTemp]
                    }

                });

                if (neighbors == 3 && !g[i][k]) {
                    new_grid[i][k] = 1;
                }
                else if(neighbors < 2 || neighbors > 3) {
                    new_grid[i][k] = 0;
                }
                
                if(g[i][k]){
                    if(i < 0) {
                        setRows(rowsReference.current += 1)
                        
                    }
                    else if(i >= rowsReference.current) {
                        setRows(rowsReference.current += 1)
                        // rowsReference.current += 1;
                        // new_grid.push(Array.from(Array(1), () => 0))
                    }
                    else if(k < 0) {
                        setCols(colReference.current += 1)
                        // colReference.current += 1;
                        // new_grid.unshift(Array.from(Array(1), () => 0))
                    }
                    else if(k > colReference.current) {
                        setCols(colReference.current += 1)
                        // colReference.current += 1;
                        // new_grid.push(Array.from(Array(1), () => 0))
                    }
                }
                
              }
            }
            
          });
        });
    
        setTimeout(runSimulation, 100);
      }, []);
    
    return (
        <> 
            <button onClick={() => {
                setCols(colReference.current += 1)
            }}>
                Add column
            </button>

            <button onClick={() => {
                setCols(rowsReference.current += 1)
            }}>
                Add row
            </button>

          
            <button
                onClick={() => {
                setRunning(!running);
                if (!running) {
                    runningReference.current = true;
                    runSimulation();
                }
                }}
            >
                {running ? "stop" : "start"}
            </button>
            <button
                onClick={() => {
                    const newGrid = produce(grid, new_grid => {
                        for(let i = 0; i < num_rows; i++) {
                            for (let j = 0; j < num_cols; j++) {
                                    new_grid[i][j] = Math.floor(Math.random() * 2)
                                }
                            }
                        }
                    )

                    setGrid(newGrid)
                }}
            >
                Random
            </button>
            <button
                onClick={() => setGrid(() => {
                   
                    const rows = [];
                    for (let i = 0; i < rowsReference.current; i++) {
                        rows.push(Array.from(Array(colReference.current), () => 0));
                    }
                    return rows;
                    
                })}
            >
                Clear
            </button>
            <div
                style={{
                marginLeft: '500px',
                display: "grid",
                gridTemplateColumns: `repeat(${colReference.current}, 10px)`
                }}
            >
                {grid.map((rows, i) =>
                rows.map((col, k) => (
                    <div
                    key={`${i}-${k}`}
                    onClick={() => {
                        const newGrid = produce(grid, gridCopy => {
                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                        });
                        setGrid(newGrid);
                    }}
                    style={{
                        width: 10,
                        height: 10,
                        backgroundColor: grid[i][k] ? "white" : 'black',
                        border: "solid 1px green"
                    }}
                    />
                )))}
            </div>
        </>
        
    )

}