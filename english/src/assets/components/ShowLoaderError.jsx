
import { observer, inject } from 'mobx-react';
import Loader from './Loader';
import NotFoundPage from './NotFoundPage';

const ShowLoaderError = ({ wordsStore, children }) => {
    if (wordsStore.isLoading) {
        console.log(12);
        return <Loader />;
    }
    if (wordsStore.error) {
        return (
            <NotFoundPage
            />
        );
    }
    return <>{children}</>;
};

export default inject(['wordsStore'])(observer(ShowLoaderError));