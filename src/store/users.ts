import { Registry, RLN, Cache } from 'rlnjs'
import { Accessor, createSignal } from 'solid-js'
import { StrBigInt, VerificationKeyT } from 'rlnjs/dist/types/types'

import { appID } from './store'
import vKey from '../zkeyFiles/verification_key.json'


type User = {
    rln: {
        get: Accessor<RLN>
        set: (rln: RLN) => void
    }
    registry: {
        get: Accessor<Registry>
        set: (registry: Registry) => void
    }
    cache: {
        get: Accessor<Cache>
        set: (cache: Cache) => void
    }
}

export const users: User[] = []

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

    // use reactive states
    const [rln, setRln] = createSignal(_rln)
    const [registry, setRegistry] = createSignal(_registry)
    const [cache, setCache] = createSignal(_cache)

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
        }
    }
    users.push(user)
}