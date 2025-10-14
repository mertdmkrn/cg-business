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
                <div class="offcanvas offcanvas-end event-sidebar" tabindex="-1" id="newAppointmentSidebar"
                    aria-labelledby="newAppointmentSidebarLabel">
                    <div class="offcanvas-header border-bottom">
                        <h5 class="offcanvas-title" id="newAppointmentSidebarLabel">{{ $t('AddAppointment') }}</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div class="offcanvas-body flex-grow-1 overflow-auto">
                        <div v-if="appointmentStep === 1" class="event-form pt-0">
                            <div class="mb-5">
                                <div class="mb-5 select2-form">
                                    <label class="form-label" for="customerSelectBox">{{ $t('Customer') }}</label>
                                    <select class="select2 form-select" data-allow-clear="true">
                                        <option value="" selected disabled>{{ $t('SelectValue') }}</option>
                                        <option value="fb6aaf9f-3eaf-4606-8860-1d88e4caa2d6">Mert Demirkıran</option>
                                        <option value="fb6aaf9f-3eaf-4606-8860-1d88e4caa2d2">Tolgahan Özcan</option>
                                    </select>
                                </div>

                                <div class="mb-5">
                                    <label class="form-label">{{ $t('Services') }}</label>
                                    <div class="accordion mt-1 p-0" id="accordionWithIcon">
                                        <div class="accordion-item card border">
                                            <h2 class="accordion-header d-flex align-items-center">
                                                <button type="button" class="accordion-button" data-bs-toggle="collapse"
                                                    data-bs-target="#accordionWithIcon-1" aria-expanded="true">
                                                    <i class="ti ti-star me-2"></i>
                                                    Header Option 1
                                                </button>
                                            </h2>
                                            <div id="accordionWithIcon-1" class="accordion-collapse collapse show"
                                                data-bs-parent="#accordionWithIcon">
                                                <div class="accordion-body p-0 border-top">
                                                    <div class="list-group border-none">
                                                        <a href="javascript:void(0);" class="list-group-item list-group-item-action d-flex justify-content-between waves-effect border-none">
                                                            <div class="li-wrapper d-flex justify-content-start align-items-center">
                                                                <div class="list-content">
                                                                    <h6 class="mb-1">List group item heading</h6>
                                                                    <small class="text-muted">Donec id elit non mi porta.</small>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex justify-content-center align-items-center">
                                                                <button type="button" class="btn rounded-pill btn-icon btn-success waves-effect waves-light">
                                                                    <span class="ti ti-check ti-md"></span>
                                                                </button>
                                                            </div>
                                                        </a>
                                                        <a href="javascript:void(0);" class="list-group-item list-group-item-action d-flex justify-content-between waves-effect border-none">
                                                            <div class="li-wrapper d-flex justify-content-start align-items-center">
                                                                <div class="list-content">
                                                                    <h6 class="mb-1">List group item heading</h6>
                                                                    <small class="text-muted">Donec id elit non mi porta.</small>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex justify-content-center align-items-center">
                                                                <button type="button" class="btn rounded-pill btn-icon btn-success waves-effect waves-light">
                                                                    <span class="ti ti-check ti-md"></span>
                                                                </button>
                                                            </div>
                                                        </a>
                                                        <a href="javascript:void(0);" class="list-group-item list-group-item-action d-flex justify-content-between waves-effect border-none">
                                                            <div class="li-wrapper d-flex justify-content-start align-items-center">
                                                                <div class="list-content">
                                                                    <h6 class="mb-1">List group item heading</h6>
                                                                    <small class="text-muted">
                                                                        <span>60-90 min</span>
                                                                        <b class="m-2">•</b>
                                                                        <span>1000 ₺</span>
                                                                    </small>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex justify-content-center align-items-center">
                                                                <button type="button" class="btn rounded-pill btn-icon btn-light waves-effect waves-light">
                                                                    <span class="ti ti-plus ti-md"></span>
                                                                </button>
                                                            </div>
                                                        </a>
                                                    </div>                                          
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="appointmentStep == 2" class="event-form pt-0">
                            <div class="mb-5">
                                Step 2
                            </div>
                        </div>
                        <div v-else-if="appointmentStep == 3" class="event-form pt-0">
                            <div class="mb-5">
                                Step 3
                            </div>
                        </div>
                        <div v-else-if="appointmentStep == 4" class="event-form pt-0">
                            <div class="mb-5">
                                Step 4
                            </div>
                        </div>
                    </div>

                    <div class="offcanvas-footer border-top p-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <button class="btn btn-label-secondary btn-prev waves-effect" :disabled="appointmentStep === 1" @click="appointmentStep--">
                                    <i class="ti ti-arrow-left ti-xs me-sm-2 me-0"></i>
                                    <span class="align-middle d-sm-inline-block d-none">Previous</span>
                              </button>
                            </div>
                            <button v-if="appointmentStep < 4" class="btn btn-primary btn-next waves-effect waves-light" :disabled="appointmentStep === 4" @click="appointmentStep++">
                                <span class="align-middle d-sm-inline-block d-none me-sm-2">Next</span>
                                <i class="ti ti-arrow-right ti-xs"></i>
                            </button>
                            <button v-else class="btn btn-success btn-ad dwaves-effect waves-light btn-add-event" :disabled="appointmentStep === 4" @click="appointmentStep++">
                                <span class="align-middle d-sm-inline-block d-none me-sm-2">Add</span>
                                <i class="ti ti-check ti-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
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
            workers: [],
            appointmentStep: 1,
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