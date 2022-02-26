<template>
<div class="starter-page" >
    <div class="section text-center">
  <b-container >
     <b-row> 
         <div class="mt-3">
    <b-card-group deck class="mb-3">
       <card class="bg-light" raised
            >
            <div slot="info" class="row m-1 text-dark">
              <h5 class="col-12 text text-left">
                Mbolo <b>{{$store.state.user.fullname}}</b>
              </h5>
              
                <h1 class="col-12 text text-center text-success">
                  <b-icon icon="graph-up"></b-icon>
                </h1>
              <h6 class="col-12 text text-center">
               Les statistiques de votre promotion
              </h6>
            </div>
          </card>
        
        <card class="bg-secondary" raised
            >
            <div slot="info" class="row m-1 text-white">
              <h5 class="col-12 text text-left">
                Total du mois en cours...
              </h5>
              <h2 class="col-12 text text-right">
               <b>{{soldeCurrentMonth}}</b>  FCFA
              </h2>
            </div>
          </card>
      
      <card class="bg-light " raised
            >
            <div slot="info" class="row m-1 text-secondary">
              <h5 class="col-12 text text-left">
                Total de l'année en cours...
              </h5>
              <h2 class="col-12 text text-right">
              <b>{{soldeCurrentYear}}</b> FCFA
              </h2>
            </div>
          </card>
    </b-card-group>
  </div>
    </b-row>
    <div class="chart-area m-2">
        <line-chart style="height: 100%"
                    ref="bigChart"
                    chart-id="big-line-chart"
                    :chart-data="bigLineChart.chartData"
                    :gradient-colors="bigLineChart.gradientColors"
                    :gradient-stops="bigLineChart.gradientStops"
                    :extra-options="bigLineChart.extraOptions">
        </line-chart>
    </div>
    <b-row>
        <b-button @click="toggleBusy" variant="outline-secondary" squared size="sm">
            Actualiser
        </b-button>
        <b-table :items="stat" :busy="isBusy" outlined striped hover>
            <template #table-busy>
                <div class="text-center text-succes my-2">
                <b-spinner variant="secondary" type="grow" label="Spinning"></b-spinner>
                </div>
            </template>
        </b-table>
    </b-row>
  </b-container>
    </div>
</div>
</template>
<script>
import {Card} from '@/components'
import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
import PromoterService from '@/services/PromoterService'
  export default {
       components: {
    Card,
    LineChart
  },
    data() {
      return {
        isBusy: false,
        transactions : [],
        cost : 1000,
        items: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
         'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
         'Novembre',
          'Décembre',
        ],

        bigLineChart: {
          chartData: {
            datasets: [{ }],
            labels: ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOUT', 'SEPT', 'OCT', 'NOV', 'DEC'],
          },
          extraOptions: chartConfigs.greenChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
      },
      }
    },
    computed :{
      stat(){
        const stat = []
        const vm  = this

        this.items.forEach(function (value, i) {
          const transaction = vm.transactions.filter((trans) => (vm.$date().month(i)).isSame(trans.createdat, 'month') && vm.$date().isSame(trans.createdat, 'year'))
          stat.push({Mois : value, Abonné : transaction.length, Montant : transaction.length * vm.cost})
        })
        return stat
      },
      dataChart(){
       let data = []
        const vm  = this

        this.items.forEach(function (value, i) {
          const transaction = vm.transactions.filter((trans) => (vm.$date().month(i).date(1)).isSame(trans.createdat, 'month'))
          data.push(transaction.length)
        })
        return data
      },
      soldeCurrentMonth(){
        return this.dataChart[this.$date().get('month')] * this.cost
      },
      soldeCurrentYear(){
        let total = 0
        const vm = this
        this.dataChart.forEach(function (value){
          total = total + (value * vm.cost)
        })
        return total
      }
    },

    methods: {
      async toggleBusy() {
        this.isBusy = !this.isBusy
        await this.getStat()
        this.isBusy = !this.isBusy

      },
      async getStat(){
        try {
        
        this.transactions = (await PromoterService.stat(this.$store.state.user.idusers)).data
        
      } catch (error) {
        this.error = error.response.data.error
      }
      },
      initBigChart(index) {
        let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.dataChart
          }],
          labels: ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOUT', 'SEPT', 'OCT', 'NOV', 'DEC'],
        }
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
      }
    },
    async mounted(){
      await this.getStat()
      this.initBigChart(0)
    }
  }
</script>
