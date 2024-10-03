import { Link, useNavigate } from "react-router-dom";
import { HOME_PAGE_PATH, REGISTER_PAGE_PATH } from "../utils/RoutePath";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";
import LoginInput from "../components/LoginInput";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onLogin({ email, password }) {
        dispatch(asyncSetAuthUser({ email, password }));
        navigate(HOME_PAGE_PATH);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Login</h2>
                    <div className="card my-5">
                        <form className="card-body cardbody-color p-lg-5">
                            <div className="text-center">
                                <img src="src/assets/logo.jpg" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px" alt="profile" />
                            </div>
                            <LoginInput onLogin={onLogin} />
                            <div className="form-text text-center mb-5 text-dark">Not Registered? <Link to={REGISTER_PAGE_PATH} className="text-dark fw-bold"> Create an Account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}