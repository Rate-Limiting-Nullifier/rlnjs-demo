import { registryType } from "../../store/users"

export type Props = {
    registry: registryType
}

const RegistryComponent = ({ registry }: Props) => {
  // TODO: check if registry.get() is reloaded in handlePublish in Message.tsx
  console.log(registry.get().members)
  return (
    <div class="container box">
      <h3>Member Registry</h3>
      <ul class="members">
        {registry.get().members.map((member) => {
          return (
            <li class="bigint">
              <span style="font-style:italic">MemberID:</span> {member == 0n ? <span class="breach" style="font-weight: bold">REMOVED</span> : <span>{member.toString()}</span>}
            </li>
          )
        })}
      </ul>
      <h3>Slashed Registry</h3>
      <ul class="members">
        {registry.get().slashedMembers.map((member) => {
          return (
            <li class="bigint breach">
              <span style="font-style:italic">MemberID:</span> {member.toString()}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RegistryComponent