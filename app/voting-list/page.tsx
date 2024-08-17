'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface Poll {
  id: number;
  title: string;
  description: string;
  status: 'not started' | 'in progress' | 'completed';
}

export default function VotingListPage() {
  const router = useRouter();

  const polls: Poll[] = [
    { id: 1, title: 'Poll 1', description: 'Description of Poll 1', status: 'in progress' },
    { id: 2, title: 'Poll 2', description: 'Description of Poll 2', status: 'completed' },
    { id: 3, title: 'Poll 3', description: 'Description of Poll 3', status: 'not started' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-3/4 max-w-lg">
        <h1 className="text-3xl font-bold mb-6">Voting List</h1>
        {polls.map((poll) => (
          <div
            key={poll.id}
            className="border-b border-gray-300 py-4 cursor-pointer"
            onClick={() => router.push(`/voting-list/${poll.id}`)}
          >
            <h2 className="text-xl font-semibold">{poll.title}</h2>
            <p className="text-md text-gray-600">{poll.description}</p>
            <p className="text-md mt-2">
              Status: <span className={`font-semibold ${poll.status === 'completed' ? 'text-green-500' : poll.status === 'in progress' ? 'text-yellow-500' : 'text-gray-500'}`}>{poll.status}</span>
            </p>
          </div>
        ))}
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600">
            <Link href="/create-voting">Create New Voting</Link>
        </button>
    </div>
  );
}