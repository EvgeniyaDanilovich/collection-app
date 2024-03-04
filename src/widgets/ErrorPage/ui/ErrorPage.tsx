import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

export const ErrorPage = () => {
    const { t } = useTranslation();

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div>
            <p>{t('An unexpected error occurred')}</p>
            <Button onClick={reloadPage}>
                {t('Refresh the page')}
            </Button>
        </div>
    );
};
