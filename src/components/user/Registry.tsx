import { registryType } from "../../store/users"
import { createEffect, createSignal, onCleanup } from 'solid-js'

export type Props = {
  registry: registryType
}

const RegistryComponent = ({ registry }: Props) => {
  // TODO: check if registry.get() is reloaded in handlePublish in Message.tsx
  const [members, setMembers] = createSignal([(<></>)])
  const [slashed, setSlashed] = createSignal([(<></>)])

  const refresh = () => {
    registry.set(registry.get())
    const newMembers = registry.get().members.map((member) => (
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
    const newSlashed = registry.get().slashedMembers.map((member) => (
      <li class="bigint breach">
        <span style="font-style:italic">MemberID:</span> {member.toString()}
      </li>
    ))
    setSlashed(newSlashed)
  }

  createEffect(() => {
    const newMembers = registry.get().members.map((member) => (
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
    const newSlashed = registry.get().slashedMembers.map((member) => (
      <li class="bigint breach">
        <span style="font-style:italic">MemberID:</span> {member.toString()}
      </li>
    ))
    setSlashed(newSlashed)
  })

  return (
    <div class="container box">
      <h3>Member Registry <button onclick={refresh}>↻</button></h3>
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