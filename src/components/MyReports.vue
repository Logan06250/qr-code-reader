<template>
	<div>
        <div id="Navigation" class="sticky-top">
            <Slide id="menu">
                <a id="home" href='#/'> 
                    <span>Home</span>  
                </a>
                <a id="home" href='#/MyReports'> 
                    <span>Reports</span>  
                </a>
                <a id="home" href='#/ManageProfile'> 
                    <span>Profile</span>  
                </a>
            </Slide>
            <h1 style="margin-left: 80px; padding-top: 5px">{{ title }}</h1>
            <div></div>
        </div>
		<div v-if="statement == 0">
			<CrudReport v-on:selected="selectedReport($event)"></CrudReport>   
		</div>
		<div v-if="statement == 1">
			<Report :specificReport="specificReport" v-on:selected="reportEventHandler($event)"></Report>
		</div>
		<div v-if="statement == 2">
			<Section :groupedProps="[specificReport, specificSection]" v-on:selected="sectionEventHandler($event)"></Section>
		</div>
        <div v-if="statement == 3">
            <PropertyForm :specificReport="specificReport" v-on:selected="backToMyreport($event)"></PropertyForm>
        </div>
	</div>
</template>


<script type="javascript">

var db = new PouchDB('reports')

import CrudReport from './crudReport'
import Report from './report'
import Section from './section'
import PropertyForm from './propertyForm'
import { Slide } from 'vue-burger-menu'
import { MarkerArea } from 'markerjs';




export default {
    name: 'App',
    data(){
	    return{
		    specificReport: 0,
		    specificSection: 0,
		    statement: 0,
            title: "Reports"
	   	}
	},
    components: {
      CrudReport,
      Section,
      Report,
      PropertyForm,
      Slide,
      MarkerArea,

    },
    methods: {
    	selectedReport: function (specificReport) {
            if(specificReport[0] == 1){
                this.specificReport = specificReport[1]
                this.statement = 1
            }else {
                this.specificReport = specificReport[1]
                this.statement = 3
            }
    	},
        backToMyreport: function (event){
            this.statement = 0
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
    		}else if(event == 1) {
                this.statement = 0
            }
    	}
    }
};

</script>


<style>

#Navigation {
    background-color: #2F4558;
    width: 100%;
    height:62px;
    z-index:10;
    display:block;
    position: fixed;
    color: #FFF;
}

.bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 20px;
    top: 15px;
    cursor: pointer;
}

</style>
