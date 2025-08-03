import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {SupportProps} from "@interfaces/support.ts";

function ListView(data: SupportProps) {
    const {list} = data;

    return (
        <div>
            {list.length > 0 ? (
                <>
                    <Table striped hover className="p-2 rounded text-center">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>E-mail</th>
                            <th>Телефон</th>
                            <th>Дата</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list.map(elem =>
                            <tr key={elem._id}>
                                <td>{elem.userId.name}</td>
                                <td>{elem.userId.email}</td>
                                <td>{elem.userId.contactPhone}</td>
                                <td>{new Date(elem.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/chat?id=${elem._id}&email=${elem.userId.email}`}
                                          className="text-decoration-none">
                                        <Button variant="warning" className="mb-1"> Пройти к обсуждению </Button>
                                    </Link>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </>
            ) : (
                <div className="text-center">Обращений нет</div>
            )}

        </div>
    )
}

export default ListView;
