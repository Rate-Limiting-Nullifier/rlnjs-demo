import React, { useEffect, useState } from 'react'

import { RLN, Registry as RegistryType, Cache as CacheType } from 'rlnjs'

interface MessageProps {
  msg: string
  proof: string
}

const MessageComponent: React.FC<MessageProps> = ({ msg, proof }) => {
  const buttonMessage = 'Send'

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
  )
}

interface RegistryProps {
  registry_instance: RegistryType
}

const RegistryComponent: React.FC<RegistryProps> = ({ registry_instance }) => {
  const [members, setMembers] = useState<string[]>([])

  console.log(registry_instance)
  console.log(registry_instance.members)

  return (
    <div className="container box">
      <h3>REGISTRY</h3>
      {registry_instance.members.map((member) => {
        return (
          <div className="member" key={member.toString()}>
            <span>{member.toString()}</span>
          </div>
        )
      })}
    </div>
  )
}

interface CacheProps {
  cache_instance: any
}

const CacheComponent: React.FC<CacheProps> = ({ cache_instance }) => {
  return (
    <div className="container box">
      <h3>CACHE</h3>
    </div>
  )
}

interface UserProps {
  rln_instance: any
  registry_instance: any
  cache_instance: any
}

const User: React.FC<UserProps> = ({ rln_instance, registry_instance, cache_instance }) => {
  console.log(registry_instance)
  return (
    <div>
      <MessageComponent msg="test message" proof="" />
      <CacheComponent cache_instance={cache_instance} />
      <RegistryComponent registry_instance={registry_instance} />
    </div>
  )
}

export default User
