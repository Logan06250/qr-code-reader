<template>
	<div>
		<div v-if="specificReport == 0">
			<CrudReport v-on:selected="selectedReport($event)"></CrudReport>
		</div>
		<div v-else>
			<Report :specificReport="specificReport" v-on:selected="goBackButton($event)"></Report>
		</div>

	</div>

</template>


<script type="javascript">

import CrudReport from './crudReport'
import Report from './report'


export default {
    name: 'App',
    data(){
	    return{
		    specificReport: 0
	   	}
	},
    components: {
      CrudReport,
      Report
    },
    methods: {
    	selectedReport: function (specificReport) {
    		this.specificReport = specificReport
    	},
    	goBackButton: function (eventHandled) {
    		this.specificReport = 0;
    	}
    }
  }

</script>


<style>


</style>
