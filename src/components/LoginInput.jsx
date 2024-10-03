import useInput from "../hooks/UseInput";
import PropTypes from "prop-types";

export default function LoginInput({ onLogin }) {
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    return (
        <>
            <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" onChange={onEmailChange} value={email} />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password" onChange={onPasswordChange} value={password} />
            </div>
            <div className="text-center">
                <button type="button" className="btn btn-primary px-5 mb-5 w-100" onClick={() => onLogin({ email, password })}>
                    Login
                </button>
            </div>
        </>
    )
}

LoginInput.propTypes = {
    onLogin: PropTypes.func.isRequired
}