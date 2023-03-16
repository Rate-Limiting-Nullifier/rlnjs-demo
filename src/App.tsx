import React, { useState, useEffect } from 'react';
import './App.css';
import User from './Components/User';
import AppControl from './Components/AppControl';
import { RLN, Registry, Cache } from 'rlnjs';
import { StrBigInt, VerificationKeyT } from 'rlnjs/dist/types/types';

const zkeyfiles = {
  vkeyPath: 'zkeyFiles/verification_key.json',
  wasmFilePath: 'zkeyFiles/rln.wasm',
  finalZkeyPath: 'zkeyFiles/rln_final.zkey',
};

async function createRLNInstance(): Promise<RLN> {
  const vKey = await fetch(zkeyfiles.vkeyPath).then((res) => res.json());

  return new RLN(zkeyfiles.wasmFilePath, zkeyfiles.finalZkeyPath, vKey as VerificationKeyT);
}

const App: React.FC = () => {
  const [appID, setAppID] = useState<BigInt>(BigInt(1234567890));
  const [epoch, setEpoch] = useState<BigInt>(BigInt(0));
  const [user1, setUser1] = useState<RLN | null>(null);
  const [user2, setUser2] = useState<RLN | null>(null);
  const [registry1, setRegistry1] = useState<Registry>(new Registry());
  const [registry2, setRegistry2] = useState<Registry>(new Registry());
  const [cache1, setCache1] = useState<Cache>(new Cache(appID as StrBigInt));
  const [cache2, setCache2] = useState<Cache>(new Cache(appID as StrBigInt));

  useEffect(() => {
    createRLNInstance().then((_rln) => setUser1(_rln));
  }, []);

  useEffect(() => {
    createRLNInstance().then((_rln) => setUser2(_rln));
  }, []);

  useEffect(() => {
    if (user1 && user2) {
      registry1.addMember(user1.commitment)
      registry1.addMember(user2.commitment)
      registry2.addMember(user1.commitment)
      registry2.addMember(user2.commitment)
      console.log("Members Registered")
    }
  }, [user1, user2])


  const handleRlnIdentifierChange = (newValue: BigInt) => {
    setAppID(newValue);
    setCache1(new Cache(newValue as StrBigInt));
    setCache2(new Cache(newValue as StrBigInt));
    console.log("New App ID: " + newValue);
  };

  const handleEpochChange = (newValue: BigInt) => {
    setEpoch(newValue);
    console.log("New Epoch: " + newValue)
  };

  return (
    <div className="App">
      <h1 className="title">RLNjs Demo</h1>
      <hr />
      <div className="columns">
        <div className="user_left">
          <h2>User 1</h2>
          {user1 && <User rln_instance={user1} registry_instance={registry1} cache_instance={cache1} />}
        </div>
        <div className="controls">
          <h2>App Controls</h2>
          <AppControl epoch={epoch} onEpochChange={handleEpochChange} rln_identifier={appID} onRlnIdentifierChange={handleRlnIdentifierChange} />
        </div>
        <div className="user_right">
          <h2>User 2</h2>
          {user2 && <User rln_instance={user2} registry_instance={registry2} cache_instance={cache2} />}
        </div>
      </div>
    </div>
  );
};

export default App;
