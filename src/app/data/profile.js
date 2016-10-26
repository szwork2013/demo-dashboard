// Utils.
import { getLanguage } from '_utils';

const language = getLanguage();

const profile = {
  is_paid: true,
  email: 'annafadeeva79@gmail.com',
  username: language === 'ru' ? 'Анна Фадеева' : 'Emma Williams',
  wid: 9347,
  rr_length: 100,
  rescuetime_connected: false,
  sessionLength: 0,
  life_screening_paid: false,
  activated: true,
  success: true,
  language_priority: '',
  rr_total: 0,
  ready_for_subscription: false,
  spent_time: {
    home: 0.0,
    work: 0.0,
    sport: 0.0,
  },
  subscription_status: 3,
};

export default profile;
