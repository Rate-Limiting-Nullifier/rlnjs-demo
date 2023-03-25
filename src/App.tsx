import type { Component } from 'solid-js'
import { Registry, Cache } from 'rlnjs'
import { createSignal, createEffect } from 'solid-js'
import { StrBigInt, RLNFullProof } from 'rlnjs/dist/types/types'

import './styles.css'
import { objectToString } from './utils'
import Control from './components/Control'
import User from './components/user/User'
import { users, addNewUser } from './store/users'
import { appID, publishQueue, setPublishQueue } from './store/store'

addNewUser();
addNewUser();
const _user1 = users[0];
const _user2 = users[1];

const [registry1, setRegistry1] = createSignal<Registry>(new Registry()) // User 1's Registry
const [registry2, setRegistry2] = createSignal<Registry>(new Registry()) // User 2's Registry
const [cache1, setCache1] = createSignal<Cache>(new Cache(appID() as StrBigInt)) // User 1's Cache
const [cache2, setCache2] = createSignal<Cache>(new Cache(appID() as StrBigInt)) // User 2's Cache
const [statusUser1, setStatusUser1] = createSignal<string[]>([]) // User 1's Status
const [statusUser2, setStatusUser2] = createSignal<string[]>([]) // User 2's Status
const [user1proof, setUser1Proof] = createSignal<string | null>(null) // User 1's Last Proof as a string
const [user2proof, setUser2Proof] = createSignal<string | null>(null) // User 2's Last Proof as a string


const App: Component = () => {
  createEffect(() => {
    // Add User1 to both registries
    registry1().addMember(_user1.rln.get().commitment)
    registry2().addMember(_user1.rln.get().commitment)
    console.log("User1 Registered")
  })

  createEffect(() => {
    // Add User2 to both registries
    registry2().addMember(_user2.rln.get().commitment)
    registry1().addMember(_user2.rln.get().commitment)
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
            rlnInstance={_user1.rln.get}
            userProof={user1proof}
            registryInstance={registry1}
            setUserProof={setUser1Proof}
            publishProof={publishProof}
            status={statusUser1}
          />
        </div>
        <Control/>
        <div class="user_right">
          <User
            index={2}
            rlnInstance={_user2.rln.get}
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
