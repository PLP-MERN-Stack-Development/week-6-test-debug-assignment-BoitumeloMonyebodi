import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BugList() {
  const [bugs, setBugs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5055/api/bugs')
      .then(res => {
        setBugs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!bugs || bugs.length === 0) return <p>No bugs found.</p>;

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug._id}>
          <strong>{bug.title}</strong>: {bug.description}
        </li>
      ))}
    </ul>
  );
}

export default BugList;