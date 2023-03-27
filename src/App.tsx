import { Component } from 'solid-js'
import { createEffect } from 'solid-js'

import './styles.css'
import Control from './components/Control'
import User from './components/user/User'
import { addNewUser, addStatus } from './store/users'
import { publishedMsgProofs, publishQueue, setPublishedMsgProofs } from './store/store'
import PublishedMessages from './components/PublishedMessages'

addNewUser();
addNewUser();


const App: Component = () => {

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
