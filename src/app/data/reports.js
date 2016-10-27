import moment from 'moment';
import { I18n } from 'react-redux-i18n';

const reports = [
  {
    date: moment().subtract(14, 'days'),
    link: 'http://welltory.slides.com/welltory/lifescreeningdemo/fullscreen#/1',
    period: 'week',
    pk: 3,
    title: I18n.t('Отчёт об исследовании образа жизни'),
  },
  {
    date: moment().subtract(14, 'days'),
    link: 'https://www.dropbox.com/s/h7nmr7dqb6bvbqs/Ezhenedelniy_otchet.pdf?dl=0',
    period: 'week',
    pk: 4,
    title: I18n.t('Еженедельный отчёт'),
  },
  {
    date: moment().subtract(11, 'days'),
    link: 'https://paper.dropbox.com/doc/--hyqKAlfwYQxlXxU3bYwZD',
    period: 'week',
    pk: 5,
    title: I18n.t('Анализ и рекомендации по питанию'),
  },
  {
    date: moment().subtract(9, 'days'),
    link: 'https://paper.dropbox.com/doc/--vD8p7pzfCP1La0se2Tt3z',
    period: 'week',
    pk: 6,
    title: I18n.t('Анализ физиологического состоянии'),
  },
  {
    date: moment().subtract(5, 'days'),
    link: 'https://paper.dropbox.com/doc/--7aK4ttwkDHOUwaJy8QpMY',
    period: 'week',
    pk: 7,
    title: I18n.t('Рекомендации по физической активности в тренажёрном зале'),
  },
  {
    date: moment().subtract(2, 'days'),
    link: 'https://paper.dropbox.com/doc/--hqgLCZYFSiQGB55P6VAEe',
    period: 'week',
    pk: 8,
    title: I18n.t('Рекомендации по физической активности дома'),
  },
];

export default reports;
