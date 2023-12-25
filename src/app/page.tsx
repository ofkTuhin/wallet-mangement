"use client";

import { useWallet } from "@/context/walletContext";
import { useMemo, useState } from "react";

const Home: React.FC = () => {
  const [error, setError] = useState("");
  const { state, addNote, removeNote } = useWallet();
  const [note, setNote] = useState({
    denomination: "",
    count: 0,
  });

  const handleCount = (count: number) => {
    if (count < 0) {
      setError("Please provide a positive number or zero.");
    } else {
      setError("");
      setNote({ ...note, count: count });
    }
  };

  const total = useMemo<number>(() => {
    return state.reduce((prev, curr) => {
      return curr.count + prev;
    }, 0);
  }, [state]);

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="lg:w-2/3 md:w/12 w-full mx-auto max-w-full px-4 mb-4">
              <h1 className="h4">Personal Wallet Management</h1>
              <div className="row my-2">
                <div className="md:col-6 col-12">
                  <select
                    className="w-full mb-2 sm:mb-0 focus:ring-0 border-border focus:border-border rounded-sm"
                    onChange={(e) =>
                      setNote({ ...note, denomination: e.target.value })
                    }
                  >
                    {state.map((item) => (
                      <option value={item.denomination} key={item.denomination}>
                        Select Note {item.denomination}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-6 col-12">
                  <input
                    type="number"
                    className="w-full focus:ring-0 focus:border-border border-border rounded-sm"
                    placeholder="Enter Number of Note"
                    onChange={(e) => handleCount(Number(e.target.value))}
                  />
                  <small className="text-red-900">{error}</small>
                </div>
              </div>
              <button
                className={`btn ${error ? "bg-primary/30" : "btn-primary"}`}
                onClick={() => addNote(note.denomination, note.count)}
                disabled={!!error}
              >
                Add Note
              </button>

              <div className="mt-4">
                <h2 className="h5 mb-2">Wallet details</h2>
                <table className="w-full border-collapse mb-2">
                  <thead>
                    <tr>
                      <th className="border border-border text-center ">
                        Denomination
                      </th>
                      <th className="border border-border text-center ">
                        Note count
                      </th>
                      <th className="border border-border text-center">
                        Add Note
                      </th>
                      <th className="border border-border text-center">
                        Remove Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.map((item, i) => (
                      <tr key={item.denomination + i}>
                        <td className="border border-border text-center">
                          {item.denomination}
                        </td>
                        <td className="border border-border text-center ">
                          {item.count}
                        </td>
                        <td
                          className="border border-border px-2 text-center py-1 cursor-pointer"
                          onClick={() => addNote(item.denomination, 1)}
                        >
                          Add +
                        </td>
                        <td
                          className="border border-border px-2 text-center py-1 cursor-pointer"
                          onClick={() => removeNote(item.denomination, 1)}
                        >
                          Remove -
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3>Total: ${total}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
