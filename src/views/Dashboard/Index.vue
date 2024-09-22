<template>

  <WelcomeBar />

  <div class="row g-6 mb-6">
    <InfoBox
      :info="{ title: $t('Earnings'), spot: `₺${totalInfos.lastWeekEarning?.toLocaleString($i18n.locale)}`, percentage: totalInfos.lastWeekEarningPercentage, description: $t('Last7Days'), iconColorClass: 'bg-label-primary', iconClass: 'ti-currency-dollar' }" />
    <InfoBox
      :info="{ title: $t('Customer'), spot: totalInfos.customerCount?.toLocaleString($i18n.locale), percentage: totalInfos.monthlyCustomerIncreasePercentage, description: $t('TotalCustomer'), iconColorClass: 'bg-label-info', iconClass: 'ti-users' }" />
    <InfoBox
      :info="{ title: $t('ActiveAppointments'), spot: totalInfos.activeAppointmentCount, description: $t('Total'), iconColorClass: 'bg-label-success', iconClass: 'ti-calendar' }" />
    <InfoBox
      :info="{ title: $t('PendingAppointments'), spot: totalInfos.pendingAppointmentCount, description: $t('Total'), iconColorClass: 'bg-label-primary', iconClass: 'ti-clock' }" />
  </div>

  <div class="row g-6 mb-6">
    <div class="col-lg-6">
      <div class="card h-100 shadow-none border">
        <div class="card-header d-flex align-items-center justify-content-between mb-0">
          <div class="card-title mb-0">
            <h5 class="mb-1">{{ $t('EarningReports') }}</h5>
            <p class="card-subtitle">{{ $t('WeeklyEarningsOverview') }}</p>
          </div>
          <div class="dropdown">
            <button class="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1" type="button" id="topic"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="ti ti-dots-vertical ti-md text-muted"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="topic">
              <a class="dropdown-item" href="javascript:void(0);">{{ $t('ViewMore') }}</a>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row align-items-center g-md-8">
            <div class="col-12 col-md-5 d-flex flex-column">
              <div class="d-flex gap-2 align-items-center mb-3 flex-wrap">
                <h2 class="mb-0">₺{{ totalInfos.lastWeekEarning?.toLocaleString($i18n.locale) }}</h2>
                <div v-if="totalInfos.lastWeekEarningPercentage && totalInfos.lastWeekEarningPercentage != 0"
                  class="badge rounded"
                  :class="totalInfos.lastWeekEarningPercentage < 0 ? 'bg-label-danger' : 'bg-label-success'">{{
                    (totalInfos.lastWeekEarningPercentage > 0 ? '+' : '') +
                    totalInfos.lastWeekEarningPercentage.toLocaleString($i18n.locale) }}%</div>
              </div>
              <small class="text-body">{{ $t('WeekComparisonInfo') }}</small>
            </div>
            <div class="col-12 col-md-7 ps-xl-8">
              <div ref="weeklyEarningReports" style="min-height: 220px;"></div>
            </div>
          </div>
          <div class="border rounded p-5 mt-5">
            <div class="row gap-4 gap-sm-0">
              <div class="col-12 col-sm-4">
                <div class="d-flex gap-2 align-items-center">
                  <div class="badge rounded bg-label-primary p-1">
                    <i class="ti ti-currency-dollar ti-sm"></i>
                  </div>
                  <h6 class="mb-0 fw-normal">{{ $t('Earnings') }}</h6>
                </div>
                <h4 class="my-2">₺{{ totalInfos.lastWeekEarning?.toLocaleString($i18n.locale) }}</h4>
                <div class="progress w-75" style="height: 4px">
                  <div class="progress-bar" role="progressbar"
                    :style="{ width: totalInfos.lastWeekEarning > 0 ? '100%' : 'auto' }"
                    :aria-valuenow="totalInfos.lastWeekEarning > 0 ? 100 : 0" aria-valuemin="0" aria-valuemax="100">
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-4">
                <div class="d-flex gap-2 align-items-center">
                  <div class="badge rounded bg-label-info p-1"><i class="ti ti-chart-pie-2 ti-sm"></i></div>
                  <h6 class="mb-0 fw-normal">{{ $t('Profit') }}</h6>
                </div>
                <h4 class="my-2">₺0</h4>
                <div class="progress w-75" style="height: 4px">
                  <div class="progress-bar bg-info" role="progressbar" style="width: 0%" aria-valuenow="0"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div class="col-12 col-sm-4">
                <div class="d-flex gap-2 align-items-center">
                  <div class="badge rounded bg-label-danger p-1">
                    <i class="ti ti-cash-banknote-off ti-sm"></i>
                  </div>
                  <h6 class="mb-0 fw-normal">{{ $t('Expense') }}</h6>
                </div>
                <h4 class="my-2">₺0</h4>
                <div class="progress w-75" style="height: 4px">
                  <div class="progress-bar bg-danger" role="progressbar" style="width: 0%" aria-valuenow="0"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card h-100 shadow-none border">
        <div class="card-header d-flex align-items-center justify-content-between mb-0">
          <div class="card-title mb-0">
            <h5 class="mb-1">{{ $t('TeamMembers') }}</h5>
            <p class="card-subtitle">{{ $t('TeamMembers') }}</p>
          </div>
          <div class="dropdown">
            <button class="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1" type="button" id="topic"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="ti ti-dots-vertical ti-md text-muted"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="topic">
              <a class="dropdown-item" href="javascript:void(0);">{{ $t('ViewMore') }}</a>
            </div>
          </div>
        </div>
        <div class="card-body p-0 mt-0">
          <div class="nav-align-top">
            <ul class="nav nav-tabs nav-fill rounded-0 timeline-indicator-advanced" role="tablist">
              <li class="nav-item" role="presentation">
                <button type="button" class="nav-link waves-effect active" role="tab" data-bs-toggle="tab"
                  data-bs-target="#navs-this-month" aria-controls="navs-this-month" aria-selected="true">
                  {{ $t('ThisMonth') }}
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button type="button" class="nav-link waves-effect" role="tab" data-bs-toggle="tab"
                  data-bs-target="#navs-last-month" aria-controls="navs-last-month" aria-selected="false" tabindex="-1">
                  {{ $t('LastMonth') }}
                </button>
              </li>
            </ul>
            <div class="tab-content p-0">
              <div class="tab-pane fade active show" id="navs-this-month" role="tabpanel">
                <div class="px-3 px-sm-5 py-4" style="border-bottom: 1px solid #e6e6e8 !important;">
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="mb-0 text-uppercase">{{ $t('Professional') }}</p>
                    <p class="mb-0 text-uppercase">{{ $t('Appointment') }}</p>
                    <p class="mb-0 text-uppercase">{{ $t('ThisMonthCapital') }}</p>
                  </div>
                </div>
                <div v-if="workerReportThisMonth && workerReportThisMonth.length > 0" class="p-3 p-sm-5">
                  <div v-for="(item, index) in workerReportThisMonth.slice(0, 4)" :key="item.workerName"
                    class="d-flex justify-content-between align-items-center" :class="index < 3 ? 'mb-6' : ''">
                    <div class="d-flex align-items-center" style="flex: 0 0 55%;">
                      <div class="avatar me-2 me-sm-4">
                        <img :src="item.workerImageUrl" alt="Avatar" class="rounded-circle">
                      </div>
                      <div>
                        <div>
                          <h6 class="mb-0 text-truncate">{{ item.workerName }}</h6>
                          <small class="text-truncate text-body">{{ item.workerTitle }}</small>
                        </div>
                      </div>
                    </div>
                    <div class="text-start" style="flex: 0 0 20%;">
                      <h6 class="mb-0 me-10">{{ item.appointmentCount }}</h6>
                    </div>
                    <div class="text-end" style="flex: 0 0 25%;">
                      <h6 class="mb-0">₺{{ item.totalEarning.toLocaleString($i18n.locale) }}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="navs-last-month" role="tabpanel">
                <div class="px-3 px-sm-5 py-4" style="border-bottom: 1px solid #e6e6e8 !important;">
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="mb-0 text-uppercase">{{ $t('Professional') }}</p>
                    <p class="mb-0 text-uppercase">{{ $t('Appointment') }}</p>
                    <p class="mb-0 text-uppercase">{{ $t('LastMonthCapital') }}</p>
                  </div>
                </div>
                <div v-if="workerReportLastMonth && workerReportLastMonth.length > 0" class="p-3 p-sm-5">
                  <div v-for="item in workerReportLastMonth" :key="item.workerName"
                    class="d-flex justify-content-between align-items-center mb-6">
                    <div class="d-flex align-items-center" style="flex: 0 0 55%;">
                      <div class="avatar me-2 me-sm-4">
                        <img :src="item.workerImageUrl" alt="Avatar" class="rounded-circle">
                      </div>
                      <div>
                        <div>
                          <h6 class="mb-0 text-truncate">{{ item.workerName }}</h6>
                          <small class="text-truncate text-body">{{ item.workerTitle }}</small>
                        </div>
                      </div>
                    </div>
                    <div class="text-start" style="flex: 0 0 20%;">
                      <h6 class="mb-0 me-10">{{ item.appointmentCount }}</h6>
                    </div>
                    <div class="text-end" style="flex: 0 0 25%;">
                      <h6 class="mb-0">₺{{ item.totalEarning.toLocaleString() }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row g-6 mb-6">
    <div class="col-lg-4">
      <div class="card h-100 shadow-none border">
        <div class="card-header d-flex align-items-center justify-content-between">
          <div class="card-title mb-0">
            <h5 class="mb-1 me-2">{{ $t('PopularServices') }}</h5>
            <p class="card-subtitle">{{ $t('Last30Days') }}</p>
          </div>
          <div class="dropdown">
            <button class="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1" type="button" id="topic"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="ti ti-dots-vertical ti-md text-muted"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="topic">
              <a class="dropdown-item" href="javascript:void(0);">{{ $t('ViewMore') }}</a>
            </div>
          </div>
        </div>
        <div class="card-body">
          <ul v-if="businessServiceReport && businessServiceReport.length > 0" class="p-0 m-0">
            <li v-for="(service, index) in businessServiceReport.slice(0, 5)" :key="service.businessServiceName"
              class="d-flex" :class="index < 4 ? 'mb-2' : ''">
              <div class="chart-progress me-4" :data-color="classList[index]" :data-series="service.percentage"
                data-progress_variant="true"></div>
              <div class="row w-100 align-items-center">
                <div class="col-9">
                  <div class="me-2">
                    <h6 class="mb-1 text-truncate fw-bolder" :class="'text-' + classList[index]">{{ service.serviceName
                      }}</h6>
                    <small class="text-truncate">{{ service.businessServiceName }}</small>
                  </div>
                </div>
                <div class="col-3 text-end">
                  <div class="badge rounded bg-label-info">
                    {{ service.appointmentCount }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card h-100 shadow-none border">
        <div class="card-header d-flex align-items-center justify-content-between">
          <div class="card-title mb-0">
            <h5 class="mb-1 me-2">{{ $t('PopularCategories') }}</h5>
            <p class="card-subtitle">{{ $t('Last30Days') }}</p>
          </div>
          <div class="dropdown">
            <button class="btn btn-text-secondary rounded-pill text-muted border-0 p-2 me-n1" type="button" id="topic"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="ti ti-dots-vertical ti-md text-muted"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="topic">
              <a class="dropdown-item" href="javascript:void(0);">{{ $t('ViewMore') }}</a>

            </div>
          </div>
        </div>
        <div class="card-body row g-6">
          <div class="col-xxl-7 col-md-8">
            <div ref="horizontalBarChart"></div>
          </div>
          <div class="col-1 d-none d-xxl-block"></div>
          <div v-if="serviceReport && serviceReport.length > 0"
            class="col-md-4 d-flex justify-content-around align-items-center">
            <div>
              <div v-for="(service, index) in serviceReport" :key="service.serviceName">
                <div v-if="index % 2 === 0" class="d-flex align-items-baseline" :class="index === 2 ? 'my-12' : ''">
                  <span class="me-2" :class="'text-' + classList[index]">
                    <i class="ti ti-circle-filled ti-12px"></i>
                  </span>
                  <div>
                    <p class="mb-0">{{ service.serviceName }}</p>
                    <h5>{{ service.percentage.toLocaleString($i18n.locale) }}%</h5>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div v-for="(service, idx) in serviceReport.slice(0, 6)" :key="service.serviceName">
                <div v-if="idx % 2 === 1" class="d-flex align-items-baseline" :class="idx === 3 ? 'my-12' : ''">
                  <span class="me-2" :class="'text-' + classList[idx]">
                    <i class="ti ti-circle-filled ti-12px"></i>
                  </span>
                  <div>
                    <p class="mb-0">{{ service.serviceName }}</p>
                    <h5>{{ service.percentage.toLocaleString($i18n.locale) }}%</h5>
                  </div>
                </div>
              </div>

              <div v-if="serviceReport && (serviceReport.length === 3 || serviceReport.length === 5)">
                <div class="d-flex align-items-baseline" :class="serviceReport.length === 3 ? 'my-12' : ''">
                  <span class="me-2" :class="'text-' + classList[serviceReport.length - 1]">
                  </span>
                  <div>
                    <p class="mb-0">&nbsp;</p>
                    <h5>&nbsp;</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <div class="card h-100 shadow-none border">
        <div class="table-responsive mb-0">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="head-label">
              <h5 class="card-title mb-0 pt-1">{{ $t('TodaysNextAppointment') }}</h5>
            </div>
            <button class="btn btn-secondary btn-primary waves-effect waves-light px-4 h-px-40" tabindex="0"
              type="button">
              <span class="text-nowrap">
                <span>{{ $t('ShowAll') }}</span>
                <i class="ti ti-arrow-narrow-right ms-0 ms-sm-1 mb-50"></i>
              </span>
            </button>
          </div>
          <div class="card-body p-0">
            <table
              class="datatables-projects table table-sm dataTable dataTables_wrapper dt-bootstrap5 dtr-column collapsed mb-0  border-bottom">
              <thead class="border-top">
                <tr class="pt-0">
                  <th class="w-px-300">
                    <span class="ps-50">{{ $t('CustomerCapital') }}</span>
                  </th>
                  <th class="w-px-300">
                    <b class="text-start fs-5" style="color: rgba(18, 25, 38, 0.12);">|</b>
                    <span class="ps-6">{{ $t('Time') }}</span>
                  </th>
                  <th class="w-px-300">
                    <b class="text-start fs-5" style="color: rgba(18, 25, 38, 0.12);">|</b>
                    <span class="ps-6">{{ $t('Duration') }}</span>
                  </th>
                  <th class="w-px-300">
                    <b class="text-start fs-5" style="color: rgba(18, 25, 38, 0.12);">|</b>
                    <span class="ps-6">{{ $t('Professional') }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(appointment, index) in appointmentReport" :key="index" class="border-none"
                  :class="index % 2 === 0 ? 'odd' : 'even'">
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="avatar me-2 me-sm-4 border-none">
                        <img :src="appointment.userImageUrl || defaultUserImage" alt="Avatar" class="rounded-circle">
                      </div>
                      <div class=" border-none">
                        <div>
                          <h6 class="mb-0 text-truncate">{{ appointment.userName }}</h6>
                          <small class="text-truncate text-body">{{ appointment.userTelephone }}</small>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><span class="p-0 ps-7 text-nowrap m-0">{{ appointment.hour }}</span></td>
                  <td><span class="ps-7 text-nowrap">{{ appointment.totalDuration }}</span></td>
                  <td>
                    <ul v-if="appointment.workerInfos && appointment.workerInfos.length > 0"
                      class="list-group list-group-flush ps-7">
                      <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap p-0">
                        <div class="d-flex flex-wrap align-items-center">
                          <ul class="list-unstyled users-list d-flex align-items-center avatar-group m-0 me-2">
                            <li v-for="(worker, workerIndex) in appointment.workerInfos" :key="workerIndex"
                              data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                              :title="worker.name" :aria-label="worker.name" class="avatar pull-up">
                              <img class="rounded-circle" :src="worker.imageUrl" :alt="worker.name">
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr v-if="appointmentReport.length < 5" v-for="n in (5 - appointmentReport.length)" :key="'empty-' + n">
                  <td style="padding: 1.925rem !important; border-color: transparent !important;" colspan="4"></td>
                </tr>
              </tbody>
            </table>
            <div class="row mx-md-3 flex-column flex-md-row justify-content-between align-items-center m-0 p-0">
              <Pagination v-model="page" :total-items="records" :per-page="perPage" :current-page="page" :size="3"
                @page-changed="getAppointmentReport" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination.vue';
import InfoBox from '../../components/InfoBox.vue';
import { DefaultUserImage } from '../../utils/constants.js';
import WelcomeBar from '../../components/WelcomeBar.vue';

export default {
  components: {
    Pagination,
    InfoBox,
    WelcomeBar
  },
  data() {
    return {
      totalInfos: {
        customerCount: 0,
        activeAppointmentCount: 0,
        pendingAppointmentCount: 0,
        monthlyCustomerIncreasePercentage: 0,
        lastWeekEarning: 0,
        lastWeekEarningPercentage: 0
      },
      workerReportThisMonth: [],
      workerReportLastMonth: [],
      businessServiceReport: [],
      serviceReport: [],
      appointmentReport: [],
      page: 1,
      perPage: 5,
      records: 0,
      classList: ["primary", "info", "danger", "warning", "success", "secondary"],
      popularServiceGraphicWrited: false,
      defaultUserImage: DefaultUserImage
    }
  },
  created() {
    this.getTotalCount();
    this.getEarningReport();
    this.getWorkerReport();
  },
  mounted() {
    this.getServiceReport();
    this.getAppointmentReport(this.page);
    this.getWorkerReport(false);
  },
  updated() {
    if (!this.popularServiceGraphicWrited) {
      this.initPopularServicesReports();
    }
  },
  methods: {
    async getTotalCount() {
      const totalCountResponse = await this.$appAxios.post("/businessadmin/gettotaldata", {});

      this.totalInfos.customerCount = totalCountResponse?.data?.data?.customerCount || 0;
      this.totalInfos.monthlyCustomerIncreasePercentage = totalCountResponse?.data?.data?.monthlyCustomerIncreasePercentage || 0;
      this.totalInfos.activeAppointmentCount = totalCountResponse?.data?.data?.activeAppointmentCount || 0;
      this.totalInfos.pendingAppointmentCount = totalCountResponse?.data?.data?.pendingAppointmentCount || 0;
    },

    async getEarningReport() {
      const getEarningReportResponse = await this.$appAxios.post("/businessadmin/getearningreport", {});

      this.totalInfos.lastWeekEarning = getEarningReportResponse?.data?.data?.lastWeekEarning || 0;
      this.totalInfos.lastWeekEarningPercentage = getEarningReportResponse?.data?.data?.lastWeekEarningPercentage || 0;
      this.initWeeklyEarningReports(getEarningReportResponse?.data?.data?.dailyList);
    },

    async getWorkerReport(isThisMonth = true) {

      const endDate = new Date();
      endDate.setMonth(isThisMonth ? endDate.getMonth() : endDate.getMonth() - 1);

      const startDate = new Date();
      startDate.setMonth(isThisMonth ? endDate.getMonth() - 1 : endDate.getMonth() - 2);

      const requestBody = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        page: 0,
        take: 4
      };

      const getEarningReportResponse = await this.$appAxios.post("/businessadmin/getworkerreport", requestBody);

      if (isThisMonth) {
        this.workerReportThisMonth = getEarningReportResponse?.data?.data;
      } else {
        this.workerReportLastMonth = getEarningReportResponse?.data?.data;
      }
    },

    async getServiceReport() {
      const endDate = new Date();

      const startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 1);

      const requestBody = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };

      const getServiceReportResponse = await this.$appAxios.post("/businessadmin/getservicereport", requestBody);

      this.businessServiceReport = getServiceReportResponse?.data?.data?.businessServiceDatas;
      this.serviceReport = getServiceReportResponse?.data?.data?.serviceDatas;

      this.initPopularCategoriesReports(this.serviceReport);
    },

    async getAppointmentReport(page) {
      this.page = page;

      const endDate = new Date();
      endDate.setHours(23, 59, 59, 999);

      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);

      const requestBody = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        page: page - 1,
        take: this.perPage
      };

      const getAppointmentReportResponse = await this.$appAxios.post("/businessadmin/getappointmentreport", requestBody);


      this.records = getAppointmentReportResponse?.data?.data?.itemCount || 0;
      this.appointmentReport = getAppointmentReportResponse?.data?.data?.reportInfos || [];
    },

    initPopularServicesReports() {
      const chartProgressList = document.querySelectorAll('.chart-progress');
      if (chartProgressList.length > 0) {
        chartProgressList.forEach((chartProgressEl) => {
          const color = config.colors[chartProgressEl.dataset.color];
          const series = chartProgressEl.dataset.series;
          const progressVariant = chartProgressEl.dataset.progress_variant;
          const optionsBundle = this.radialBarChart(color, series, progressVariant);
          const chart = new ApexCharts(chartProgressEl, optionsBundle);
          chart.render().catch(err => console.error("Chart rendering failed:", err));
        });
        this.popularServiceGraphicWrited = true;
      }
    },

    initWeeklyEarningReports(reportDatas) {
      const weeklyEarningReportsEl = this.$refs.weeklyEarningReports;

      const earnings = reportDatas.map(x => x.earning);

      const maxEarningIndex = earnings.reduce((maxIdx, currentVal, currentIndex, arr) => {
        return currentVal > arr[maxIdx] ? currentIndex : maxIdx;
      }, 0);

      const colors = new Array(reportDatas.length).fill("rgba(115, 103, 240, 0.16)");
      colors[maxEarningIndex] = "rgba(115, 103, 240, 1)";

      if (weeklyEarningReportsEl !== null && weeklyEarningReportsEl !== undefined) {
        const weeklyEarningReportsConfig = {
          chart: {
            height: 220,
            parentHeightOffset: 0,
            type: 'bar',
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              barHeight: '60%',
              columnWidth: '38%',
              startingShape: 'rounded',
              endingShape: 'rounded',
              borderRadius: 4,
              distributed: true,
              minBarHeight: '20px'
            }
          },
          grid: {
            show: false,
            padding: {
              top: -30,
              bottom: 0,
              left: -10,
              right: -10
            }
          },
          colors: colors,
          dataLabels: {
            enabled: false
          },
          series: [
            {
              data: reportDatas.map(x => x.earning)
            }
          ],
          legend: {
            show: false
          },
          xaxis: {
            categories: reportDatas.map(x => x.dayStr),
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              style: {
                colors: "rgba(42, 48, 60, 0.4)",
                fontSize: '13px',
                fontFamily: 'Satoshi'
              }
            }
          },
          yaxis: {
            labels: {
              show: false
            }
          },
          tooltip: {
            enabled: true,
            y: {
              formatter: function (val) {
                return `₺${val < 1 ? 0 : val}`;
              },
              title: {
                formatter: function () {
                  return "Total:";
                }
              }
            },
            x: {
              formatter: function (val) {
                const matchedData = reportDatas.find(x => x.dayStr === val);
                var isTurkish = reportDatas.some(x => x.dayStr === "Pzt");
                return matchedData ? new Date(matchedData.date).toLocaleDateString(isTurkish ? "tr-TR" : "en-EN") : "";
              }
            },
          },
          responsive: [
            {
              breakpoint: 1025,
              options: {
                chart: {
                  height: 220
                }
              }
            }
          ]
        };
        const weeklyEarningReports = new ApexCharts(weeklyEarningReportsEl, weeklyEarningReportsConfig);
        weeklyEarningReports.render().catch(err => console.error("Weekly Earning Reports chart rendering failed:", err));
      }
    },

    radialBarChart(color, value, show) {
      const isShow = show === 'true';
      return {
        chart: {
          height: isShow ? 58 : 48,
          width: isShow ? 58 : 38,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: isShow ? '50%' : '25%'
            },
            dataLabels: {
              show: isShow,
              value: {
                offsetY: -10,
                fontSize: '15px',
                fontWeight: 500,
                fontFamily: "Satoshi",
                color: "#000"
              }
            },
            track: {
              background: "rgba(47, 43, 61, 0.08)"
            }
          }
        },
        stroke: {
          lineCap: 'round'
        },
        colors: [color],
        grid: {
          padding: {
            top: isShow ? -12 : -15,
            bottom: isShow ? -17 : -15,
            left: isShow ? -17 : -5,
            right: -15
          }
        },
        series: [value],
        labels: isShow ? [''] : ['Progress']
      };
    },

    initPopularCategoriesReports(reportDatas) {
      const horizontalBarChartEl = this.$refs.horizontalBarChart;

      const labels = reportDatas.map(x => x.serviceName)
      const datas = reportDatas.map(x => x.percentage)
      const length = reportDatas.length;

      const horizontalBarChartConfig = {
        chart: {
          height: 320,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '70%',
            distributed: true,
            startingShape: 'rounded',
            borderRadius: 7,
          }
        },
        grid: {
          strokeDashArray: 10,
          borderColor: "#eee",
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          },
          padding: {
            top: -35,
            bottom: -12
          }
        },
        colors: [
          config.colors.primary,
          config.colors.info,
          config.colors.danger,
          config.colors.warning,
          config.colors.success,
          config.colors.secondary
        ],
        fill: {
          opacity: Array.from({ length: length }, () => 1)
        },
        dataLabels: {
          enabled: false,
          style: {
            colors: ['#fff'],
            fontWeight: 400,
            fontSize: '11px',
            class: "text-truncate",
            fontFamily: 'Satoshi'
          },
          formatter: function (val, opts) {
            return `${horizontalBarChartConfig.series[0].data[opts.dataPointIndex].toLocaleString()}%`;
          },
          offsetX: 0,
          dropShadow: {
            enabled: false
          }
        },
        labels: labels,
        series: [
          {
            data: datas
          }
        ],

        xaxis: {
          categories: Array.from({ length: length }, (_, i) => (length - i).toString()),
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            style: {
              colors: "rgba(42, 48, 60, 0.4)",
              fontSize: '13px',
              fontFamily: 'Satoshi'
            },
            formatter: function (val) {
              return `${val.toLocaleString()}% `;
            }
          }
        },
        yaxis: {
          max: this.roundToNearest(Math.max(...datas)),
          labels: {
            style: {
              colors: ["rgba(42, 48, 60, 0.4)"],
              fontFamily: 'Satoshi',
              fontSize: '13px',
            }
          },
          formatter: function (val) {
            return '';
          }
        },
        tooltip: {
          enabled: true,
          style: {
            fontSize: '12px',
            fontFamily: 'Satoshi',
          },
          onDatasetHover: {
            highlightDataSeries: false
          },
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return '<div class="px-3 py-2">' + '<span>' + series[seriesIndex][dataPointIndex] + '%</span>' + '</div>';
          }
        },
        legend: {
          show: false
        }
      };

      if (typeof horizontalBarChartEl !== undefined && horizontalBarChartEl !== null) {
        const horizontalBarChart = new ApexCharts(horizontalBarChartEl, horizontalBarChartConfig);
        horizontalBarChart.render();
      }
    },
    roundToNearest(value) {
      const rounded = Math.round(value / 10) * 10;
      return value % 10 >= 5 ? rounded : rounded + 5;
    }
  }
}
</script>


<style>
@import url('../../assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css');
</style>