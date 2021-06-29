<template>
  <div>
    <CapteRightSidebar
      v-if="hasFilterSlot"
      ref="screen"
      body-classes="p-3"
      :title="$t('common.menu.apply_filter')"
    >
      <div v-if="showFilterSidebar">
        <slot name="filterSidebar" />
      </div>
    </CapteRightSidebar>

    <CapteRightSidebar
      v-if="hasCreateSidebarSmall"
      ref="createSidebarSmall"
      :show-handle="false"
      body-classes="p-0"
      :title="editing ? $t('common.sidebar.edit') : $t(createTitle) "
      @onClose="handleOnCloseSidebar"
    >
      <div v-if="showRightSidebar">
        <slot name="createSidebarSmall" />
      </div>
    </CapteRightSidebar>

    <CapteRightSidebar
      v-if="hasSidebar"
      ref="createRightSidebar"
      :show-handle="false"
      body-classes="p-0"
      :size="sidebarSize"
      :title="editing ? $t('common.sidebar.edit') : $t(createTitle) "
      @onClose="handleOnCloseSidebar"
    >
      <div v-if="showRightSidebar">
        <slot name="sidebar" />
      </div>
    </CapteRightSidebar>

    <div
      id="base-manager"
      :class="containerClasses"
    >
      <div :class="classes">
        <div

          class="card-header"
        >
          <div class="d-flex align-items-center">
            <div>
              <h5 v-if="title">
                {{ title }}
              </h5>
              <slot name="headerLeft" />


              <!--from old layout--->
              <slot name="filter" />
              <div v-if="showAction">
                <slot
                  name="main-actions"
                  :row="currentRow"
                />
              </div>
            <!--@from old layout--->
            </div>
            <div class="ml-auto">
              <slot name="headerRight" />
              <slot
                name="action"
                :type="this.type"
              />
              <CapteFullScreenButton v-if="hasFullScreenButton" />
              <CapteScreenShotButton
                v-if="hasScreenCapture"
                :file-name="screenshotFileName"
              />
              <el-button
                v-if="hasFilterSlot"
                circle
                :size="$mq === 'sm'? 'mini' :''"
                icon="capte-icon-filter"
                @click="handleFilter"
              />
              <!-- <CapteFilterButton
                v-if="hasFilterSlot"
                :screen-ref="screenRef"
              /> -->
              <el-button
                v-if="canCreate"
                type="primary"
                plain
                icon="el-icon-plus"
                @click="handleCreateSidebar"
              >
                {{ $t(createBtnLabel) }}
              </el-button>
            </div>
          </div>
        </div>
        <div
          v-if="hasTopPagination && hasPagination"
          class="d-flex align-items-center b-b my-1"
        >
          <el-pagination
            :layout="paginationLayout"
            :page-size="pagesize"
            :page-sizes="pageSizes"
            :total="total"
            :current-page="page"
            class="base-manager-layout__pagination"
            @size-change="setSize"
            @current-change="setPage"
          />
        </div>
        <el-container>
          <el-main
            v-loading="loading"
            class="pt-0"
          >
            <div v-if="url">
              <BaseNetworkTable
                ref="networkTable"
                :url="url"
                :table-data-property="tableDataProperty"
                :page-size="this.pagesize"
                :page-number="this.page"
                :search="this.search"
                :filters="this.filters"
                :pagination="hasPagination"
                :size="size"
                :fields="fields"
                @data-change="setData"
                @row-dbclick="rowDoubleClick"
                @loading="(loading) => this.loading = loading"
                @selection="updateSelection"
              >
                <slot name="columns" />

                <el-table-column
                  v-if="canEdit || canDelete"
                  align="right"
                >
                  <template slot-scope="scope">
                    <el-button
                      v-if="canEdit"
                      class="ml-2"
                      icon="el-icon-edit"
                      size="mini"
                      circle
                      @click="handleEditSidebar(scope.row)"
                    />
                    <el-button
                      v-if="canDelete && beforeDelete(scope.row)"
                      class="ml-2"
                      icon="el-icon-close"
                      size="mini"

                      circle
                      @click="handleDelete(scope.row)"
                    />
                  </template>
                </el-table-column>
              </BaseNetworkTable>
            </div>
            <template slot="menu">
              <slot name="table-menu" />
            </template>
            <slot name="content" />
          </el-main>
        </el-container>
        <!-- layout="slot,total,prev,pager,next,sizes"   -->
        <el-pagination
          v-if="hasPagination"
          :layout="paginationLayout"
          :page-size="pagesize"
          :page-sizes="pageSizes"
          :total="total"
          :current-page="page"
          class="base-manager-layout__pagination"
          @size-change="setSize"
          @current-change="setPage"
        />

        <slot name="pagination-bottom" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paginationInclude: {
      type: String,
      default: 'slot,total,prev,pager,next',
    },
    hasPaginationSize: {
      type: Boolean,
      default: false,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    url: {
      type: String,
      default: '',
    },
    hasPagination: {
      type: Boolean,
      default: true,
    },

    type: {
      type: String,
      required: false,
      default: null,
    },

    search: {
      type: String,
      default: null,
    },

    filters: {
      type: Object,
      default: null,
    },

    showHeader: {
      type: Boolean,
      default: true,
    },

    hasTopPagination: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String,
      default: 'medium',
    },
    sidebarSize: {
      type: String,
      default: 'small',
    },
    sidebarOpenFirst: {
      type: Boolean,
      default: true,
    },
    sidebarCloseOnSave: {
      type: Boolean,
      default: true,
    },
    classes: {
      type: String,
      default: 'card shadow pb-3',
    },
    fields: {
      type: Array,
      default: null,
    },

    containerClasses: {
      type: String,
      default: 'container-fluid base-manager-layout bg-light',
    },
    hasFilter: {
      type: Boolean,
      default: false,
    },
    hasScreenCapture: {
      type: Boolean,
      default: false,
    },

    hasFullScreenButton: {
      type: Boolean,
      default: false,
    },

    canDelete: {
      type: Boolean,
      default: false,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    canCreate: {
      type: Boolean,
      default: false,
    },
    createBtnLabel: {
      type: String,
      default: 'common.action.add',
    },
    handleCreate: {
      type: Function,
      default: () => {},
    },
    handleEdit: {
      type: Function,
      default: () => {},
    },
    beforeDelete: {
      type: Function,
      default: () => true,
    },
    deleteRoute: {
      type: String,
      default: '',
    },
    deleteAlertMessage: {
      type: String,
      default: 'Are you sure you want to delete this.',
    },

    tableDataProperty: {
      type: String,
      default: '',
    },
    pageSizes: {
      type: Array,
      default: () => [5, 10, 50, 100, 250],
    },
    screenshotFileName: {
      type: String,
      default: 'screenshot',
    },
    createTitle: {
      type: String,
      default: 'common.sidebar.add',
    },

  },

  data() {
    return {
      screenRef: {},
      page: 1,
      data: [],
      loading: false,
      total: 0,
      showAction: false,
      currentRow: null,
      pagesize: this.pageSize,
      selected: [],
      editing: false,
      showRightSidebar: false,
      showFilterSidebar: false,

    };
  },
  computed: {

    paginationLayout() {
      let layout = this.paginationInclude;
      if (this.$mq === 'sm') {
        layout = 'slot,total,prev,next';
      }
      if (this.hasPaginationSize) layout += ',sizes';
      return layout;
    },
    hasFilterSlot() {
      return !!this.$slots.filterSidebar;
    },
    haslargeSidebar() {
      return !!this.$slots.largeSidebar;
    },
    hasSidebar() {
      return !!this.$slots.sidebar;
    },
    hasCreateSidebarSmall() {
      return !!this.$slots.createSidebarSmall;
    },
  },
  watch: {
    loading(n, o) {
      this.$emit('loading', n);
    },

    filters(n, o) {
      this.page = 1;
    },

    search(n, o) {
      this.page = 1;
    },
  },
  mounted() {
    this.screenRef = this.$refs.screen;
    this.$events.on('closeit', () => {
      if (this.sidebarCloseOnSave) {
        if (this.hasSidebar) {
          this.$refs.createRightSidebar.close();
        }
        if (this.haslargeSidebar) {
          this.$refs.rightLargeSidebar.close();
        }
        if (this.hasCreateSidebarSmall) {
          this.$refs.createSidebarSmall.close();
        }
      }

      this.reload();
    });
  },

  methods: {
    handleFilter() {
      this.showFilterSidebar = true;
      this.$refs.screen.open();
    },
    handleCloseFilter() {
      if (this.showFilterSidebar) {
        this.showFilterSidebar = false;
        this.$refs.screen.close();
      }
    },
    handleOnCloseSidebar() {
      this.showRightSidebar = false;
    },
    handleCreateSidebar() {
      this.handleCloseFilter();
      this.showRightSidebar = true;
      this.$nextTick(() => {
        if (this.hasCreateSidebarSmall) {
          this.$refs.createSidebarSmall.open();
        } else {
          this.$refs.createRightSidebar.open();
        }
        this.editing = false;
        this.$events.fire('createItem');
      });
    },
    handleEditSidebar(row) {
      this.handleCloseFilter();
      if (this.sidebarOpenFirst) {
        this.showRightSidebar = true;
      }
      this.$nextTick(() => {
        this.$emit('editSelectedItem', row);
        this.$events.fire('editItem', row);
        this.editing = true;
        this.$refs.createRightSidebar.open();
        this.showRightSidebar = true;
      });
    },

    clearSelection() {
      this.$refs.networkTable.clearSelection();
    },

    setData(data) {
      if (Array.isArray(data.data) && this.hasPagination) {
        this.data = data.data;
        this.$emit('on-loaded', this.data);
      } else {
        this.data = data;
        this.$emit('on-loaded', this.data);
      }


      // TODO: Fix two diffrent implementation for pagination on backend
      if (data.hasOwnProperty('meta')) {
        this.total = data.meta.total;
      } else {
        this.total = data.total;
      }

      console.log(this.total);
    },

    reload() {
      this.$nextTick(() => this.$refs.networkTable.reload());
    },

    setPage(page) {
      this.page = page;
    },

    setSize(val) {
      this.pagesize = val;
      this.$nextTick(() => this.$refs.networkTable.reload());
    },

    rowDoubleClick(row) {
      this.$emit('row-dbclick', row);
    },


    updateSelection(selectedItems) {
      this.selected = selectedItems;
      this.$emit('selection', selectedItems);
    },

    handleDelete(row) {
      this.$confirm(
        this.deleteAlertMessage,
        'Delete',
        {
          confirmButtonText: 'Yes, Delete',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      ).then(() => {
        this.delete(row.id);
      });
    },
    async delete(id) {
      let deleteUrl = `${this.url}/${id}`;
      if (this.deleteRoute) {
        deleteUrl = `${this.deleteRoute}/${id}`;
      }
      this.loading = true;
      await axios
        .delete(deleteUrl)
        .then((response) => {
          this.$message({
            type: 'success',
            message: 'Deleted',
          });
          this.reload();
          this.$emit('afterDelete');
        })
        .catch((err) => {
          this.errors.record(err.response.data.errors, this);
        });
    },
  },
};
</script>
