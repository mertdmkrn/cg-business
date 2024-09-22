import { Turkish } from "flatpickr/dist/l10n/tr.js";

export function initCalendar(events, language) {
    let date = new Date();
    let nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    let nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1);
    let prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1);

    const calendarEl = document.getElementById('calendar'),
    appCalendarSidebar = document.querySelector('.app-calendar-sidebar'),
    newAppointmentSidebar = document.getElementById('newAppointmentSidebar'),
    appOverlay = document.querySelector('.app-overlay'),
    calendarsColor = {
      Business: 'primary',
      Holiday: 'success',
      Personal: 'danger',
      Family: 'warning',
      ETC: 'info'
    },
    offcanvasTitle = document.querySelector('.offcanvas-title'),
    btnToggleSidebar = document.querySelector('.btn-toggle-sidebar'),
    iconToggleSidebar = document.querySelector('.btn-toggle-sidebar'),
    btnSubmit = document.querySelector('#addEventBtn'),
    btnDeleteEvent = document.querySelector('.btn-delete-event'),
    btnCancel = document.querySelector('.btn-cancel'),
    eventTitle = document.querySelector('#eventTitle'),
    eventStartDate = document.querySelector('#eventStartDate'),
    eventEndDate = document.querySelector('#eventEndDate'),
    eventUrl = document.querySelector('#eventURL'),
    eventLabel = $('#eventLabel'), // ! Using jquery vars due to select2 jQuery dependency
    eventGuests = $('#eventGuests'), // ! Using jquery vars due to select2 jQuery dependency
    eventLocation = document.querySelector('#eventLocation'),
    eventDescription = document.querySelector('#eventDescription'),
    allDaySwitch = document.querySelector('.allDay-switch'),
    selectAll = document.querySelector('.select-all'),
    filterInput = [].slice.call(document.querySelectorAll('.input-filter')),
    inlineCalendar = $('#inlineCalendar');

  let eventToUpdate,
    currentEvents = events, // Assign app-calendar-events.js file events (assume events from API) to currentEvents (browser store/object) to manage and update calender events
    isFormValid = false,
    inlineCalInstance;

  // Init event Offcanvas
  const bsNewAppointmentSidebar = new bootstrap.Offcanvas(newAppointmentSidebar);

  //! TODO: Update Event label and guest code to JS once select removes jQuery dependency
  // Event Label (select2)
  if (eventLabel.length) {
    function renderBadges(option) {
      if (!option.id) {
        return option.text;
      }
      var $badge =
        "<span class='badge badge-dot bg-" + $(option.element).data('label') + " me-2'> " + '</span>' + option.text;

      return $badge;
    }
    eventLabel.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'Select value',
      dropdownParent: eventLabel.parent(),
      templateResult: renderBadges,
      templateSelection: renderBadges,
      minimumResultsForSearch: -1,
      escapeMarkup: function (es) {
        return es;
      }
    });
  }

  // Event Guests (select2)
  if (eventGuests.length) {
    function renderGuestAvatar(option) {
      if (!option.id) {
        return option.text;
      }
      var $avatar =
        "<div class='d-flex flex-wrap align-items-center'>" +
        "<div class='avatar avatar-xs me-2'>" +
        "<img src='" +
        assetsPath +
        'img/avatars/' +
        $(option.element).data('avatar') +
        "' alt='avatar' class='rounded-circle' />" +
        '</div>' +
        option.text +
        '</div>';

      return $avatar;
    }
    eventGuests.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'Select value',
      dropdownParent: eventGuests.parent(),
      closeOnSelect: false,
      templateResult: renderGuestAvatar,
      templateSelection: renderGuestAvatar,
      escapeMarkup: function (es) {
        return es;
      }
    });
  }

  // Event start (flatpicker)
  if (eventStartDate) {
    var start = eventStartDate.flatpickr({
      locale: language,
      enableTime: true,
      altFormat: 'Y-m-dTH:i:S',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          instance.mobileInput.setAttribute('step', null);
        }
      }
    });
  }

  // Event end (flatpicker)
  if (eventEndDate) {
    var end = eventEndDate.flatpickr({
      locale: language,
      enableTime: true,
      altFormat: 'Y-m-dTH:i:S',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          instance.mobileInput.setAttribute('step', null);
        }
      }
    });
  }

  // Inline sidebar calendar (flatpicker)
  if (inlineCalendar) {
    inlineCalInstance = inlineCalendar.flatpickr({
      locale: language,
      monthSelectorType: 'static',
      inline: true
    });
  }

  // Event click function
  function eventClick(info) {
    eventToUpdate = info.event;
    if (eventToUpdate.url) {
      info.jsEvent.preventDefault();
      window.open(eventToUpdate.url, '_blank');
    }
    // For update event set offcanvas title text: Update Event
    if (offcanvasTitle) {
      offcanvasTitle.innerHTML = 'Update Event';
    }
    bsNewAppointmentSidebar.show();
    btnSubmit.innerHTML = 'Update';
    btnSubmit.classList.add('btn-update-event');
    btnSubmit.classList.remove('btn-add-event');
    btnDeleteEvent.classList.remove('d-none');

    eventTitle.value = eventToUpdate.title;
    start.setDate(eventToUpdate.start, true, 'Y-m-d');
    eventToUpdate.allDay === true ? (allDaySwitch.checked = true) : (allDaySwitch.checked = false);
    eventToUpdate.end !== null
      ? end.setDate(eventToUpdate.end, true, 'Y-m-d')
      : end.setDate(eventToUpdate.start, true, 'Y-m-d');
    eventLabel.val(eventToUpdate.extendedProps.calendar).trigger('change');
    eventToUpdate.extendedProps.location !== undefined
      ? (eventLocation.value = eventToUpdate.extendedProps.location)
      : null;
    eventToUpdate.extendedProps.guests !== undefined
      ? eventGuests.val(eventToUpdate.extendedProps.guests).trigger('change')
      : null;
    eventToUpdate.extendedProps.description !== undefined
      ? (eventDescription.value = eventToUpdate.extendedProps.description)
      : null;

    // // Call removeEvent function
    // btnDeleteEvent.addEventListener('click', e => {
    //   removeEvent(parseInt(eventToUpdate.id));
    //   // eventToUpdate.remove();
    //   bsNewAppointmentSidebar.hide();
    // });
  }

  // Modify sidebar toggler
  function modifyToggler() {
    const fcSidebarToggleButton = document.querySelector('.fc-sidebarToggle-button');
    fcSidebarToggleButton.classList.remove('fc-button-primary');
    fcSidebarToggleButton.classList.add('d-lg-none', 'd-inline-block', 'ps-0');
    while (fcSidebarToggleButton.firstChild) {
      fcSidebarToggleButton.firstChild.remove();
    }
    fcSidebarToggleButton.setAttribute('data-bs-toggle', 'sidebar');
    fcSidebarToggleButton.setAttribute('data-overlay', '');
    fcSidebarToggleButton.setAttribute('data-target', '#app-calendar-sidebar');
    fcSidebarToggleButton.insertAdjacentHTML('beforeend', '<i class="ti ti-menu-2 ti-lg text-heading"></i>');
  }

  // Filter events by calender
  function selectedCalendars() {
    let selected = [],
      filterInputChecked = [].slice.call(document.querySelectorAll('.input-filter:checked'));

    filterInputChecked.forEach(item => {
      selected.push(item.getAttribute('data-value'));
    });

    return selected;
  }

  // --------------------------------------------------------------------------------------------------
  // AXIOS: fetchEvents
  // * This will be called by fullCalendar to fetch events. Also this can be used to refetch events.
  // --------------------------------------------------------------------------------------------------
  function fetchEvents(info, successCallback) {
    // Fetch Events from API endpoint reference
    /* $.ajax(
      {
        url: '../../../app-assets/data/app-calendar-events.js',
        type: 'GET',
        success: function (result) {
          // Get requested calendars as Array
          var calendars = selectedCalendars();

          return [result.events.filter(event => calendars.includes(event.extendedProps.calendar))];
        },
        error: function (error) {
          console.log(error);
        }
      }
    ); */

    let calendars = selectedCalendars();
    // We are reading event object from app-calendar-events.js file directly by including that file above app-calendar file.
    // You should make an API call, look into above commented API call for reference
    let selectedEvents = currentEvents.filter(function (event) {
      // console.log(event.extendedProps.calendar.toLowerCase());
      return calendars.includes(event.extendedProps.calendar.toLowerCase());
    });
    // if (selectedEvents.length > 0) {
    successCallback(selectedEvents);
    // }
  }

  // Init FullCalendar
  // ------------------------------------------------
  let calendar = new Calendar(calendarEl, {

    locale: {
        code: language,
        week: {
          dow: language === "tr" ? 1 : 0,
          doy: 4
        },
        direction: 'ltr', 
        buttonText: {
            today: language === "tr" ? 'Bugün' : 'Today',
            prev: language === "tr" ? 'Önceki' : 'Prev',
            next: language === "tr" ? 'Sonraki' : 'Next',
            prevYear: language === "tr" ? 'Önceki Yıl' : 'Prev Year',
            nextYear: language === "tr" ? 'Sonraki Yıl' : 'Next Year',
            year: language === "tr" ? 'Yıl' : 'Year',
            month: language === "tr" ? 'Ay' : 'Month',
            week: language === "tr" ? 'Hafta' : 'Week',
            day: language === "tr" ? 'Gün' : 'Day',
            list: language === "tr" ? 'Liste' : 'List',
            dayGridMonth: language === "tr" ? 'Ay' : 'Month',
            timeGridWeek: language === "tr" ? 'Hafta' : 'Week',
            timeGridDay: language === "tr" ? 'Gün' : 'Day',
            listMonth: language === "tr" ? 'Liste' : 'List',
        },
        weekText: language === "tr" ? 'H' : 'W',
        weekTextLong: language === "tr" ? 'Hafta' : 'Week',
        closeHint: language === "tr" ? 'Kapat' : 'Close',
        timeHint: language === "tr" ? 'Zaman' : 'Time',
        eventHint: language === "tr" ? 'Randevu' : 'Appointment',
        allDayText: language === "tr" ? 'Tüm Gün' : 'All-Day',
        moreLinkText: language === "tr" ? 'daha fazla' : 'more',
        noEventsText: language === "tr" ? 'Gösterilecek randevu yok' : 'No appointment to display'
      },
    initialView: 'dayGridMonth',
    events: fetchEvents,
    plugins: [dayGridPlugin, interactionPlugin, listPlugin, timegridPlugin],
    editable: true,
    dragScroll: true,
    dayMaxEvents: 2,
    eventResizableFromStart: true,
    customButtons: {
      sidebarToggle: {
        text:  language === "tr" ? '' : 'Sidebar'
      }
    },
    headerToolbar: {
      start: 'sidebarToggle, prev, next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    direction: 'ltr',
    initialDate: new Date(),
    navLinks: true, // can click day/week names to navigate views
    eventClassNames: function ({ event: calendarEvent }) {
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar];
      // Background Color
      return ['fc-event-' + colorName];
    },
    dateClick: function (info) {
      let date = moment(info.date).format('YYYY-MM-DD');
      resetValues();
      if (offcanvasTitle) {
        offcanvasTitle.innerHTML = language === "tr" ? 'Randevu Ekle' : 'Add Appointment';
      }
      bsNewAppointmentSidebar.show();
      btnSubmit.innerHTML = language === "tr" ? 'Ekle' : 'Add';
      btnSubmit.classList.remove('btn-update-event');
      btnSubmit.classList.add('btn-add-event');
      btnDeleteEvent.classList.add('d-none');
      eventStartDate.value = date;
      eventEndDate.value = date;
    },
    eventClick: function (info) {
      eventClick(info);
    },
    datesSet: function () {
      modifyToggler();
    },
    viewDidMount: function () {
      modifyToggler();
    }
  });

  // Render calendar
  calendar.render();
  // Modify sidebar toggler
  modifyToggler();

  // Sidebar Toggle Btn
  if (btnToggleSidebar) {
    btnToggleSidebar.addEventListener('click', e => {
      btnCancel.classList.remove('d-none');
    });
  }

  // Add Event
  // ------------------------------------------------
  function addEvent(eventData) {
    // ? Add new event data to current events object and refetch it to display on calender
    // ? You can write below code to AJAX call success response

    currentEvents.push(eventData);
    calendar.refetchEvents();

    // ? To add event directly to calender (won't update currentEvents object)
    // calendar.addEvent(eventData);
  }

  // Update Event
  // ------------------------------------------------
  function updateEvent(eventData) {
    // ? Update existing event data to current events object and refetch it to display on calender
    // ? You can write below code to AJAX call success response
    eventData.id = parseInt(eventData.id);
    currentEvents[currentEvents.findIndex(el => el.id === eventData.id)] = eventData; // Update event by id
    calendar.refetchEvents();

    // ? To update event directly to calender (won't update currentEvents object)
    // let propsToUpdate = ['id', 'title', 'url'];
    // let extendedPropsToUpdate = ['calendar', 'guests', 'location', 'description'];

    // updateEventInCalendar(eventData, propsToUpdate, extendedPropsToUpdate);
  }

  // Remove Event
  // ------------------------------------------------

  function removeEvent(eventId) {
    // ? Delete existing event data to current events object and refetch it to display on calender
    // ? You can write below code to AJAX call success response
    currentEvents = currentEvents.filter(function (event) {
      return event.id != eventId;
    });
    calendar.refetchEvents();

    // ? To delete event directly to calender (won't update currentEvents object)
    // removeEventInCalendar(eventId);
  }

  // (Update Event In Calendar (UI Only)
  // ------------------------------------------------
  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    const existingEvent = calendar.getEventById(updatedEventData.id);

    // --- Set event properties except date related ----- //
    // ? Docs: https://fullcalendar.io/docs/Event-setProp
    // dateRelatedProps => ['start', 'end', 'allDay']
    // eslint-disable-next-line no-plusplus
    for (var index = 0; index < propsToUpdate.length; index++) {
      var propName = propsToUpdate[index];
      existingEvent.setProp(propName, updatedEventData[propName]);
    }

    // --- Set date related props ----- //
    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(updatedEventData.start, updatedEventData.end, {
      allDay: updatedEventData.allDay
    });

    // --- Set event's extendedProps ----- //
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    // eslint-disable-next-line no-plusplus
    for (var index = 0; index < extendedPropsToUpdate.length; index++) {
      var propName = extendedPropsToUpdate[index];
      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName]);
    }
  };

  // Remove Event In Calendar (UI Only)
  // ------------------------------------------------
  function removeEventInCalendar(eventId) {
    calendar.getEventById(eventId).remove();
  }

  // Add new event
  // ------------------------------------------------
  btnSubmit.addEventListener('click', e => {
    if (btnSubmit.classList.contains('btn-add-event')) {
      if (isFormValid) {
        let newEvent = {
          id: calendar.getEvents().length + 1,
          title: eventTitle.value,
          start: eventStartDate.value,
          end: eventEndDate.value,
          startStr: eventStartDate.value,
          endStr: eventEndDate.value,
          display: 'block',
          extendedProps: {
            location: eventLocation.value,
            guests: eventGuests.val(),
            calendar: eventLabel.val(),
            description: eventDescription.value
          }
        };
        if (eventUrl.value) {
          newEvent.url = eventUrl.value;
        }
        if (allDaySwitch.checked) {
          newEvent.allDay = true;
        }
        addEvent(newEvent);
        bsNewAppointmentSidebar.hide();
      }
    } else {
      // Update event
      // ------------------------------------------------
      if (isFormValid) {
        let eventData = {
          id: eventToUpdate.id,
          title: eventTitle.value,
          start: eventStartDate.value,
          end: eventEndDate.value,
          url: eventUrl.value,
          extendedProps: {
            location: eventLocation.value,
            guests: eventGuests.val(),
            calendar: eventLabel.val(),
            description: eventDescription.value
          },
          display: 'block',
          allDay: allDaySwitch.checked ? true : false
        };

        updateEvent(eventData);
        bsNewAppointmentSidebar.hide();
      }
    }
  });

  // Call removeEvent function
  btnDeleteEvent.addEventListener('click', e => {
    removeEvent(parseInt(eventToUpdate.id));
    bsNewAppointmentSidebar.hide();
    // eventToUpdate.remove();
});

  // Reset event form inputs values
  // ------------------------------------------------
  function resetValues() {
    // eventEndDate.value = '';
    // eventUrl.value = '';
    // eventStartDate.value = '';
    // eventTitle.value = '';
    // eventLocation.value = '';
    // allDaySwitch.checked = false;
    // eventGuests.val('').trigger('change');
    // eventDescription.value = '';
  }

  // Hide left sidebar if the right sidebar is open

  btnToggleSidebar.addEventListener('click', e => {
    if (offcanvasTitle) {
        offcanvasTitle.innerHTML = language === "tr" ? 'Randevu Ekle' : 'Add Appointment';
    }
    
    btnSubmit.innerHTML = language === "tr" ? 'Ekle' : 'Add';
    btnSubmit.classList.remove('btn-update-event');
    btnSubmit.classList.add('btn-add-event');
    btnDeleteEvent.classList.add('d-none');
    appCalendarSidebar.classList.remove('show');
    appOverlay.classList.remove('show');
  });

  // Calender filter functionality
  // ------------------------------------------------
  if (selectAll) {
    selectAll.addEventListener('click', e => {
      if (e.currentTarget.checked) {
        document.querySelectorAll('.input-filter').forEach(c => (c.checked = 1));
      } else {
        document.querySelectorAll('.input-filter').forEach(c => (c.checked = 0));
      }
      calendar.refetchEvents();
    });
  }

  if (filterInput) {
    filterInput.forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.input-filter:checked').length < document.querySelectorAll('.input-filter').length
          ? (selectAll.checked = false)
          : (selectAll.checked = true);
        calendar.refetchEvents();
      });
    });
  }

  inlineCalInstance.config.onChange.push(function (date) {
    calendar.changeView(calendar.view.type, moment(date[0]).format('YYYY-MM-DD'));
    modifyToggler();
    appCalendarSidebar.classList.remove('show');
    appOverlay.classList.remove('show');
  });

  const calendars = document.querySelectorAll('#app-calendar-sidebar .flatpickr-calendar');

  calendars.forEach((calendar, index) => {
      calendar.style.display = (index === 0) ? 'block' : 'none';
  });

  initSidebarToggle();
}

function initSidebarToggle() {
    const sidebarToggler = document.querySelectorAll('[data-bs-toggle="sidebar"]')

    sidebarToggler.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.getAttribute('data-target')
        const overlay = el.getAttribute('data-overlay')
        const appOverlay = document.querySelectorAll('.app-overlay')
        const targetEl = document.querySelectorAll(target)

        targetEl.forEach(tel => {
          tel.classList.toggle('show')
          if (
            typeof overlay !== 'undefined' &&
            overlay !== null &&
            overlay !== false &&
            typeof appOverlay !== 'undefined'
          ) {
            if (tel.classList.contains('show')) {
              appOverlay[0].classList.add('show')
            } else {
              appOverlay[0].classList.remove('show')
            }
            appOverlay[0].addEventListener('click', e => {
              e.currentTarget.classList.remove('show')
              tel.classList.remove('show')
            })
          }
        })
      })
    })
}