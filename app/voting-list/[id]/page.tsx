'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Poll {
  id: number;
  title: string;
  description: string;
  status: 'not started' | 'in progress' | 'completed';
}

const mockPolls: Poll[] = [
  { id: 1, title: 'Poll 1', description: 'Description of Poll 1', status: 'in progress' },
  { id: 2, title: 'Poll 2', description: 'Description of Poll 2', status: 'completed' },
  { id: 3, title: 'Poll 3', description: 'Description of Poll 3', status: 'not started' },
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
        <button
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
          onClick={() => router.back()}
        >
          Back to List
        </button>
      </div>
    </div>
  );
}