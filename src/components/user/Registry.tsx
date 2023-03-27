import { users } from "../../store/users"

export type Props = {
  index: number
}

const RegistryComponent = ({ index }: Props) => {
  return (
    <div class="container box">
      <h3>Member Registry</h3>
      <ul class="members">
        {users[index].registry.members.map((member) => {
          return (
            <li class="bigint">
              <span style="font-style:italic">MemberID:</span> {member == 0n ? <span class="breach" style="font-weight: bold">REMOVED</span> : <span>{member.toString()}</span>}
            </li>
          )
        })}
      </ul>
      <h3>Slashed Registry</h3>
      <ul class="members">
        {users[index].registry.slashedMembers.map((member) => {
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