import { Link } from "react-router-dom";
import { LOGIN_PAGE_PATH } from "../utils/RoutePath";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../states/users/action";
import RegisterInput from "../components/RegisterInput";

export default function RegisterPage() {
    const dispatch = useDispatch();

    function onRegister({ name, email, password }) {
        dispatch(asyncRegisterUser({ name, email, password }));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Register</h2>
                    <div className="card my-5">
                        <form className="card-body cardbody-color p-lg-5">
                            <div className="text-center">
                                <img src="src/assets/logo2.jpg" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px" alt="profile" />
                            </div>
                            <RegisterInput onRegister={onRegister} />
                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">
                                Already have an account? <Link to={LOGIN_PAGE_PATH} className="text-dark fw-bold"> Login here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}