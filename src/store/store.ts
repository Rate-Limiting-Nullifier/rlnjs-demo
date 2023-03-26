import { RLNFullProof } from 'rlnjs'
import { createSignal } from 'solid-js'

export type PublishQueueType = {
    message: string
    proof: RLNFullProof
}

// Getters & Setters for all RLNjs objects
export const [epoch, setEpoch] = createSignal<BigInt>(BigInt(1)) // Epoch
export const [appID, setAppID] = createSignal<BigInt>(BigInt(1234567890)) // RLN_Identifier
export const [publishQueue, setPublishQueue] = createSignal<PublishQueueType[]>([]) // Queue of proofs to be published
export const [publishedMsgProofs, setPublishedMsgProofs] = createSignal<PublishQueueType[]>([]) // List of published proofs