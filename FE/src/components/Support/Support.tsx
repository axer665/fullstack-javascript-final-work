import {Container} from "react-bootstrap";
import {useAppSelector} from "@store/hooks.ts";
import SupportForm from "@components/Support/SupportForm.tsx";
import List from "@components/Support/List.tsx";

function Support() {
    const user = useAppSelector(state => state.user);
    return (
        <Container className="bg-white rounded p-2">
            <p className="fs-2 fw-bold">Список обращений</p>
            {user.role === 'client' &&
                <SupportForm/>
            }
            <List/>
        </Container>
    )
}

export default Support