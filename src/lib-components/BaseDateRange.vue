<template>
  <div class="capte__form">
    <div :class="layout === 'horizontal' ? 'd-flex' : ''">
      <el-date-picker
        v-model="start"
        type="date"
        placeholder="Start Date"
        format="dd/MM/yyyy"
        value-format="yyyy-MM-dd"
        :clearable="false"
        :class="fieldClass"
        @change="updateDate"
      />
      <el-date-picker
        v-model="end"
        type="date"
        placeholder="End Date"
        format="dd/MM/yyyy"
        value-format="yyyy-MM-dd"
        :class="fieldClass"
        :clearable="false"
        @change="updateDate"
      />
      <el-select
        v-model="dateRange"
        placeholder="Select"
        @change="handleDateSelect"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>


<script>
import html2canvas from 'html2canvas';
import moment from 'moment';

export default {

  props: {
    layout: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: 'capte',
    },
  },
  data() {
    return {
      dateRange: null,
      options: [{
        value: '7-d',
        label: 'Last 7 days',
      }, {
        value: '14-d',
        label: 'Last 2 Weeks',
      },
      {
        value: '1-month',
        label: 'Last 1 Month',
      },
      {
        value: '3-month',
        label: 'Last 3 Months',
      },
      ],
      start: moment().utc().startOf('month').format('YYYY-MM-DD'),
      end: moment().utc().subtract(1, 'day').startOf('day')
        .format('YYYY-MM-DD'),
    };
  },
  computed: {

    fieldClass() {
      return this.layout === 'horizontal' ? 'mr-3' : 'mb-3';
    },
  },

  mounted() {
    this.updateDate();
  },

  methods: {
    handleDateSelect(e) {
      const period = e.split('-');
      this.start = moment().subtract(parseInt(period[0], 10), period[1]).format('YYYY-MM-DD');
      this.end = moment().format('YYYY-MM-DD');
      const payload = {
        start: this.start,
        end: this.end,
      };
      this.reload(payload);
    },
    exportPNG() {
      html2canvas(document.querySelector('body')).then((canvas) => {
        const picture = canvas.toDataURL('image/png');
        const link = document.createElement('a');

        link.download = `${this.prefix}_${this.start}_to_${this.end}.png`;
        link.href = picture;
        link.click();
      });
    },

    exportCSV() {
      this.$emit('export');
    },

    updateDate() {
      this.dateRange = null;
      const payload = {
        start: this.start,
        end: this.end,
      };
      this.reload(payload);
    },

    reload(payload) {
      this.$emit('reload', payload);
    },
  },
};
</script>
