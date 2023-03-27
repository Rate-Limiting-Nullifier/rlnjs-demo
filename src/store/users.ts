import { Accessor, createSignal } from 'solid-js'
import { poseidon1 } from 'poseidon-lite'
import { Registry, RLN, Cache } from 'rlnjs'
import { createStore } from 'solid-js/store'
import { RLNFullProof, StrBigInt, VerificationKeyT } from 'rlnjs/dist/types/types'

import { objectToString } from '../utils'
import vKey from '../zkeyFiles/verification_key.json'
import { appID } from './store'

export type UserType = {
    rln: rlnType
    registry: registryType
    cache: cacheType
    status: statusType
    proof: ProofType
}

export type rlnType = {
    get: Accessor<RLN>
    set: (rln: RLN) => void
}

export type registryType = {
    get: Accessor<Registry>
    set: (registry: Registry) => void
}

export type cacheType = {
    get: Accessor<Cache>
    set: (cache: Cache) => void
}

export type statusType = {
    get: Accessor<string[]>
    set: (status: string[]) => void
}

export type ProofType = {
    get: Accessor<string|null>
    set: (proof: string) => void
}

export const [users, setUsers] = createStore<UserType[]>([])

export const addNewUser = () => {
    // create user objects
    const _rln = new RLN(
        '/src/zkeyFiles/rln.wasm',
        '/src/zkeyFiles/rln_final.zkey',
        vKey as VerificationKeyT,
        appID() as bigint
    )
    const _registry = new Registry()
    const _cache = new Cache(appID() as StrBigInt)

    // register user itself
    _registry.addMember(_rln.commitment)
    users.forEach((existingUser, i) => {
        // new user
        _registry.addMember(existingUser.rln.get().commitment)
        // existing user
        existingUser.registry.get().addMember(_rln.commitment)
        existingUser.registry.set( existingUser.registry.get() )
    })

    // use reactive states
    const [rln, setRln] = createSignal(_rln)
    const [registry, setRegistry] = createSignal(_registry)
    const [cache, setCache] = createSignal(_cache)
    const [status, setStatus] = createSignal([])
    const [proof, setProof] = createSignal(null)

    const user = {
        rln: {
            get: rln,
            set: setRln,
        },
        registry: {
            get: registry,
            set: setRegistry,
        },
        cache: {
            get: cache,
            set: setCache,
        },
        status: {
            get: status,
            set: setStatus,
        },
        proof: {
            get: proof,
            set: setProof,
        }
    }
    setUsers(users.length, user)
}

export const addStatus = (index: number, proof: RLNFullProof) => {
    const user = users[index]

    const status = user.cache.get().addProof(proof)
    const newStatus = [...user.status.get(), objectToString(status)]

    user.status.set(newStatus)
    user.cache.set(user.cache.get())

    if (status.secret){
        user.registry.get().slashMember( poseidon1([status.secret]) )
        user.registry.set( user.registry.get() )
    }
}