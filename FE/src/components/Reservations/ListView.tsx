import {Button} from "react-bootstrap";
import {ReservationProps} from "@interfaces/reservation.ts";

function ListView(data: ReservationProps) {
    const {list, handleDelete} = data;

    return (
        <div>
            {list.length > 0 ? (
                <>
                    <p className="text-muted">Пользователь: {list[0].userId.email}</p>
                    <table className="p-2 rounded text-center">
                        <thead>
                        <tr>
                            <th>Отель</th>
                            <th>Номер</th>
                            <th>Даты начала</th>
                            <th>Дата окончания</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list.map(elem =>
                            <tr key={elem._id}>
                                <td>{elem.hotelId.title}</td>
                                <td>{elem.roomId.title}</td>
                                <td>{new Date(elem.dateStart).toLocaleDateString()}</td>
                                <td>{new Date(elem.dateEnd).toLocaleDateString()}</td>
                                <td>
                                    <Button variant="danger" className="mb-1"
                                            onClick={() => handleDelete(elem._id)}>Отмена</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </>
            ) : (
                <p className="text-muted">Броней нет</p>
            )}

        </div>
    )
}

export default ListView;
