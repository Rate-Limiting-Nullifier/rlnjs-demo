import { Registry } from "rlnjs"
import { Accessor } from "solid-js"

export type Props = {
    registryInstance: Accessor<Registry>
}

const RegistryComponent = ({ registryInstance }: Props) => {
  // TODO: check if registryInstance() is reloaded in handlePublish in Message.tsx
  console.log(registryInstance().members)
    return (
      <div class="container box">
        <h3>Id Commitment Registry</h3>
        <ul class="members">
          {registryInstance().members.map((member) => {
            return (
              <li class="bigint">
                { member.toString() }
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  export default RegistryComponent