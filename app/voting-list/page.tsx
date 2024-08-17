'use client';

import React from 'react';

interface Poll {
  id: number;
  title: string;
  description: string;
  status: 'not started' | 'in progress' | 'completed';
}

const polls: Poll[] = [
  { id: 1, title: 'Poll 1', description: 'Description of Poll 1', status: 'in progress' },
  { id: 2, title: 'Poll 2', description: 'Description of Poll 2', status: 'completed' },
  { id: 3, title: 'Poll 3', description: 'Description of Poll 3', status: 'not started' },
];

export default function VotingListPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Voting List</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-3/4 max-w-lg">
        {polls.map((poll) => (
          <div key={poll.id} className="border-b border-gray-200 py-4">
            <h2 className="text-xl font-semibold">{poll.title}</h2>
            <p className="text-gray-600">{poll.description}</p>
            <span
              className={`text-sm font-medium mt-2 inline-block ${
                poll.status === 'not started'
                  ? 'text-gray-500'
                  : poll.status === 'in progress'
                  ? 'text-yellow-500'
                  : 'text-green-500'
              }`}
            >
              {poll.status === 'not started'
                ? 'Not Started'
                : poll.status === 'in progress'
                ? 'In Progress'
                : 'Completed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}