import React from 'react';

interface MessageProps {
  msg: string;
  proof: string;
}

const Message: React.FC<MessageProps> = ({ msg, proof }) => {
  const buttonMessage = 'Send';

  return (
    <div className="message-container box">
      <h3>Message</h3>
      <textarea className="message" defaultValue={msg}></textarea>
      <button type="button" className="rounded-lg bg-green-300 px-6 pt-2.5 pb-2">
        {buttonMessage}
      </button>
      <h3>Proof</h3>
      <textarea className="message proof" disabled={true} rows={4} value={proof}></textarea>
    </div>
  );
};

interface RegistryProps {
  registry_instance: any;
}

const Registry: React.FC<RegistryProps> = ({ registry_instance }) => {
  return (
    <div className="container box">
      <h3>REGISTRY</h3>
    </div>
  );
};

interface CacheProps {
  cache_instance: any;
}

const Cache: React.FC<CacheProps> = ({ cache_instance }) => {
  return (
    <div className="container box">
      <h3>CACHE</h3>
    </div>
  );
};

interface UserProps {
  rln_instance: any;
  registry_instance: any;
  cache_instance: any;
}

const User: React.FC<UserProps> = ({ rln_instance, registry_instance, cache_instance }) => {
  return (
    <div>
      <Message msg="test message" proof="" />
      <Cache cache_instance={cache_instance} />
      <Registry registry_instance={registry_instance} />
    </div>
  );
};

export default User;
