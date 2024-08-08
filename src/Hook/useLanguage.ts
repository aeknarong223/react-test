import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../store';
import { RootState } from '../Type/translationType';

const useLanguage = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const lang = useSelector((state: RootState) => state.index.lang);

    const changeLanguage = (languageCode: string) => {
        dispatch(setLanguage({ value: languageCode, label: t(languageCode) }));
        i18n.changeLanguage(languageCode);
    };

    return { lang , changeLanguage, t };
};

export default useLanguage;