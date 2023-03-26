import { addNewUser, users } from "../store/users"
import User from "./user/User"

const OtherUsers = () => {

    const handleClick = () => {
        addNewUser()
    }

    return (
        <div class="user_right">
            <div class="other_users_title">
                <h2>Other users {users().length} </h2>
                <button type="button" onClick={handleClick}>
                    Add User
                </button>
            </div>
            <ul>
                {users().map((_, index) => (
                    index > 0 ? <User index={index} /> : null
                ))}
            </ul>
        </div>
    )
}

export default OtherUsers