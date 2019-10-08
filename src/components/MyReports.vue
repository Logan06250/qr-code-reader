<template>
    <div>
        <div v-if="statement == 0">
            <CrudReport v-on:selected="selectedReport($event)"></CrudReport>
        </div>
        <div v-if="statement == 1">
            <Report :specificReport="specificReport" v-on:selected="reportEventHandler($event)"></Report>
        </div>
        <div v-if="statement == 2">
            <Section :groupedProps="[specificReport, specificSection]" v-on:selected="sectionEventHandler($event)"></Section>
        </div>

    </div>

</template>


<script type="javascript">

import CrudReport from './crudReport'
import Report from './report'
import Section from './section'


export default {
    name: 'App',
    data(){
        return{
            specificReport: 0,
            specificSection: 0,
            statement: 0,
        }
    },
    components: {
      CrudReport,
      Section,
      Report
    },
    methods: {
        selectedReport: function (specificReport) {
            this.specificReport = specificReport
            this.statement = 1;
        },
        reportEventHandler: function (specificSection) {
            if(specificSection == 0){
                this.statement = 0
            }else{
                this.specificSection = specificSection
                this.statement = 2
            }
        },
        sectionEventHandler: function (event) {
            if(event == 0) {
                this.statement = 1
            }else {}
        }
    }
  }

</script>


<style>


</style>
