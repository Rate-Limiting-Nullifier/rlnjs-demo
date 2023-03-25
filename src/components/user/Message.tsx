import { StrBigInt } from "rlnjs"
import { createSignal } from "solid-js"
import { ProofType, registryType, rlnType } from "../../store/users"
import { objectToString } from "../../utils"
import { epoch, publishQueue, setPublishQueue } from "../../store/store"

export type Props = {
    rln: rlnType
    proof: ProofType
    registry: registryType
}

const Message = ({ rln, proof, registry }: Props) => {
    const [message, setMessage] = createSignal<string>("Put your message here")
    const [disableButton, setDisableButton] = createSignal<boolean>(false)

    const handleChange = ({ target }) => {
      setMessage(target.value.toString())
    }

    const handlePublish = async () => {
      setDisableButton(true)

      console.log("handlePublish Message: " + message())
      const merkleProof = registry.get().generateMerkleProof( rln.get().commitment )
      const fullProof = await rln.get().generateProof(
        message(),
        merkleProof,
        epoch() as StrBigInt
      )

      registry.set( registry.get() )
      rln.set( rln.get() )

      proof.set("Message: '" + message() + "'\n" + "Proof: " + objectToString(fullProof))
      console.log("Publishing Proof")
      setPublishQueue([ ...publishQueue(), fullProof ])

      setDisableButton(false)
    }

    return (
        <div class="message_container box">
            <h3>Message</h3>
            <textarea class="message" value={ message() } onChange={handleChange}></textarea>
            <button type="button" class="publishButton" onClick={handlePublish} disabled={ disableButton() }>
                { disableButton() ? 'Publishing' : 'Publish Message' }
            </button>
            <h3>Proof</h3>
            <textarea class="message proof" disabled={true} rows={4} value={ proof.get() || '' }></textarea>
        </div>
    )
}

export default Message