import React, { useEffect, useState } from 'react'
import { RLN, Registry as RegistryType, Cache as CacheType, StrBigInt } from 'rlnjs'
import { toString, getObjectKeysAndValues } from '../utils'
import { KeyValueList } from './KeyValueList'

interface MessageProps {
  msg: string
  proof: string
  publish: (message: string) => void
}

const MessageComponent: React.FC<MessageProps> = ({ msg, proof, publish }) => {
  const [message, setMessage] = useState<string>(msg)
  const buttonMessage = 'Send'

  const handlePublish = (() => {
    console.log("Send Pressed")
    publish(message)
    setMessage('')
  })

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  return (
    <div className="message-container box">
      <h3>Message</h3>
      <textarea className="message" value={message} onChange={handleChange}></textarea>
      <button type="button" className="rounded-lg bg-green-300 px-6 pt-2.5 pb-2" onClick={handlePublish}>
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
  console.log("RegistryComponent RegistryInstance and Members")
  console.log(registry_instance)
  console.log("registry length: " + registry_instance.members.length)
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
  cache_instance: CacheType
}

const CacheComponent: React.FC<CacheProps> = ({ cache_instance }) => {
  console.log("CacheComponent")
  console.log(cache_instance.cache)

  return (
    <div className="container box">
      <h3>CACHE</h3>

    </div>
  )
}

interface UserProps {
  rln_instance: RLN
  registry_instance: RegistryType
  cache_instance: CacheType
  epoch: BigInt
  publishProof: (proof: object) => void
}

const User: React.FC<UserProps> = (
  { rln_instance,
    registry_instance,
    cache_instance,
    epoch,
    publishProof }
) => {
  const [proof, setProof] = useState("")
  const handlePublish = (message) => {
    console.log("handlePublish Message: " + message)
    rln_instance.generateProof(message,
      registry_instance.generateMerkleProof(rln_instance.commitment),
      epoch as StrBigInt).then(
        (fullProof) => {
          setProof("Message: '" + message + "'\nProof: " + toString(fullProof))
          publishProof(fullProof)
        })
  }

  return (
    <div>
      <MessageComponent msg="test message" proof={proof} publish={handlePublish} />
      <CacheComponent cache_instance={cache_instance} />
      <RegistryComponent registry_instance={registry_instance} />
    </div>
  )
}

export default User
