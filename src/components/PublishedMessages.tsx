import { publishedMsgProofs } from "../store/store"

const PublishedMessages = () => {
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