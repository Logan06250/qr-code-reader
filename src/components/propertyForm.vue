<template>
  <div class="container">

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
    <button id="save" @click="newProperty()" class="btn btn-circle btn-info" style="width: 60px;
    height: 60px; font-size: 15px; margin: 10px; margin-top: -10px">Submit</button>
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
          document.getElementById("propertyAdress").value = doc.property.propertyAdress
          document.getElementById("clientName").value = doc.property.clientName
          document.getElementById("dateOfInspection").value = doc.property.dateOfInspection
          document.getElementById("typeOfProperty").value = doc.property.typeOfProperty
          document.getElementById("YearThePropertyWasBuilt").value = doc.property.YearThePropertyWasBuilt
          document.getElementById("YearThePropertyWasExtended").value = doc.property.YearThePropertyWasExtended
          document.getElementById("YearThePropertyWasConverted").value = doc.property.YearThePropertyWasConverted
          document.getElementById("InformationAboutFlat").value = doc.property.InformationAboutFlat
      }).catch(function (err) {
        console.log(err)
      })
  },
    methods: {
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
            clientName: document.getElementById("clientName").value,
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
.container {
  margin-left: -15px;
}
.form-row {
  margin-left: 5px;
}

form {
  padding-top: 46px;
}
#Navigation {
    background-color: #2F4558;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    margin-top: 0%;
    width:100%;
    height:62px;
    z-index:10;
    display:block;
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