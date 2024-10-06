<template>
    <div class="card shadow-none border">
        <div class="card-datatable table-responsive pt-0">
            <div class="dataTables_wrapper dt-bootstrap5 no-footer">
                <div
                    class="card-header d-flex justify-content-between align-items-center border-bottom p-7 pb-2 pb-sm-6">
                    <div class="head-label">
                        <h5 class="card-title mb-0 pt-1">{{ $t('ClientList') }}</h5>
                    </div>
                    <div class="text-end pt-md-0">
                        <button class="btn btn-success btn-label-success me-4 waves-effect waves-light" type="button"
                            @click="exportToExcel">
                            <span>
                                <i class="ti ti-upload ti-xs me-sm-1"></i>
                                <span class="d-none d-sm-inline-block">{{ $t('Export') }}</span>
                            </span>
                        </button>
                        <button class="btn btn-secondary btn-primary waves-effect waves-light" type="button">
                            <span>
                                <i class="ti ti-plus me-sm-1"></i>
                                <span class="d-none d-sm-inline-block">{{ $t('AddCustomer') }}</span>
                            </span>
                        </button>
                    </div>
                </div>
                <div class="row py-5">
                    <div class="col-sm-4 col-md-4 col-lg-3 col-12 pb-sm-0 pb-3">
                        <input type="search" v-model="searchTerm" class="form-control"
                            :placeholder="$t('SearchClient')">
                    </div>


                    <div class="col-md-2 col-lg-5 d-none d-md-block">
                    </div>

                    <div class="col-sm-8 col-md-6 col-lg-4 col-12">
                        <div class="d-flex justify-content-sm-end justify-content-center gap-3">
                            <select v-model="perPage" class="form-select w-px-100">
                                <option :value="5">5</option>
                                <option :value="10">10</option>
                                <option :value="25">25</option>
                                <option :value="50">50</option>
                            </select>
                            <select v-model="sortBy" class="form-select">
                                <option value="">{{ $t('SortBy') }}</option>
                                <option value="+lastAppointmentDate">{{ $t('AscLastAppointmentDate') }}</option>
                                <option value="-lastAppointmentDate">{{ $t('DescLastAppointmentDate') }}</option>
                                <option value="+appointmentCount">{{ $t('AscAppointmentCount') }}</option>
                                <option value="-appointmentCount">{{ $t('DescAppointmentCount') }}</option>
                                <option value="+totalSpent">{{ $t('AscTotalSpent') }}</option>
                                <option value="-totalSpent">{{ $t('DescTotalSpent') }}</option>
                            </select>
                            <div class="dropdown pt-50">
                                <button
                                    class="btn btn-sm btn-icon btn-text-secondary text-secondary dropdown-toggle hide-arrow waves-effect waves-light"
                                    data-bs-toggle="dropdown" aria-expanded="false" id="chat-header-actions"
                                    style="background: rgba(42, 48, 60, 0.08);">
                                    <i class="ti ti-dots-vertical ti-md"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end"
                                    style="transform: translate3d(0px, 100px, 0px)  !important;">
                                    <a class="dropdown-item waves-effect" href="javascript:void(0);">Report</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="card-body p-0">
                    <table class="datatables-basic table dataTable no-footer dtr-column collapsed">
                        <thead>
                            <tr>
                                <th class="w-px-30">
                                    <input type="checkbox" v-model="allSelected" class="form-check-input">
                                </th>
                                <th style="width: 205px;">{{ $t('ClientName') }}</th>
                                <th class="w-px-100">{{ $t('CreatedAt') }}</th>
                                <th class="w-px-100">{{ $t('LastAppointment') }}</th>
                                <th class="w-px-75">{{ $t('Appointments') }}</th>
                                <th class="w-px-75">{{ $t('TotalSpent') }}</th>
                                <th class="w-px-20">{{ $t('Action') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(customer, index) in paginatedCustomers" :key="index" class="border-none"
                                :class="index % 2 === 0 ? 'odd' : 'even'">
                                <td>
                                    <input type="checkbox" v-model="customer.isSelected" class="form-check-input">
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="avatar me-2 me-sm-4 border-none">
                                            <img :src="customer.userImageUrl || defaultUserImage" alt="Avatar"
                                                class="rounded-circle">
                                        </div>
                                        <div class="border-none">
                                            <div>
                                                <h6 class="mb-0 text-truncate">{{ customer.name }}</h6>
                                                <small class="text-truncate text-body">{{ customer.email }}</small>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="p-0 text-nowrap m-0">
                                        {{ customer.createDate }}
                                    </span>
                                </td>
                                <td>
                                    <span class="text-nowrap">
                                        {{ customer.lastAppointmentDate }}
                                    </span>
                                </td>
                                <td>
                                    <span class="text-nowrap">
                                        {{ customer.appointmentCount }}
                                    </span>
                                </td>
                                <td>
                                    <span class="text-nowrap">
                                        ₺{{ customer.totalSpent?.toLocaleString($i18n.locale) }}
                                    </span>
                                </td>
                                <td class="ps-7">
                                    <div v-if="customer.isBusinessCustomer" class="dropdown pt-50">
                                        <button
                                            class="btn btn-sm btn-icon btn-text-secondary text-secondary dropdown-toggle hide-arrow waves-effect waves-light"
                                            data-bs-toggle="dropdown" aria-expanded="false" :id="`actions-${index}`">
                                            <i class="ti ti-dots-vertical ti-md"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-end"
                                            style="transform: translate3d(0px, 100px, 0px)  !important;">
                                            <a class="dropdown-item waves-effect" href="javascript:void(0);">Report</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="paginatedCustomers.length < 5" v-for="n in (5 - paginatedCustomers.length)"
                                :key="'empty-' + n">
                                <td style="padding: 2.157rem !important; border-color: transparent !important;"
                                    colspan="7">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row mx-md-3 flex-column flex-md-row justify-content-between align-items-center m-0 p-0">
                        <Pagination v-model="page" :total-items="records" :per-page="perPage" :current-page="page"
                            :size="3" @page-changed="handlePageChange" />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '../../components/Pagination.vue';
import { DefaultUserImage } from '../../utils/constants.js';
import * as XLSX from 'xlsx';

export default {
    components: {
        Pagination
    },
    data() {
        return {
            customerAppointmentReport: [],
            customers: [],
            filteredCustomers: [],
            searchTerm: "",
            sortBy: "",
            page: 1,
            perPage: 5,
            records: 0,
            allSelected: false,
            defaultUserImage: DefaultUserImage
        }
    },
    mounted() {
        this.getCustomers();
    },
    methods: {
        async getCustomers() {
            const response = await this.$appAxios.post("/businessadmin/getcustomers", {});
            const customers = response?.data?.data || [];
            let clonedCustomers = [];
            for (let i = 0; i < 30; i++) {
                // Klonlama sırasında her müşteri için değerleri güncelle
                const clonedBatch = customers.map(customer => {
                    const clonedCustomer = { ...customer };

                    // `lastAppointmentDate` bir gün arttırılıyor
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() + i); // i kadar gün ekleniyor
                    clonedCustomer.lastAppointmentDate = currentDate.toISOString().split('T')[0];

                    // `appointmentCount` 1-100 arasında rastgele bir değer
                    clonedCustomer.appointmentCount = Math.floor(Math.random() * 100) + 1;

                    // `totalSpent` 100 ile 10000 arasında rastgele bir değer
                    clonedCustomer.totalSpent = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

                    return clonedCustomer;
                });

                clonedCustomers = clonedCustomers.concat(clonedBatch);
            }

            this.customers = clonedCustomers;
            this.filteredCustomers = this.customers;
            this.records = this.customers.length || 0;
        },
        handlePageChange(newPage) {
            this.page = newPage;
        },
        exportToExcel() {
            const selectedData = this.filteredCustomers.map(customer => ({
                [this.$t('ClientName')]: customer.name,
                EMAIL: customer.email,
                [this.$t('CreatedAt')]: customer.createDate,
                [this.$t('LastAppointment')]: customer.lastAppointmentDate,
                [this.$t('Appointments')]: customer.appointmentCount,
                [this.$t('TotalSpent')]: customer.totalSpent
            }));

            const worksheet = XLSX.utils.json_to_sheet(selectedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

            const formattedDate = this.$filters.formatDate(new Date(), "tr", "DD-MM-YYYY-hh-mm-ss");
            const fileName = `customers_${formattedDate}.xlsx`;
            XLSX.writeFile(workbook, fileName);
        },
    },
    computed: {
        paginatedCustomers() {
            const start = (this.page - 1) * this.perPage;
            const end = this.page * this.perPage;
            return this.filteredCustomers?.slice(start, end);
        }
    },
    watch: {
        searchTerm(newSearchTerm) {
            if (newSearchTerm.length < 3) {
                this.filteredCustomers = this.customers;
            } else {
                this.filteredCustomers = this.customers.filter(x => x.name.toLocaleLowerCase(this.$i18n.locale).includes(newSearchTerm.toLocaleLowerCase(this.$i18n.locale)));
                this.page = 1;
            }

            this.allSelected = false;
            this.filteredCustomers.forEach(customer => {
                customer.isSelected = this.allSelected;
            });
            this.records = this.filteredCustomers.length || 0;
        },
        sortBy(newSortBy) {
            if (newSortBy == "") {
                this.filteredCustomers = this.customers;
            } else {
                const order = newSortBy.includes("+") ? "asc" : "desc";
                const sortProp = newSortBy.replace("+", "").replace("-", "");

                this.filteredCustomers = [...this.customers].sort((a, b) => {
                    let aValue = a[sortProp];
                    let bValue = b[sortProp];

                    if (order === "asc") {
                        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                    } else {
                        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
                    }
                });
            };

            this.records = this.filteredCustomers.length || 0;
        },
        allSelected(value) {
            this.filteredCustomers.forEach(customer => {
                customer.isSelected = value;
            });
        }
    },
}
</script>

<style>
@import url('../../assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css');
</style>