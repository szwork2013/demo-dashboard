import moment from 'moment';
import { I18n } from 'react-redux-i18n';

const reports = [
  {
    date: moment().subtract(14, 'days'),
    link: 'http://welltory.slides.com/welltory/lifescreeningdemo/fullscreen',
    period: 'week',
    pk: 3,
    title: I18n.t('Ваш недельный отчет'),
  },
  {
    date: moment().subtract(7, 'days'),
    link: 'http://welltory.slides.com/welltory/lifescreeningdemo/fullscreen',
    period: 'week',
    pk: 4,
    title: I18n.t('Ваш недельный отчет'),
  },
];

export default reports;
