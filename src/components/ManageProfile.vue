<template>

<div class="container">
<form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="firstName">First Name:</label>
      <input type="text" class="form-control" id="firstName" placeholder="First Name">
    </div>
    <div class="form-group col-md-6">
      <label for="lastName">Last Name:</label>
      <input type="text" class="form-control" id="lastName" placeholder="Last Name">
    </div>
    <label for="inputEmail">Your Email:</label>
    <input type="email" class="form-control" id="inputEmail" placeholder="email@gmail.com">
    <div class="form-group col-md-6">
      <label for="companyName">Company Name:</label>
      <input type="text" class="form-control" id="companyName" placeholder="Terretalabs">
    </div>
    <div class="form-group col-md-6">
      <label for="inputEmailCompany">Company Email:</label>
      <input type="email" class="form-control" id="inputEmailCompany" placeholder="email@gmail.com">
    </div>
    <div class="form-group col-md-10">
  <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" @keypress="isNumber($event)" id="inputZip"
      placeholder="46022">
    </div>
    <div class="form-group">
      <label for="phone">Phone Number</label>
      <input type="text" @keypress="isNumber($event)"class="form-control" id="phone" placeholder="0 895 896 180">
    </div>
  </div>
    <button type="submit" class="btn btn-primary" @click="newUser()">Submit</button>
</form>
</div>
</template>
<script>
  var db = new PouchDB("User")

export default{
  data(){
          return{
            User:[
            ]
        }
      },
    mounted: function () {
      db.allDocs({ include_docs: true, descending: true }, (err, doc) => {
        doc.rows.forEach(e => {
            console.log(e)
        });

    }).catch((err) => {
        console.error(err);
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
    newUser: function(){
      db.get('123456789').then(function (doc) {
        doc.firstName = document.getElementById("firstName").value
        doc.lastName =  document.getElementById("lastName").value
        doc.yourEmail = document.getElementById("inputEmail").value
        doc.companyName = document.getElementById("companyName").value
        doc.emailCompany = document.getElementById("inputEmailCompany").value
        doc.address = document.getElementById("inputAddress").value
        doc.zipCode = document.getElementById("inputZip").value
        doc.phone = document.getElementById("phone").value
        console.log(doc)
        return db.put(doc);
      }).catch(function (err) {
        if (err.name === 'not_found') {
            var person = {
              _id : "123456789",
              firstName : document.getElementById("firstName").value,
              lastName :  document.getElementById("lastName").value,
              yourEmail : document.getElementById("inputEmail").value,
              companyName : document.getElementById("companyName").value,
              emailCompany : document.getElementById("inputEmailCompany").value,
              address : document.getElementById("inputAddress").value,
              zipCode : document.getElementById("inputZip").value,
              phone : document.getElementById("phone").value,
            }
            return db.put(person)
        } else {
          throw err;
        }
      })
    }
  }
}
</script>
<style>


</style>