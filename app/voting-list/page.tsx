"use client";

import { useEffect, useState } from 'react';

export default function VotingList() {
  const [polls, setPolls] = useState<Array<{ id: number, title: string, description: string }>>([]);

  useEffect(() => {
    // Placeholder data for demonstration. Replace this with an API call to fetch actual voting data.
    const fetchPolls = async () => {
      const mockPolls = [
        { id: 1, title: 'Poll 1', description: 'Description of Poll 1' },
        { id: 2, title: 'Poll 2', description: 'Description of Poll 2' },
        { id: 3, title: 'Poll 3', description: 'Description of Poll 3' },
      ];
      setPolls(mockPolls);
    };

    fetchPolls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Voting List</h1>
      <ul className="w-3/4 max-w-lg bg-white p-6 rounded-lg shadow-md">
        {polls.length > 0 ? (
          polls.map(poll => (
            <li key={poll.id} className="mb-4 border-b pb-4">
              <h2 className="text-xl font-semibold">{poll.title}</h2>
              <p className="text-gray-700">{poll.description}</p>
            </li>
          ))
        ) : (
          <li>No polls available at the moment.</li>
        )}
      </ul>
    </div>
  );
}