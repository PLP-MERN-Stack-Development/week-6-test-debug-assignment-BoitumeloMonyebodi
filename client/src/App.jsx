import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5055/api/bugs";

function App() {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const fetchBugs = async () => {
    try {
      const res = await axios.get(API_BASE);
      setBugs(res.data);
    } catch (err) {
      console.error("Error fetching bugs:", err.message);
    }
  };

  const createBug = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    try {
      const res = await axios.post(API_BASE, { title, description });
      setTitle("");
      setDescription("");
      setError("");
      fetchBugs();
    } catch (err) {
      console.error("Error creating bug:", err.message);
      setError("Failed to create bug.");
    }
  };

  const deleteBug = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchBugs();
    } catch (err) {
      console.error("Error deleting bug:", err.message);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🐛 Boitumelo Bug Tracker
      </h1>

      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
        {error && (
          <p className="text-red-500 font-semibold text-sm mb-2">{error}</p>
        )}
        <input
          type="text"
          className="w-full border p-2 rounded mb-2"
          placeholder="Bug title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="Bug description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={createBug}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Submit Bug
        </button>
      </div>

      <div className="max-w-xl mx-auto mt-6 space-y-4">
        {bugs.length === 0 ? (
          <p className="text-gray-500 text-center">No bugs reported yet.</p>
        ) : (
          bugs.map((bug) => (
            <div
              key={bug._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{bug.title}</h3>
                <p className="text-gray-600 text-sm">{bug.description}</p>
                <span className="text-sm text-yellow-600 font-medium">
                  Status: {bug.status}
                </span>
              </div>
              <button
                onClick={() => deleteBug(bug._id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;