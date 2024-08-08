import { setPages } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';

const useChangePage = () => {
  const dispatch = useDispatch();
  const { pages } = useSelector((state: RootState) => state.index);

  const changePage = (page: string) => {
    dispatch(setPages(page));
  };

  return { pages, changePage };
}

export default useChangePage;