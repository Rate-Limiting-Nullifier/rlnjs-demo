import Cache from "./Cache"
import Message from "./Message"
import Registry from "./Registry"

type Props = {
    index: number
}

const User = ({ index }: Props) => {
    return (
        <div>
            <h2>User { index + 1 }</h2>
            <Message index={index}/>
            <Cache index={index} />
            <Registry index={index} />
        </div>
    )
}

export default User