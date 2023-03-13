import React from 'react'

const Message = (props) => {
  let buttonMessage = "Send"

  return (
    <div className="message-container box">
      <h3>Message</h3>
      <textarea className="message" defaultValue={props.msg}></textarea>
      <button type="button" className="rounded-lg bg-green-300 px-6 pt-2.5 pb-2">{buttonMessage}</button>
      <h3>Proof</h3>
      <textarea className="message proof" disabled={true} rows={4} value={props.proof}></textarea>
    </div>
  )
}

const Registry = (props) => {
  return (<div className="container box">
    <h3>REGISTRY</h3>
  </div>)
}

const Cache = (props) => {
  return (<div className="container box">
    <h3>CACHE</h3>
  </div>)
}

function User(rln_instance, registry, cache) {

  return (
    <div id={rln_instance.commitment.toString()}>
      <Message msg="test message" />
      <Cache />
      <Registry />
    </div>)
}

export default User
