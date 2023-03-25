import type { Component } from 'solid-js'
import { createSignal, createEffect } from 'solid-js'
import { RLNFullProof } from 'rlnjs/dist/types/types'

import './styles.css'
import { objectToString } from './utils'
import Control from './components/Control'
import User from './components/user/User'
import { users, addNewUser } from './store/users'
import { appID, publishQueue, setPublishQueue } from './store/store'

addNewUser();
addNewUser();
const user1 = users[0];
const user2 = users[1];

const [statusUser1, setStatusUser1] = createSignal<string[]>([]) // User 1's Status
const [statusUser2, setStatusUser2] = createSignal<string[]>([]) // User 2's Status
const [user1proof, setUser1Proof] = createSignal<string | null>(null) // User 1's Last Proof as a string
const [user2proof, setUser2Proof] = createSignal<string | null>(null) // User 2's Last Proof as a string


const App: Component = () => {
  createEffect(() => {
    // Add User1 to both registries
    user1.registry.get().addMember(user1.rln.get().commitment)
    user2.registry.get().addMember(user1.rln.get().commitment)
    console.log("User1 Registered")
  })

  createEffect(() => {
    // Add User2 to both registries
    user2.registry.get().addMember(user2.rln.get().commitment)
    user1.registry.get().addMember(user2.rln.get().commitment)
    console.log("User2 Registered")
  })

  createEffect(() => {
    // Add proofs to the cache from the publish queue
    while (publishQueue().length > 0) {
      const p = publishQueue().shift()
      console.log("Updating Caches")

      const status1 = user1.cache.get().addProof(p as RLNFullProof)
      setStatusUser1([...statusUser1(), objectToString(status1)])
      user1.cache.set(user1.cache.get())


      const status2 = user2.cache.get().addProof(p as RLNFullProof)
      setStatusUser2([...statusUser2(), objectToString(status2)])
      user2.cache.set(user2.cache.get())
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
            rlnInstance={user1.rln.get}
            userProof={user1proof}
            registryInstance={user1.registry.get}
            setUserProof={setUser1Proof}
            publishProof={publishProof}
            status={statusUser1}
          />
        </div>
        <Control/>
        <div class="user_right">
          <User
            index={2}
            rlnInstance={user2.rln.get}
            userProof={user2proof}
            registryInstance={user2.registry.get}
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
