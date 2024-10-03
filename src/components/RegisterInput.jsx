import useInput from "../hooks/UseInput";
import PropTypes from "prop-types";

export default function RegisterInput({ onRegister }) {
    const [name, onNameChane] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    return (
        <>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Name" value={name} onChange={onNameChane} />
            </div>
            <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" value={email} onChange={onEmailChange} />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={onPasswordChange} />
            </div>
            <div className="text-center">
                <button type="button" className="btn btn-primary px-5 mb-5 w-100" onClick={() => onRegister({ name, email, password })}>Register</button>
            </div>
        </>
    )
}

RegisterInput.propTypes = {
    onRegister: PropTypes.func.isRequired
}