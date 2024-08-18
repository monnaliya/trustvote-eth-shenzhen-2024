'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import TrustVote from '../../../artifacts/contracts/TrustVote.sol/TrustVote.json';

interface Option {
  id: number;
  text: string;
  votes: number;
}

interface Poll {
  id: number;
  title: string;
  description: string;
  status: 'not started' | 'in progress' | 'completed';
  options: Option[];
  startTime: number;
  endTime: number;
}

export default function VotingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const pollID = parseInt(params.id, 10);
  const [poll, setPoll] = useState<Poll | null>(null);

  useEffect(() => {
    const fetchPoll = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
        const contract = new ethers.Contract(contractAddress, TrustVote.abi, provider);

        try {
          const pollData = await contract.polls(pollID);
          console.log('pollData:', pollData);
          const pollOptions = await Promise.all(
            pollData.options.map(async (option: any, index: number) => {
              const votes = await contract.votes(pollID, index);
              return {
                id: index + 1,
                text: option,
                votes: votes.toNumber(),
              };
            })
          );

          const currentTime = Math.floor(Date.now() / 1000);
          let status: Poll['status'] = 'in progress';
          if (currentTime < pollData.startTime.toNumber()) {
            status = 'not started';
          } else if (currentTime > pollData.endTime.toNumber()) {
            status = 'completed';
          }

          setPoll({
            id: pollID,
            title: pollData.title,
            description: pollData.description,
            status: status,
            options: pollOptions,
            startTime: pollData.startTime.toNumber(),
            endTime: pollData.endTime.toNumber(),
          });
        } catch (err) {
          console.error('Error fetching poll data:', err);
        }
      }
    };

    fetchPoll();
  }, [pollID]);

  if (!poll) {
    return <p>Poll not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-3/4 max-w-lg">
        <h1 className="text-3xl font-bold mb-6">{poll.title}</h1>
        <p className="text-md mb-6">{poll.description}</p>
        <p className="text-md mb-6">
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
          className="bg-gray-500 text-white font-semibold rounded-md px-4 py-2 mt-4"
          onClick={() => router.push('/voting-list')}
        >
          Back to List
        </button>
      </div>
    </div>
  );
}