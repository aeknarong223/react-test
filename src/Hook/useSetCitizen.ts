// hooks/useCitizenID.ts
import { useDispatch, useSelector } from 'react-redux';
import { setPart, resetCitizenID } from '../store';
import { RootState, CitizenIDParts } from '../Type/translationType';

const useCitizenID = () => {
  const dispatch = useDispatch();
  const citizenID = useSelector((state: RootState) => state.index);

  const handleSetPart = (part: keyof CitizenIDParts, value: string) => {
    dispatch(setPart({ part, value }));
  };

  const handleResetCitizenID = () => {
    dispatch(resetCitizenID());
  };

  const setCitizenIDFromString = (id: string) => {
    const parts = id.split('-');
    if (parts.length === 5) {
      dispatch(setPart({ part: 'part1', value: parts[0] }));
      dispatch(setPart({ part: 'part2', value: parts[1] }));
      dispatch(setPart({ part: 'part3', value: parts[2] }));
      dispatch(setPart({ part: 'part4', value: parts[3] }));
      dispatch(setPart({ part: 'part5', value: parts[4] }));
    }
  };

  return {
    citizenID,
    setPart: handleSetPart,
    resetCitizenID: handleResetCitizenID,
    setCitizenIDFromString
  };
};

export default useCitizenID;
