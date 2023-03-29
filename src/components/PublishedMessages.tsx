import { createEffect } from "solid-js"
import { addStatus, users } from "../store/users"
import { publishedMsgProofs, publishQueue, setPublishedMsgProofs } from "../store/store"

const PublishedMessages = () => {
  createEffect(() => {
    // Add proofs to the cache from the publish queue (starting from the end)
    while (publishQueue().length > 0) {
      const p = publishQueue().shift()
      if (p == undefined) {
        break
      }
      console.log("Updating Caches")

      const newPublishedMsgProofs =  {
          message: p.message,
          proof: p.proof
      }
      setPublishedMsgProofs([ ...publishedMsgProofs(), newPublishedMsgProofs ])
    }
  })

  return (
    <div class="box">
        <h3>
          Published Messages
        </h3>
        {publishedMsgProofs().map((p) => {
          return (
            <div class="published_message">
              <div class="smallerint">Msg: {p.message}</div>
              <div class="smallerint">By: {p.proof.snarkProof.publicSignals.internalNullifier.toString()}</div>
              <div class="smallerint">Epoch: {p.proof.snarkProof.publicSignals.externalNullifier.toString()}</div>

            </div>)
        })}
    </div>
  )
}

export default PublishedMessages