// Utils.
import { getLanguage } from '_utils';

// Images.
import unspecifiedIMG from './images/unspecified.jpeg';
import coachingIMG from './images/coaching.jpg';

const productsRU = [
  {
    "id":5,"title":"Мониторинг и поддержка",
    "currency":"usd",
    "price":"19.00",
    "description":"Тариф для тех, кто знает, что делать. В вашем распоряжении веб и мобильное приложения, техническая поддержка, мониторинг показателей и подробная диагностика если что-то идет нет так — мы уведомим вас заранее, если заметим начало болезни. Вы сможете задать вопросы терапевту, фитнес-тренеру, психологу, неврологу, диетологу, wellness-коучу и психотерапевту. Если у вас есть план - этот тариф для вас!",
    "type":2,
    "if_you":"Исследователь",
    "img":unspecifiedIMG,
  },
  {
    "id":6,"title":"Проактивная забота",
    "currency":"usd",
    "price":"59.00",
    "description":"Тариф для достижения гарантированных результатов. Персональный аналитик следит за вашим здоровьем и самочувствием, присылает рекомендации по улучшению всех показателей на основе анализа данных. Команда врачей, тренеров и фитнес-коучей отвечает на ваши вопросы, помогает составить персональные программы тренировок и улучшения здоровья. Закажите проактивную заботу, чтобы гарантированно улучшить свое здоровье, самочувствие и внешний вид.",
    "if_you":"Человек результата",
    "type":2,
    "img":coachingIMG,
  },
];

const productsEN = [
  {
    "id":5,"title":"Monitoring and support",
    "currency":"usd",
    "price":"19.00",
    "description":"If you do have a self-improvement plan - choose this option to track your results and get support. Our mobile app and web dashboard are at your service, as well as expert tech support, monitoring and detailed diagnostics of your data should anything go wrong — we will notify you in advance if we notice any signs of a coming disease. You may address all the questions you have to our physician, fitness coach, psychologist, neurologist, nutritionist, wellness coach and psychologist. If you know your goals and you know how to achieve them – this plan is for you!",
    "type":2,
    "if_you":"Self-reseacher",
    "img":unspecifiedIMG,
  },
  {
    "id":6,"title":"Проактивная забота",
    "currency":"usd",
    "price":"59.00",
    "description":"Choose this option if you need guaranteed success. Your personal health analyst is here to take care of your health and provide you with insightful recommendations, based on the analysis of your health data, on improving all valuable metrics of your lifestyle. Our team of doctors, fitness and wellness coaches is always ready to answer your questions, help to create your personal training and health improvement programmes. Buy proactive care plan in order to boost your health, wellbeing, physical shape and appearance!",
    "type":2,
    "if_you":"Result-focused",
    "img":coachingIMG,
  },
];

let products;
if (getLanguage() === 'ru') {
  products = productsRU;
}
else {
  products = productsEN;
}

export default products;