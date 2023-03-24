import { createSignal, createEffect } from 'solid-js'
import type { Component } from 'solid-js'
import { objectToString } from './utils'

import vKey from './zkeyFiles/verification_key.json'
import './styles.css'

import { RLN, Registry, Cache } from 'rlnjs'
import { StrBigInt, VerificationKeyT, RLNFullProof } from 'rlnjs/dist/types/types'
import AppControl from './assets/components/Control'
import User from './assets/components/user/User'

// Getters & Setters for all RLNjs objects
const [appID, setAppID] = createSignal<BigInt>(BigInt(1234567890)) // RLN_Identifier
const [epoch, setEpoch] = createSignal<BigInt>(BigInt(1)) // Epoch

// TODO: design for N users
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

  const publishProof = (fullProof: RLNFullProof) => {
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
          <User
            index={1}
            epoch={epoch}
            rlnInstance={user1}
            userProof={user1proof}
            registryInstance={registry1}
            setUserProof={setUser1Proof}
            publishProof={publishProof}
            status={statusUser1}
          />
        </div>
        <AppControl
          setAppID={setAppID}
          appID={appID}
          setEpoch={setEpoch}
          epoch={epoch}
          publishQueue={publishQueue}
        />
        <div class="user_right">
          <User
            index={2}
            epoch={epoch}
            rlnInstance={user2}
            userProof={user2proof}
            registryInstance={registry2}
            setUserProof={setUser2Proof}
            publishProof={publishProof}
            status={statusUser2}
          />
        </div>
      </div>
    </div >
  )
}

export default App