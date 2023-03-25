import { poseidon1 } from "poseidon-lite"
import { EvaluatedProof } from "rlnjs/dist/types/cache"
import { Accessor } from "solid-js"
import { toString } from '../../../src_react/utils'


export type Props = {
  status: Accessor<string[]>
}

const CacheComponent = ({ status }: Props) => {
  console.log(status())
  return (
    <div class="container box">
      <h3>Cache Status</h3>
      <div class="cache">
        {status().map((str) => {
          const { status, secret, nullifier, msg }: EvaluatedProof = JSON.parse(str)
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