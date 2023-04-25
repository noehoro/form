import React, { useState, useEffect } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  table: {
    borderCollapse: "collapse",
    fontSize: "1rem",
  },
  th: {
    borderBottom: "2px solid black",
    padding: "0.5rem 1rem",
    textAlign: "left",
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "0.5rem 1rem",
  },
};

const ResultsTable = () => {
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const storageData = localStorage.getItem("questionData");
    if (storageData) {
      setResponses(JSON.parse(storageData));
    }
  }, []);

  return (
    <div style={styles.container}>
      {Object.keys(responses).length > 0 ? (
        <>
          {Object.entries(responses).map(([name, results]) => (
            <div key={name}>
              <h3>{name}</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Question</th>
                    <th style={styles.th}>Answer</th>
                    <th style={styles.th}>Time Spent (seconds)</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((response, index) => (
                    <tr key={index}>
                      <td style={styles.td}>Q{index + 1}</td>
                      <td style={styles.td}>{response.response}</td>
                      <td style={styles.td}>
                        {(response.time / 1000).toFixed(3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <br />
          <br />
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Clear Results
          </button>
        </>
      ) : (
        <p>No results found in local storage.</p>
      )}
    </div>
  );
};

export default ResultsTable;
