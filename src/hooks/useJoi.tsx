import { useTranslation } from 'react-i18next';

export function useJoi() {
  const { t } = useTranslation();

  const validationMessages = {
    'any.required': t('Bitte füllen Sie dieses Feld aus.'),
    'filelist.base': t('Bitte wählen Sie ein Dokument aus.'),
    'filelist.min': t('Bitte wählen Sie ein Dokument aus.'),
    'filelist.max': t('Bitte wählen Sie genau ein Dokument aus.'),
    'filelist.invalid': t('Dieser Dateityp ist nicht erlaubt.'),
    'string.email': t('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
    'string.empty': t('Bitte füllen Sie dieses Feld aus.'),
    'string.uri': t('Bitte geben Sie eine gültige URL ein.')
  };

  return { validationMessages };
}
