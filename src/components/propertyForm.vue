<template>
  <div class="container" style="padding-top: 46px;">
    <h3>
      <a @click="eventEmitter(0)">  
        <i class="fas fa-angle-left"></i>
        {{ specificReport.name }}
      </a> 
    </h3>
    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="propertyAdress">Property adress:</label>
          <input type="text" class="form-control" id="propertyAdress">
        </div>
        <div class="form-group col-md-6">
          <label for="clientName">Client's name:</label>
          <input type="text" class="form-control" id="clientName">
        </div>
        <div class="form-group col-md-6">
        <label for="dateOfInspection">Date of inspection:</label>
        <input type="date" class="form-control" id="dateOfInspection">
        </div>
        <div class="form-group col-md-6">
          <label for="typeOfProperty">Type of property:</label>
          <input type="text" class="form-control" id="typeOfProperty">
        </div>
        <div class="form-group col-md-6">
          <label for="YearThePropertyWasBuilt">Year the property was built:</label>
          <input type="text" @keypress="isNumber($event)" class="form-control" id="YearThePropertyWasBuilt">
        </div>
        <div class="form-group col-md-6">
        <label for="YearThePropertyWasExtended">Year the property was extended:</label>
        <input type="text" @keypress="isNumber($event)" class="form-control" id="YearThePropertyWasExtended">
      </div>
        <div class="form-group col-md-6">
          <label for="YearThePropertyWasConverted">Year the property was converted:</label>
          <input type="text" @keypress="isNumber($event)" class="form-control" id="YearThePropertyWasConverted">
        </div>
        <div class="form-group col-md-12">
          <label for="InformationAboutFlats">Information about flats:</label>
          <textarea type="text" class="form-control" id="InformationAboutFlat" rows="5" ></textarea>
        </div>
      </div>
    </form>
    <button id="save" @click="newProperty()" class="btn btn-lg btn-block btn-info" >Submit</button>
  </div>
</template>
<script>

  import { Slide } from 'vue-burger-menu'

  var db = new PouchDB("reports")
  console.log("Local database created and imported")


  export default{
    props: ['specificReport'],
  data(){
          return{
            property:[
            ]
        }
      },
  components: {
      Slide
  },
  mounted: function (){
    db.get(this.specificReport._id).then(function (doc) {
      if(doc.property.length == 0){
      }else {
          document.getElementById("propertyAdress").value = doc.property.propertyAdress
          document.getElementById("clientName").value = doc.property.clientName
          document.getElementById("dateOfInspection").value = doc.property.dateOfInspection
          document.getElementById("typeOfProperty").value = doc.property.typeOfProperty
          document.getElementById("YearThePropertyWasBuilt").value = doc.property.YearThePropertyWasBuilt
          document.getElementById("YearThePropertyWasExtended").value = doc.property.YearThePropertyWasExtended
          document.getElementById("YearThePropertyWasConverted").value = doc.property.YearThePropertyWasConverted
          document.getElementById("InformationAboutFlat").value = doc.property.InformationAboutFlat
        }
      }).catch(function (err) {
        console.log(err)
      })
  },
    methods: {
      eventEmitter: function(section) {
          this.$emit("selected", section)
      },
      isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();;
        } else {
          return true;
        }
      },
    newProperty: function(){
      var propertySubmitted = {
            propertyAdress: document.getElementById("propertyAdress").value,
            clientName: document.getEle
            mentById("clientName").value,
            dateOfInspection: document.getElementById("dateOfInspection").value,
            typeOfProperty: document.getElementById("typeOfProperty").value,
            YearThePropertyWasBuilt: document.getElementById("YearThePropertyWasBuilt").value,
            YearThePropertyWasExtended: document.getElementById("YearThePropertyWasExtended").value,
            YearThePropertyWasConverted: document.getElementById("YearThePropertyWasConverted").value,
            InformationAboutFlat: document.getElementById("InformationAboutFlat").value,
          }
      db.get(this.specificReport._id).then(function (doc) {
          doc.property = propertySubmitted
          return db.put(doc);
      }).catch(function (err) {
        console.log(err)
      })
      this.emitEvent(0)
    },
    emitEvent: function(event) {
      this.$emit("selected", event)
    }
  }
};
</script>

<style>

  #save {
    width: 100%;
  }

</style>