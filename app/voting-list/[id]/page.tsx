'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Poll {
  id: number;
  title: string;
  description: string;
  status: 'not started' | 'in progress' | 'completed';
  options: { id: number; text: string; votes: number }[];
}

const mockPolls: Poll[] = [
  {
    id: 1,
    title: 'Poll 1',
    description: 'Description of Poll 1',
    status: 'in progress',
    options: [
      { id: 1, text: 'Option 1', votes: 0 },
      { id: 2, text: 'Option 2', votes: 0 },
      { id: 3, text: 'Option 3', votes: 0 },
    ],
  },
  {
    id: 2,
    title: 'Poll 2',
    description: 'Description of Poll 2',
    status: 'completed',
    options: [
      { id: 1, text: 'Option 1', votes: 5 },
      { id: 2, text: 'Option 2', votes: 3 },
      { id: 3, text: 'Option 3', votes: 2 },
    ],
  },
  {
    id: 3,
    title: 'Poll 3',
    description: 'Description of Poll 3',
    status: 'not started',
    options: [
      { id: 1, text: 'Option 1', votes: 0 },
      { id: 2, text: 'Option 2', votes: 0 },
      { id: 3, text: 'Option 3', votes: 0 },
    ],
  },
];

export default function VotingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const pollId = parseInt(params.id, 10);
  const poll = mockPolls.find((p) => p.id === pollId);

  if (!poll) {
    return <p>Poll not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-3/4 max-w-lg">
        <h1 className="text-3xl font-bold mb-4">{poll.title}</h1>
        <p className="text-lg mb-6">{poll.description}</p>
        <p className="text-md mb-4">
          Status: <span className="font-semibold">{poll.status}</span>
        </p>
        {poll.status === 'completed' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <ul className="text-left mb-6">
              {poll.options.map((option) => (
                <li key={option.id} className="mb-2">
                  {option.text}: {option.votes} votes
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>This poll has not been completed yet.</p>
        )}
        <button
          className="bg-gray-500 text-white font-semibold rounded-md px-4 py-2"
          onClick={() => router.push('/voting-list')}
        >
          Back to List
        </button>
      </div>
    </div>
  );
}