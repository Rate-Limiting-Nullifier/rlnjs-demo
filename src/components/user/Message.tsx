import { StrBigInt } from "rlnjs"
import { createSignal } from "solid-js"
import { objectToString } from "../../utils"
import { epoch, publishQueue, setPublishQueue } from "../../store/store"
import { setUsers, users } from "../../store/users"

export type Props = {
    index: number
}

const Message = ({ index }: Props) => {
    const [message, setMessage] = createSignal<string>("")
    const [disableButton, setDisableButton] = createSignal<boolean>(false)

    const user = users[index]

    const handleChange = ({ target }) => {
      setMessage(target.value.toString())
    }

  const handlePublish = async () => {
    setDisableButton(true)

      console.log("handlePublish Message: " + message())
      const merkleProof = user.registry.generateMerkleProof( user.rln.commitment )
      const fullProof = await user.rln.generateProof(
        message(),
        merkleProof,
        epoch() as StrBigInt
      )
      setUsers(index, user)
      setUsers(index, "proof", "Message: '" + message() + "'\n" + "Proof: " + objectToString(fullProof))


      console.log("Publishing Proof")
      const newPublishQueue = {
        message: message(),
        proof: fullProof,
      }
      setPublishQueue([ ...publishQueue(), newPublishQueue ])

      setDisableButton(false)
    }

    return (
        <div class="message_container box">
            <h3>Message</h3>
            <div class="message_input">
              <textarea
                class="message"
                value={ message() }
                onChange={handleChange}
                placeholder={"Put your message here"}
              ></textarea>
              <button type="button" class="publish_button" onClick={handlePublish} disabled={ disableButton() }>
                  { disableButton() ? 'Publishing' : 'Publish Message' }
              </button>
            </div>
            <h3>Proof</h3>
            <textarea class="message proof" disabled={true} rows={4} value={ user.proof || '' }></textarea>
        </div>
    )
}

export default Message