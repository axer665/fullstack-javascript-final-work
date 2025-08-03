import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@store/hooks.ts";
import {logout} from "@store/users/userSlice.ts";
import iziToast from "izitoast";

function Profile() {
    const userId = useAppSelector(state => state.user.id);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
        iziToast.success({
            message: 'Вы покинули систему.',
            position: 'topRight',
        });
        navigate('/');
    }

    return (
        <div className="d-flex flex-column">
            <Link to={`/reservations?id=${userId}`} className="mb-1 text-decoration-none">
                <Button variant="primary">
                    Мои брони
                </Button>
            </Link>
            <button className="btn btn-danger" onClick={onLogout}>
                Выйти
            </button>
        </div>
    )
}

export default Profile;
