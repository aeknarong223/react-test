import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../store';

const useGetData = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state: any) => state.index);

    const GetData = () => {
      const storedData = localStorage.getItem("formData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log("Loaded data from localStorage:", parsedData);
            dispatch(setData(parsedData));
        }
    }
        
    

    return {data, GetData};
};

export default useGetData;
