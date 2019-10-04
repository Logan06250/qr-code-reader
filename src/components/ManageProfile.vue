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
    <button type="submit" class="btn btn-primary" onclick="window.location.href= '#/'">Submit</button>
</form>
</div>
</template>
<script>
export default{
  methods: {
    //Only numbers are allowed
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    }
  }
};
</script>
<style>


</style>