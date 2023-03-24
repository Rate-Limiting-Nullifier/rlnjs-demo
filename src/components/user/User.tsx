import Message, { Props as PropsMessage } from "./Message"
import Cache, { Props as PropsCache } from "./Cache"
import Registry, { Props as PropsRegistry } from "./Registry"

type Props = {
    index: number
} & PropsMessage & PropsCache & PropsRegistry

const User = ({ index, epoch, rlnInstance, userProof, setUserProof, publishProof, registryInstance, status }: Props) => {
    return (
        <div>
            <h2>User {index}</h2>
            <Message
                epoch={epoch}
                rlnInstance={rlnInstance}
                userProof={userProof}
                registryInstance={registryInstance}
                setUserProof={setUserProof}
                publishProof={publishProof}
            />
            <Registry
                registryInstance={registryInstance}
            />
            <Cache
                status={status}
            />
        </div>
    )
}

export default User