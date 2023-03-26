import { Component } from 'solid-js'

import './styles.css'
import Control from './components/Control'
import User from './components/user/User'
import { addNewUser } from './store/users'
import PublishedMessages from './components/PublishedMessages'

addNewUser();
addNewUser();


const App: Component = () => {
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
