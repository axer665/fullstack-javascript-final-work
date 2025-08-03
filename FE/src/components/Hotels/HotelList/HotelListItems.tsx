import { Container, Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks.ts";
import { setHotelsState } from "@store/hotels/hotelsSlice.ts";
import { HotelData } from "@interfaces/hotel.ts";
import HotelListItem from "@components/Hotels/HotelList/HotelListItem.tsx";

interface propData {
  list: HotelData[],
}

function HotelListItems(data: propData) {
  const hotelsState = useAppSelector(state => state.hotels);
  const dispatch = useAppDispatch();
  const { list } = data;

  const nextPage = async (data: string) => {
    try {
      if (data === 'plus') {
        dispatch(setHotelsState({ offset: hotelsState.offset + hotelsState.limit }));
      } else if (data === 'minus') {
        dispatch(setHotelsState({ offset: hotelsState.offset - hotelsState.limit }));
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      {list.length === 0 ? (
        <Container className="p-2 d-flex justify-content-center">
          <span>Нет отелей</span>
        </Container>
      ) : (
        <>
          {list.map(elem =>
            <HotelListItem key={elem._id} hotel={elem} showBtn={true} />
          )}
          <Pagination className="mt-3">
            {hotelsState.offset > 0 && 
              <Pagination.Item onClick={() => nextPage('minus')}>
                Назад
              </Pagination.Item>
            }
            {hotelsState.list.length >= hotelsState.limit && 
              <Pagination.Item onClick={() => nextPage('plus')}>
                Дальше
              </Pagination.Item>
            }
          </Pagination>
        </>
        
      )}
      
    </>
  )
}

export default HotelListItems