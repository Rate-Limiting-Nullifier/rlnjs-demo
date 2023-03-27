import { Component } from 'solid-js'

import './styles.css'
import Control from './components/Control'
import User from './components/user/User'
import { addNewUser, users } from './store/users'
import OtherUsers from './components/OtherUsers'
import PublishedMessages from './components/PublishedMessages'



const App: Component = () => {
  addNewUser();
  addNewUser();
  return (
    <div class="App">
      <h1 class="title">RLNjs Demo</h1>
      <hr />
      <div class="columns">
        <div class="user_left">
          <h2>Current user</h2>
          {users.map((_, index) => (
            index == 0 ? <User index={index} /> : null // This is super inneficcient, we need to find a better way
          ))}
        </div>
        <div class="controls">
          <Control/>
          <PublishedMessages/>
        </div>
        <OtherUsers/>
      </div>
    </div >
  )
}

export default App
