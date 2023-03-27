import { createEffect, createSignal } from "solid-js"
import { users } from "../../store/users"

export type Props = {
  index: number
}

const RegistryComponent = ({ index }: Props) => {
  const [members, setMembers] = createSignal([(<></>)])
  const [slashed, setSlashed] = createSignal([(<></>)])

  const user = users[index]


  const refresh = () => {
    const newMembers =  user.registry.members.map((member) => (
      <li class="bigint">
        <span style="font-style:italic">MemberID:</span>{" "}
        {member == 0n ? (
          <span class="breach" style="font-weight: bold">
            REMOVED
          </span>
        ) : (
          <span>{member.toString()}</span>
        )}
      </li>
    ))
    setMembers(newMembers)
    const newSlashed = user.registry.slashedMembers.map((member) => (
      <li class="bigint breach">
        <span style="font-style:italic">MemberID:</span> {member.toString()}
      </li>
    ))
    setSlashed(newSlashed)
  }


  createEffect(() => {
    const newMembers = user.registry.members.map((member) => (
      <li class="bigint">
        <span style="font-style:italic">MemberID:</span>{" "}
        {member == 0n ? (
          <span class="breach" style="font-weight: bold">
            REMOVED
          </span>
        ) : (
          <span>{member.toString()}</span>
        )}
      </li>
    ))
    setMembers(newMembers)
  })

  createEffect(() => {
    const newSlashed = user.registry.slashedMembers.map((member) => (
      <li class="bigint breach">
        <span style="font-style:italic">MemberID:</span> {member.toString()}
      </li>
    ))
    setSlashed(newSlashed)
  })


  return (
    <div class="container box">
      <h3>Member Registry  <button onclick={refresh}>↻</button></h3>
      <ul class="members">
        {members()}
      </ul>
      <h3>Slashed Registry</h3>
      <ul class="members">
        {slashed()}
      </ul>
    </div>
  )
}

export default RegistryComponent