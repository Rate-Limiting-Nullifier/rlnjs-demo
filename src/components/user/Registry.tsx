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
      <h3>Member Registry</h3>
      <ul class="members">
        {registryInstance().members.map((member) => {
          return (
            <li class="bigint">
              <span style="font-style:italic">MemberID:</span> {member == 0n ? <span class="breach" style="font-weight: bold">REMOVED</span> : <span>member.toString()</span>}
            </li>
          )
        })}
      </ul>
      <h3>Slashed Registry</h3>
      <ul class="members">
        {registryInstance().slashedMembers.map((member) => {
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