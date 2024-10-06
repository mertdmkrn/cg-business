import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/tr';
import 'moment/locale/en-gb';

export const filters = {
    formatDate(date, language = 'tr', format = 'DD/MM/YYYY') {
      if (date) {
        moment.locale(language === "tr" ? "tr" : "en-gb");
        return moment(String(date)).format(format);
      }
      return '-';
    },
    formatDateAndHour(date) {
      if (date) {
        return moment.tz(String(date), 'Europe/Istanbul').format('DD/MM/YYYY HH:mm');
      }
      return '-';
    }
};
