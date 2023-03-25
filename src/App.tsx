import { Component } from 'solid-js'
import { createEffect } from 'solid-js'

import './styles.css'
import Control from './components/Control'
import User from './components/user/User'
import { users, addNewUser, addStatus } from './store/users'
import { publishedMsgProofs, publishQueue, setPublishedMsgProofs } from './store/store'
import PublishedMessages from './components/PublishedMessages'

addNewUser();
addNewUser();
const user1 = users[0];
const user2 = users[1];




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
    // Add proofs to the cache from the publish queue (starting from the end)
    while (publishQueue().length > 0) {
      const p = publishQueue().shift()
      if (p == undefined) {
        break
      }
      console.log("Updating Caches")

      addStatus(0, p.proof)
      addStatus(1, p.proof)
      const newPublishedMsgProofs =  {
          message: p.message,
          proof: p.proof
      }
      setPublishedMsgProofs([ ...publishedMsgProofs(), newPublishedMsgProofs ])
    }
  })

  return (
    <div class="App">
      <h1 class="title">RLNjs Demo</h1>
      <hr />
      <div class="columns">
        <div class="user_left">
          <User index={0} />
        </div>
        <div class="controls">
          <Control/>
          <PublishedMessages/>
        </div>
        <div class="user_right">
          <User index={1} />
        </div>
      </div>
    </div >
  )
}

export default App
