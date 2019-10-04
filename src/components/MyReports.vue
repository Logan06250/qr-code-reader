<template>
	<div>
		<h1>My reports</h1>

		<div v-if="v = true">
			<CrudReport/>
		</div>
		<div v-else>
			<SpecificReport/>
		</div>

	</div>

</template>


<script type="javascript">

import CrudReport from './crudReport'
import SpecificReport from './SpecificReport'


export default {
    name: 'App',
    components: {
      CrudReport,
      SpecificReport
    },
    data: {
    	v: true
    }
  }

</script>


<style>


</style>
