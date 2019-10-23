<template>
  <div style="padding-top: 45px">
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
      <div style="padding-top: 1px"></div>
    </div>

    <form style="margin-right: 4%; margin-left: 4%">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="firstName">First Name:</label>
          <input type="text" class="form-control" id="firstName" placeholder="First Name">
        </div>
        <div class="form-group col-md-6">
          <label for="lastName">Last Name:</label>
          <input type="text" class="form-control" id="lastName" placeholder="Last Name">
        </div>
        <div class="form-group col-md-6">
          <label for="inputEmail">Your Email:</label>
          <input type="email" class="form-control" id="inputEmail" placeholder="email@gmail.com">
        </div>
        <div class="form-group col-md-6">
          <label for="companyName">Company Name:</label>
          <input type="text" class="form-control" id="companyName" placeholder="Terretalabs">
        </div>
        <div class="form-group col-md-6">
          <label for="inputEmailCompany">Company Email:</label>
          <input type="email" class="form-control" id="inputEmailCompany" placeholder="email@gmail.com">
        </div>
        <div class="form-group col-md-8">
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
    </form>
    <button id="save" @click="newUser()" class="btn btn-lg btn-block btn-info" href="/">Submit</button>
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
  mounted: function () {
    db.get('123456789').then(function (doc) {
        document.getElementById("firstName").value = doc.firstName
        document.getElementById("lastName").value = doc.lastName 
        document.getElementById("inputEmail").value = doc.yourEmail
        document.getElementById("companyName").value = doc.companyName
        document.getElementById("inputEmailCompany").value = doc.emailCompany
        document.getElementById("inputAddress").value = doc.address
        document.getElementById("inputZip").value = doc.zipCode
        document.getElementById("phone").value = doc.phone
        console.log(doc)
        return db.put(doc);
      }).catch(function (err) {
        throw err;
      })
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
      }).then(function () {
        window.location.href= '#/'
      })
    }
  }
};
</script>

<style>

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
#save {
  width: 100%;
}

</style>