import { registryType } from "../../store/users"

export type Props = {
    registry: registryType
}

const RegistryComponent = ({ registry }: Props) => {
  // TODO: check if registryInstance() is reloaded in handlePublish in Message.tsx
  console.log(registry.get().members)
    return (
      <div class="container box">
        <h3>Id Commitment Registry</h3>
        <ul class="members">
          {registry.get().members.map((member) => {
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