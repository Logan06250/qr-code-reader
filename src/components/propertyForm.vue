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
        <input type="text" class="form-control" id="dateOfInspection">
        </div>
        <div class="form-group col-md-6">
          <label for="typeOfProperty">Type of property:</label>
          <input type="text" class="form-control" id="typeOfProperty">
        </div>
        <div class="form-group col-md-6">
          <label for="YearThePropertyWasBuilt">Year the property was built:</label>
          <input type="text" class="form-control" id="YearThePropertyWasBuilt">
        </div>
        <div class="form-group col-md-10">
        <label for="YearThePropertyWasExtended">Year the property was extended:</label>
        <input type="text" class="form-control" id="YearThePropertyWasExtended">
      </div>
        <div class="form-group col-md-2">
          <label for="YearThePropertyWasConverted">Year the property was converted:</label>
          <input type="text" class="form-control" id="YearThePropertyWasConverted">
        </div>
        <div class="form-group col-md-2">
          <label for="InformationAboutFlats">Information about flats:</label>
          <input type="text" class="form-control" id="InformationAboutFlat" >
        </div>
      </div>
      <center>
        <button id="save" @click="newProperty ()" class="btn btn-circle btn-info" style="width: 60px;
    height: 60px; font-size: 15px; margin: 10px; margin-top: -10px" href="/">Submit</button>
      </center>
    </form>
  </div>
</template>
<script>

  import { Slide } from 'vue-burger-menu'

  var db = new PouchDB("Property")
  console.log("Local database created and imported")


  export default{
  data(){
          return{
            Property:[
            ]
        }
      },
  components: {
      Slide
  },
    
    methods: {
    newProperty: function(){
      db.get('123456789').then(function (doc) {
        doc.propertyAdress = document.getElementById("propertyAdress").value
        doc.clientName =  document.getElementById("clientName").value
        doc.dateOfInspection = document.getElementById("dateOfInspection").value
        doc.typeOfProperty = document.getElementById("typeOfProperty").value
        doc.YearThePropertyWasBuilt = document.getElementById("YearThePropertyWasBuilt").value
        doc.YearThePropertyWasExtended = document.getElementById("YearThePropertyWasExtended").value
        doc.YearThePropertyWasConverted = document.getElementById("YearThePropertyWasConverted").value
        doc.InformationAboutFlat = document.getElementById("InformationAboutFlat").value
        console.log(doc)
        return db.put(doc);
      }).catch(function (err) {
        if (err.name === 'not_found') {
            var property  = {
              _id : "123456789",
              propertyAdress : document.getElementById("propertyAdress").value,
              clientName :  document.getElementById("clientName").value,
              dateOfInspection : document.getElementById("dateOfInspection").value,
              typeOfProperty : document.getElementById("typeOfProperty").value,
              YearThePropertyWasBuilt : document.getElementById("YearThePropertyWasBuilt").value,
              YearThePropertyWasExtended : document.getElementById("YearThePropertyWasExtended").value,
              YearThePropertyWasConverted : document.getElementById("YearThePropertyWasConverted").value,
              InformationAboutFlat : document.getElementById("InformationAboutFlat").value,
            }
            return db.put(property)
        } else {
          throw err;
        }
      })
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