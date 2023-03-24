import { poseidon1 } from "poseidon-lite"
import { EvaluatedProof } from "rlnjs/dist/types/cache"
import { Accessor } from "solid-js"


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
            const { status, secret, nullifier }: EvaluatedProof = JSON.parse(str)
            return (
                <div class="cache_proof">
                    <div class="bigint">
                        {status}: { nullifier?.toString() }
                    </div>
                    {
                        status == 'breach' ?
                        <div>
                            <div class="bigint">
                                Secret: { secret?.toString() }
                            </div>
                            <div class="bigint">
                                IdCommitment: { poseidon1([BigInt(secret as bigint)]).toString() }
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
            )
          })}
        </div>
      </div>
    )
  }

  export default CacheComponent