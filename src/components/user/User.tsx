import { users } from "../../store/users"
import Cache from "./Cache"
import Message from "./Message"
import Registry from "./Registry"

type Props = {
    index: number
}

const User = ({ index }: Props) => {
    const { rln, registry, status, proof } = users[index];
    return (
        <div>
            <h2>User { index + 1 }</h2>
            <Message
                rln={rln}
                proof={proof}
                registry={registry}
            />
            <Cache status={status.get} />
            <Registry registry={registry} />
        </div>
    )
}

export default User