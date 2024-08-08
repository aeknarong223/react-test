import { setPages } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setKey } from '../store';

const useSetKey = () => {
  const dispatch = useDispatch();
  const { key } = useSelector((state: any) => state.index);

  const setKeyProp = (key: any) => {
    dispatch(setKey(key));
  };

  return { key, setKeyProp };
}

export default useSetKey;