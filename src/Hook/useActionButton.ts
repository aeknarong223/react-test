import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setIsClicked, setIsClickedSpacial } from '../store';

const useActionButton = () => {
  const dispatch = useDispatch();
  const clickedStates = useSelector((state: RootState) => state.index);
  const {isClickedSpacial} = useSelector((state: RootState) => state.index);

  const handleButtonClick = (buttonId: number) => {
    dispatch(setIsClicked({ buttonId, value: true }));
    setTimeout(() => {
      dispatch(setIsClicked({ buttonId, value: false }));
    }, 300);
  };

  const handleButtonClickSpacial = () => {
    dispatch(setIsClickedSpacial(true));
    setTimeout(() => {
      dispatch(setIsClickedSpacial(false));
    }, 300);
  };

  return { isClickedSpacial,clickedStates, handleButtonClick, handleButtonClickSpacial };
};

export default useActionButton;
