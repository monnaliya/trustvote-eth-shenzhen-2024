'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ethers } from 'ethers';
import TrustVote from '../../artifacts/contracts/TrustVote.sol/TrustVote.json';

interface Poll {
  id: number;
  title: string;
  description: string;
  status: 'not started' | 'in progress' | 'completed';
  options: { id: number; text: string; votes: number }[];
}

export default function VotingListPage() {
  const router = useRouter();
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    async function fetchPolls() {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your contract address
        const contract = new ethers.Contract(contractAddress, TrustVote.abi, provider);

        try {
          const pollCount = await contract.pollCount();
          const loadedPolls: Poll[] = [];

          for (let i = 1; i <= pollCount; i++) {
            const poll = await contract.polls(i);
            const options = await Promise.all(
              poll.options? poll.options.map(async (option: string, index: number) => {
                const votes = await contract.votes(i, index);
                return { id: index + 1, text: option, votes: votes.toNumber() };
              }) : []
            );

            loadedPolls.push({
              id: i,
              title: poll.title,
              description: poll.description,
              status: poll.completed ? 'completed' : 'in progress',
              options: options,
            });
          }

          setPolls(loadedPolls);
        } catch (err) {
          console.error('Error fetching polls:', err);
        }
      }
    }

    fetchPolls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-3/4 max-w-lg">
        <h1 className="text-3xl font-bold mb-6">Voting List</h1>
        {(!polls || polls.length === 0) ? (
          <p>No polls available</p>
        ) : (
          polls.map((poll) => (
            <div
              key={poll.id}
              className="border-b border-gray-300 py-4 cursor-pointer"
              onClick={() => router.push(`/voting-list/${poll.id}`)} // Reintroduce the onClick event
            >
              <h2 className="text-2xl font-bold mb-2">{poll.title}</h2>
              <p className="mb-2">{poll.description}</p>
              <p>
                Status: <span className={`font-semibold ${poll.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{poll.status}</span>
              </p>
            </div>
          ))
        )}
      </div>
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600">
        <Link href="/create-voting">Create New Voting</Link>
      </button>
    </div>
  );
}