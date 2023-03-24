import { createSignal, createEffect } from 'solid-js'
import type { Component } from 'solid-js'
import { objectToString, getObjectKeysAndValues } from './utils'

import vKey from './zkeyFiles/verification_key.json'
import './styles.css'

import { RLN, Registry, Cache } from 'rlnjs'
import { StrBigInt, VerificationKeyT, RLNFullProof } from 'rlnjs/dist/types/types'
import { poseidon1 } from 'poseidon-lite'
import AppControl from './assets/components/control'

// Getters & Setters for all RLNjs objects
const [appID, setAppID] = createSignal<BigInt>(BigInt(1234567890)) // RLN_Identifier
const [epoch, setEpoch] = createSignal<BigInt>(BigInt(1)) // Epoch





const [user1, setUser1] = createSignal<RLN>(await createRLNInstance(appID()).then(
  (_rln) => _rln
)) // User 1's RLN instance
const [user2, setUser2] = createSignal<RLN>(await createRLNInstance(appID()).then(
  (_rln) => _rln
)) // User 2's RLN instance
const [registry1, setRegistry1] = createSignal<Registry>(new Registry()) // User 1's Registry
const [registry2, setRegistry2] = createSignal<Registry>(new Registry()) // User 2's Registry
const [cache1, setCache1] = createSignal<Cache>(new Cache(appID() as StrBigInt)) // User 1's Cache
const [cache2, setCache2] = createSignal<Cache>(new Cache(appID() as StrBigInt)) // User 2's Cache
const [statusUser1, setStatusUser1] = createSignal<string[]>([]) // User 1's Status
const [statusUser2, setStatusUser2] = createSignal<string[]>([]) // User 2's Status
const [user1proof, setUser1Proof] = createSignal<string | null>(null) // User 1's Last Proof as a string
const [user2proof, setUser2Proof] = createSignal<string | null>(null) // User 2's Last Proof as a string
const [publishQueue, setPublishQueue] = createSignal<RLNFullProof[]>([]) // Queue of proofs to be published

async function createRLNInstance(app_identifier: BigInt): Promise<RLN> {
  return new RLN('/src/zkeyFiles/rln.wasm', '/src/zkeyFiles/rln_final.zkey', vKey as VerificationKeyT, app_identifier as bigint)
}

const App: Component = () => {
  createEffect(() => {
    // Add User1 to both registries
    registry1().addMember(user1().commitment)
    registry2().addMember(user1().commitment)
    console.log("User1 Registered")
  })

  createEffect(() => {
    // Add User2 to both registries
    registry2().addMember(user2().commitment)
    registry1().addMember(user2().commitment)
    console.log("User2 Registered")
  })

  createEffect(() => {
    // Add proofs to the cache from the publish queue
    while (publishQueue().length > 0) {
      const p = publishQueue().shift()
      console.log("Updating Caches")
      const status1 = cache1().addProof(p as RLNFullProof)
      setStatusUser1([...statusUser1(), objectToString(status1)])
      const status2 = cache2().addProof(p as RLNFullProof)
      setStatusUser2([...statusUser2(), objectToString(status2)])
      setCache1(cache1())
      setCache2(cache2())
    }
  })

  const publishProof = (fullProof) => {
    console.log("Publishing Proof")
    // Add proof to the publish queue
    setPublishQueue([...publishQueue(), fullProof])
  }

  return (
    <div class="App">
      <h1 class="title">RLNjs Demo</h1>
      <hr />
      <div class="columns">
        <div class="user_left">
          <h2>User 1</h2>
          <User rln_instance={user1} userProof={user1proof} setUserProof={setUser1Proof} publishProof={publishProof} registry_instance={registry1} />
          <CacheComponent status={statusUser1} />
          <RegistryComponent registry_instance={registry1} />
        </div>
        <AppControl
          setAppID={setAppID}
          appID={appID}
          setEpoch={setEpoch}
          epoch={epoch}
          publishQueue={publishQueue}
        />
        <div class="user_right">
          <h2>User 2</h2>
          <User rln_instance={user2} userProof={user2proof} setUserProof={setUser2Proof} publishProof={publishProof} registry_instance={registry2} />
          <CacheComponent status={statusUser2} />
          <RegistryComponent registry_instance={registry2} />
        </div>
      </div>
    </div >
  )
}

const User = (props: any) => {
  const [message, setMessage] = createSignal<string>("Put your message here")
  const [publishMessage, setPublishMessage] = createSignal<string>("Publish Message")
  const [disableButton, setDisableButton] = createSignal<boolean>(false)
  const { rln_instance, userProof, setUserProof, publishProof, registry_instance } = props
  const handleChange = (event) => {
    setMessage(event.target.value.toString())
  }
  const handlePublish = (event) => {
    setPublishMessage("Publishing...")
    setDisableButton(true)
    console.log("handlePublish Message: " + message())
    rln_instance().generateProof(message(),
      registry_instance().generateMerkleProof(rln_instance().commitment),
      epoch() as StrBigInt).then(
        (fullProof: any) => {
          setUserProof("Message: '" + message() + "'\nProof: " + objectToString(fullProof))
          publishProof(fullProof)
        })
    setPublishMessage("Publish Message")
    setDisableButton(false)
  }

  return (
    <div>
      <div class="message_container box">
        <h3>Message</h3>
        <textarea class="message" value={message()} onChange={handleChange}></textarea>
        <button type="button" class="rounded-lg bg-green-300 px-6 pt-2.5 pb-2" onClick={handlePublish} disabled={disableButton()}>
          {publishMessage()}
        </button>
        <h3>Proof</h3>
        <textarea class="message proof" disabled={true} rows={4} value={userProof()}></textarea>
      </div >
    </div>
  )
}

const CacheComponent = (props) => {
  const { status } = props
  console.log(status())
  return (
    <div class="container box">
      <h3>Cache Status</h3>
      <div class="cache">
        {status().map((s) => {
          s = JSON.parse(s)
          let breached = (<></>)
          if (s.status == "breach") {
            let secret = poseidon1([BigInt(s.secret)]).toString()
            breached = (<div>
              <div class="bigint">Secret: {s.secret}</div>
              <div class="bigint">IdCommitment: {secret}</div>
            </div>)
          }
          return (<>
            <div class="cache_proof">
              <div class="bigint">{s.status}: {s.nullifier}
              </div>
              {breached}
            </div>

          </>)
        })}
      </div>
    </div >
  )
}

const RegistryComponent = (props) => {
  const [members, setMembers] = createSignal<string[]>([])
  const { registry_instance } = props

  createEffect(() => {
    setMembers(registry_instance().members.map((member) => member.toString()))
  })

  return (
    <div class="container box">
      <h3>Id Commitment Registry</h3>
      <ul class="members">
        {registry_instance().members.map((member) => {
          return (
            <li class="bigint">
              {member.toString()}
            </li>
          )
        })}
      </ul>
    </div>
  )
}


export default App
