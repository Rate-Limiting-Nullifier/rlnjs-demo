import { poseidon1 } from 'poseidon-lite'
import { Registry, RLN, Cache } from 'rlnjs'
import { createStore } from 'solid-js/store'
import { RLNFullProof, StrBigInt, VerificationKeyT } from 'rlnjs/dist/types/types'

import vKey from '../zkeyFiles/verification_key.json'
import { appID } from './store'
import { EvaluatedProof } from 'rlnjs/dist/types/cache'

export type UserType = {
    rln: RLN
    registry: Registry
    cache: Cache
    status: EvaluatedProof[]
    proof: string|null
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
        _registry.addMember(existingUser.rln.commitment)
        // existing user
        existingUser.registry.addMember(_rln.commitment)
        setUsers(i, existingUser)
    })

    const user = {
        rln: _rln,
        registry: _registry,
        cache: _cache,
        status: [],
        proof: null,
    }
    setUsers(users.length, user)
}

export const addStatus = (index: number, proof: RLNFullProof) => {
    const user = users[index]

    const status = user.cache.addProof(proof)
    if (status.secret){
        user.registry.slashMember( poseidon1([status.secret]) )
        setUsers(index, 'registry', user.registry)
    }

    setUsers(index, 'cache', user.cache)
    setUsers(index, 'status', user.status.length, status)
}