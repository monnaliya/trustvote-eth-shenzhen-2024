'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Poll {
  id: number;
  title: string;
  description: string;
  status: 'not started' | 'in progress' | 'completed';
  options: { id: number; text: string }[];
}

const mockPolls: Poll[] = [
  {
    id: 1,
    title: 'Poll 1',
    description: 'Description of Poll 1',
    status: 'in progress',
    options: [
      { id: 1, text: 'Option 1' },
      { id: 2, text: 'Option 2' },
      { id: 3, text: 'Option 3' },
    ],
  },
  {
    id: 2,
    title: 'Poll 2',
    description: 'Description of Poll 2',
    status: 'completed',
    options: [
      { id: 1, text: 'Option 1' },
      { id: 2, text: 'Option 2' },
      { id: 3, text: 'Option 3' },
    ],
  },
  {
    id: 3,
    title: 'Poll 3',
    description: 'Description of Poll 3',
    status: 'not started',
    options: [
      { id: 1, text: 'Option 1' },
      { id: 2, text: 'Option 2' },
      { id: 3, text: 'Option 3' },
    ],
  },
];

export default function VotingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const pollId = parseInt(params.id, 10);
  const poll = mockPolls.find((p) => p.id === pollId);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async () => {
    if (selectedOption !== null) {
      // Simulate sending the vote to the backend or blockchain
      console.log(`Voted for option ${selectedOption} in poll ${poll?.title}`);

      // Update the UI to reflect that the user has voted
      setHasVoted(true);
    }
  };

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

        {poll.status === 'in progress' && !hasVoted && (
          <div>
            <div className="mb-4">
              {poll.options.map((option) => (
                <label key={option.id} className="block text-left">
                  <input
                    type="radio"
                    name="vote"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => setSelectedOption(option.id)}
                    disabled={hasVoted}
                    className="mr-2"
                  />
                  {option.text}
                </label>
              ))}
            </div>
            <button
              onClick={handleVote}
              disabled={selectedOption === null || hasVoted}
              className={`py-2 px-4 rounded-md text-white ${
                hasVoted ? 'bg-gray-400' : 'bg-blue-600'
              }`}
            >
              {hasVoted ? 'You have voted' : 'Vote'}
            </button>
          </div>
        )}

        {poll.status === 'completed' && (
          <p className="text-md text-gray-500">This poll has been completed. Voting is closed.</p>
        )}

        {poll.status === 'not started' && (
          <p className="text-md text-gray-500">This poll has not started yet. Please come back later.</p>
        )}

        <button
          onClick={() => router.push('/voting-list')}
          className="mt-6 py-2 px-4 bg-gray-600 text-white rounded-md"
        >
          Back to List
        </button>
      </div>
    </div>
  );
}