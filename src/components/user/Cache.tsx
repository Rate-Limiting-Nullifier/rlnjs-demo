import { poseidon1 } from "poseidon-lite"
import { users } from "../../store/users"


export type Props = {
  index: number
}

const CacheComponent = ({ index }: Props) => {
  const user = users[index]
  return (
    <div class="container box">
      <h3>Cache Status</h3>
      <div class="cache">
        {user.status.map((proof) => {
          const { status, secret, nullifier, msg } = proof
          if (status == 'breach') {
            return (
              <div class='cache_proof breach'>
                <div>
                  <div class="bigint">
                    <span style="font-style: italic; text-transform: uppercase; font-weight: bold">Nulifier {status}:</span> {nullifier?.toString()}
                  </div>
                  <div class="bigint">
                    <span style="font-style: italic; font-weight: bold">Secret:</span> {secret?.toString()}
                  </div>
                  <div class="bigint">
                    <span>MemberID:</span> {poseidon1([BigInt(secret as bigint)]).toString()}
                  </div>
                </div>
              </div>)
          } else if (status == 'added') {
            return (
              <div class='cache_proof'>
                <div class="bigint">
                  <span style="font-style: italic">Nullifier {status}:</span> {nullifier?.toString()}
                </div>
              </div>)
          } else {
            return (
              <div class='cache_proof'>
                <div class="bigint">
                  <span style="font-style: italic">Nullifier {status}:</span> {msg}
                </div>
              </div>)
          }
        })}
      </div>
    </div >
  )
}

export default CacheComponent