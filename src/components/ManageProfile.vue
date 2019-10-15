<template>
  <div class="container">
    <div id="Navigation">
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
      <div style="padding-top: 1px"></div>
    </div>

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
        <div class="form-group col-md-2">
          <label for="phone">Phone Number</label>
          <input type="text" @keypress="isNumber($event)"class="form-control" id="phone" placeholder="0 895 896 180">
        </div>
      </div>
      <center>
        <button id="save" @click="newUser()" class="btn btn-circle btn-info" style="width: 60px;
    height: 60px; font-size: 15px; margin: 10px; margin-top: -10px" href="/">Submit</button>
      </center>
    </form>
  </div>
</template>
<script>

  import { Slide } from 'vue-burger-menu'

  var db = new PouchDB("User")
  console.log("Local database created and imported")


  export default{
  data(){
          return{
            title: "Profile",
            User:[
            ]
        }
      },
  components: {
      Slide
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
    margin-bot: 10px;
    margin-top: -6%;
    width:100%;
    height:7.5%;
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