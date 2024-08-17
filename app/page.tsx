"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

export default function LandingPage() {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new Web3Provider(window.ethereum);
      setProvider(web3Provider);
    } else {
      console.log('MetaMask is not installed');
    }
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
      } catch (err) {
        console.log('User rejected request:', err);
      }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <div>
      <h1>Your Project Description</h1>
      {account ? (
        <>
          <p>Connected Account: {account}</p>
          <button onClick={disconnectWallet}>Log Out</button>
          <button onClick={() => window.location.href = '/voting-list'}>View Voting List</button>
        </>
      ) : (
        <>
          <p>Please log in</p>
          <button onClick={connectWallet}>Connect MetaMask</button>
        </>
      )}
    </div>
  );
}