"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateVotingPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const router = useRouter();

    const handleCreate = () => {
        // You would normally send this data to the backend here.
        const newPoll = {
            title,
            description,
            startTime,
            endTime,
            status: "not started",
        };
        console.log(newPoll);

        // Redirect to the voting list page after creation
        router.push("/voting-list");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center w-3/4 max-w-lg">
                <h1 className="text-3xl font-bold mb-4">Create New Voting</h1>
                <div className="mb-4">
                    <label className="block text-left font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-left font-semibold mb-2">Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-left font-semibold mb-2">Start Time</label>
                    <input
                        type="datetime-local"
                        className="w-full p-2 border rounded"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-left font-semibold mb-2">End Time</label>
                    <input
                        type="datetime-local"
                        className="w-full p-2 border rounded"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-green-500 text-white px-6 py-2 rounded font-semibold hover:bg-green-600"
                >
                    Create Voting
                </button>
            </div>
        </div>
    );
}