import moment from 'moment';
import 'moment-timezone';

export const filters = {
    formatDate(date) {
      if (date) {
        return moment.tz(String(date), 'Europe/Istanbul').format('DD/MM/YYYY');
      }
      return '';
    },
    formatDateAndHour(date) {
      if (date) {
        return moment.tz(String(date), 'Europe/Istanbul').format('DD/MM/YYYY HH:mm');
      }
      return '';
    }
};
