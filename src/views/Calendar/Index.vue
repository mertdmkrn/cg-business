<template>
    <WelcomeBar />

    <div class="card app-calendar-wrapper shadow-none border">
        <div class="row g-0">
            <!-- Calendar Sidebar -->
            <div class="col app-calendar-sidebar border-end" id="app-calendar-sidebar">
                <div class="border-bottom p-6 my-sm-0 mb-4">
                    <button class="btn btn-primary btn-toggle-sidebar w-100" data-bs-toggle="offcanvas"
                        data-bs-target="#newAppointmentSidebar" aria-controls="newAppointmentSidebar">
                        <i class="ti ti-plus ti-16px me-2"></i>
                        <span class="align-middle">{{ $t('NewAppointment') }}</span>
                    </button>
                </div>
                <div class="px-3 pt-2">
                    <div class="inline-calendar" id="inlineCalendar"></div>
                </div>
                <hr class="mb-6 mx-n4 mt-3" />
                <div class="px-6 pb-2">
                    <div>
                        <h5>{{ $t('TeamMemberFilter') }}</h5>
                    </div>

                    <div class="form-check form-check-secondary mb-5 ms-2">
                        <input class="form-check-input select-all" type="checkbox" id="selectAll" data-value="all"
                            checked />
                        <label class="form-check-label" for="selectAll">{{ $t('ViewAll') }}</label>
                    </div>

                    <div class="app-calendar-events-filter text-heading table-responsive" style="max-height:15rem;">
                        <div v-for="worker in workers" :key="worker.id" class="form-check mb-5 ms-2">
                            <input class="form-check-input input-filter" type="checkbox" :id="`select-${worker.id}`"
                                :data-value="worker.id" checked />
                            <label class="form-check-label" :for="`select-${worker.id}`">{{ worker.name }}</label>
                        </div>
                    </div>

                    <!-- <div class="app-calendar-events-filter text-heading">
                        <div class="form-check form-check-warning mb-5 ms-2">
                            <input class="form-check-input input-filter" type="checkbox" id="select-pending"
                                data-value="pending" checked />
                            <label class="form-check-label" for="select-pending">Pending</label>
                        </div>
                        <div class="form-check mb-5 ms-2">
                            <input class="form-check-input input-filter" type="checkbox" id="select-approved"
                                data-value="approved" checked />
                            <label class="form-check-label" for="select-approved">Approved</label>
                        </div>
                        <div class="form-check form-check-success mb-5 ms-2">
                            <input class="form-check-input input-filter" type="checkbox" id="select-completed"
                                data-value="completed" checked />
                            <label class="form-check-label" for="select-completed">Completed</label>
                        </div>
                        <div class="form-check form-check-danger mb-5 ms-2">
                            <input class="form-check-input input-filter" type="checkbox" id="select-cancelled"
                                data-value="cancelled" checked />
                            <label class="form-check-label" for="select-cancelled">Cancelled</label>
                        </div>
                    </div> -->
                </div>
            </div>
            <!-- /Calendar Sidebar -->

            <!-- Calendar & Modal -->
            <div class="col app-calendar-content">
                <div class="card shadow-none border-0">
                    <div class="card-body pb-0">
                        <!-- FullCalendar -->
                        <div id="calendar"></div>
                    </div>
                </div>
                <div class="app-overlay"></div>
                <!-- FullCalendar Offcanvas -->
                <div class="offcanvas offcanvas-end event-sidebar" tabindex="-1" id="newAppointmentSidebar"
                    aria-labelledby="newAppointmentSidebarLabel">
                    <div class="offcanvas-header border-bottom">
                        <h5 class="offcanvas-title" id="newAppointmentSidebarLabel">{{ $t('AddAppointment') }}</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <form class="event-form pt-0" id="eventForm" onsubmit="return false">
                            <div class="mb-5">
                                <div class="mb-5">
                                    <label class="form-label" for="customerSelectBox">{{ $t('Customer') }}</label>
                                    <select class="select2 form-select" data-allow-clear="true">
                                        <option value="" selected disabled>{{ $t('SelectValue') }}</option>
                                        <option value="fb6aaf9f-3eaf-4606-8860-1d88e4caa2d6">
                                            Mert Demirkıran</option>
                                        <option value="fb6aaf9f-3eaf-4606-8860-1d88e4caa2d2">
                                            Tolgahan Özcan</option>
                                    </select>
                                </div>
                                <div class="mb-5">
                                    <label class="form-label" for="eventStartDate">{{ $t('StartDate') }}</label>
                                    <input type="text" class="form-control" id="eventStartDate" name="eventStartDate"
                                        :placeholder="$t('StartDate')" />
                                </div>
                                <div class="mb-5">
                                    <label class="form-label" for="eventEndDate">{{ $t('EndDate') }}</label>
                                    <input type="text" class="form-control" id="eventEndDate" name="eventEndDate"
                                        :placeholder="$t('EndDate')" />
                                </div>
                                <div class="mb-5">
                                    <label class="form-label" for="eventDescription">{{ $t('Description') }}</label>
                                    <textarea class="form-control" name="eventDescription"
                                        id="eventDescription"></textarea>
                                </div>
                                <div id="eventWorkerInfo"></div>
                            </div>
                            <!-- <div class="mb-5">
                                <label class="form-label" for="eventLabel">Label</label>
                                <select class="select2 select-event-label form-select" id="eventLabel"
                                    name="eventLabel">
                                    <option data-label="primary" value="Business" selected>Business</option>
                                    <option data-label="danger" value="Personal">Personal</option>
                                    <option data-label="warning" value="Family">Family</option>
                                    <option data-label="success" value="Holiday">Holiday</option>
                                    <option data-label="info" value="ETC">ETC</option>
                                </select>
                            </div>
                            <div class="mb-5">
                                <label class="form-label" for="eventStartDate">Start Date</label>
                                <input type="text" class="form-control" id="eventStartDate" name="eventStartDate"
                                    placeholder="Start Date" />
                            </div>
                            <div class="mb-5">
                                <label class="form-label" for="eventEndDate">End Date</label>
                                <input type="text" class="form-control" id="eventEndDate" name="eventEndDate"
                                    placeholder="End Date" />
                            </div>
                            <div class="mb-5">
                                <div class="form-check form-switch">
                                    <input type="checkbox" class="form-check-input allDay-switch" id="allDaySwitch" />
                                    <label class="form-check-label" for="allDaySwitch">All Day</label>
                                </div>
                            </div>
                            <div class="mb-5">
                                <label class="form-label" for="eventURL">Event URL</label>
                                <input type="url" class="form-control" id="eventURL" name="eventURL"
                                    placeholder="https://www.google.com" />
                            </div>
                            <div class="mb-4 select2-primary">
                                <label class="form-label" for="eventGuests">Add Guests</label>
                                <select class="select2 select-event-guests form-select" id="eventGuests"
                                    name="eventGuests" multiple>
                                    <option data-avatar="1.png" value="Jane Foster">Jane Foster</option>
                                    <option data-avatar="3.png" value="Donna Frank">Donna Frank</option>
                                    <option data-avatar="5.png" value="Gabrielle Robertson">Gabrielle Robertson</option>
                                    <option data-avatar="7.png" value="Lori Spears">Lori Spears</option>
                                    <option data-avatar="9.png" value="Sandy Vega">Sandy Vega</option>
                                    <option data-avatar="11.png" value="Cheryl May">Cheryl May</option>
                                </select>
                            </div>
                            <div class="mb-5">
                                <label class="form-label" for="eventLocation">Location</label>
                                <input type="text" class="form-control" id="eventLocation" name="eventLocation"
                                    placeholder="Enter Location" />
                            </div>
                            <div class="mb-5">
                                <label class="form-label" for="eventDescription">Description</label>
                                <textarea class="form-control" name="eventDescription" id="eventDescription"></textarea>
                            </div> -->
                            <div class="d-flex justify-content-sm-between justify-content-start mt-6 gap-2">
                                <div class="d-flex">
                                    <button type="submit" id="addEventBtn" class="btn btn-primary btn-add-event me-4">
                                        {{ $t("Add") }}
                                    </button>
                                    <button type="reset" class="btn btn-label-secondary btn-cancel me-sm-0 me-1"
                                        data-bs-dismiss="offcanvas">
                                        {{ $t("Cancel") }}
                                    </button>
                                </div>
                                <button class="btn btn-label-danger btn-delete-event d-none">
                                    {{ $t("Delete") }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- /Calendar & Modal -->
        </div>
    </div>
</template>

<script>
import WelcomeBar from '../../components/WelcomeBar.vue';
import { initCalendar } from '../../assets/js/calendar';
import { initSelect2 } from '../../assets/js/forms-selects';


export default {
    components: {
        WelcomeBar
    },
    data() {
        return {
            events: [],
            statuses: ["Pending", "Approved", "Completed", "Cancelled"],
            workers: []
        }
    },
    created() {
        this.getCalendar();
    },
    methods: {
        async getCalendar() {
            const response = await this.$appAxios.post("/businessadmin/getCalendarInfos");
            const events = response?.data?.data;
            this.workers = [...new Map(
                events.flatMap(event => event.workers)
                    .map(worker => [worker.id, worker])
            ).values()]
                .sort((a, b) => a.name.localeCompare(b.name));

            window.events = events.map(event => ({
                id: event.id,
                title: event.user.name,
                start: event.startDate,
                end: event.endDate,
                allDay: false,
                extendedProps: {
                    status: this.statuses[event.status],
                    workers: event.workers,
                    user: event.user
                }
            }));

            initCalendar(this.$i18n.locale);
            initSelect2(this.$i18n.locale);
        },
    }
}
</script>


<style>
@import url('../../assets/vendor/libs/select2/select2.css');
@import url('../../assets/vendor/libs/fullcalendar/fullcalendar.css');
@import url('../../assets/vendor/libs/quill/editor.css');
@import url('../../assets/vendor/libs/bootstrap-select/bootstrap-select.css');
@import url('../../assets/vendor/css/pages/app-calendar.css');
</style>