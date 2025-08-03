import List from "@components/Reservations/List.tsx"

function Reservation() {
    return (
        <div className="bg-white rounded shadow-sm p-2">
            <div>
                <h3 className="fs-2 fw-bold">Список броней</h3>
            </div>
            <List/>
        </div>
    )
}

export default Reservation