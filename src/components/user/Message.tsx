import { Registry, RLN, StrBigInt } from "rlnjs"
import { Accessor, createSignal } from "solid-js"
import { objectToString } from "../../utils"

export type Props = {
  epoch: Accessor<BigInt>
  rlnInstance: Accessor<RLN>
  userProof: Accessor<string | null>
  setUserProof: (userProof: string) => {}
  publishProof: (fullProof: any) => void
  registryInstance: Accessor<Registry>
}

const Message = ({ epoch, rlnInstance, userProof, setUserProof, publishProof, registryInstance }: Props) => {
  const [message, setMessage] = createSignal<string>("Put your message here")
  const [disableButton, setDisableButton] = createSignal<boolean>(false)

  const handleChange = ({ target }) => {
    setMessage(target.value.toString())
  }

  const handlePublish = () => {
    setDisableButton(true)

    console.log("handlePublish Message: " + message())
    rlnInstance().generateProof(message(),
      registryInstance().generateMerkleProof(rlnInstance().commitment),
      epoch() as StrBigInt).then(
        (fullProof: any) => {
          setUserProof("Message: '" + message() + "'\n" + "Proof: " + objectToString(fullProof))
          publishProof({ message: message(), proof: fullProof })
        })

    setDisableButton(false)
  }

  return (
    <div class="message_container box">
      <h3>Message</h3>
      <textarea class="message" value={message()} onChange={handleChange}></textarea>
      <button type="button" class="publishButton" onClick={handlePublish} disabled={disableButton()}>
        {disableButton() ? 'Publishing' : 'Publish Message'}
      </button>
      <h3>Proof</h3>
      <textarea class="message proof" disabled={true} rows={4} value={userProof() || ''}></textarea>
    </div>
  )
}

export default Message