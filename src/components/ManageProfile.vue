<template>
<div>
    <h1>ManageProfile vue</h1>
    <div>
        <form action="/action_page.php">
  Company Name:
  <input type="text" name="Companyname">
  <br>
  First Name:
  <input type="text" name="firstname">
  <br>
  Last Name:
  <input type="text" name="lastname">
  <br>
  Your E-mail:
  <input type="email" name="youremail">
  <br>
  Company E-mail:
  <input type="email" name="companyemail">
  <br>
  Add Company Logo:
  <input type="image" name="companylogo">
  <br>
  Adress/City:
  <input type="text" name="adresscity">
  <br>
  Zip code:
  <input type="text" name="zip"  pattern="[0-9]">
  <br>
  Phone:
  <input type="tel" name="phone" pattern="[0-9]">
  <br>
  <br>
  <input type="submit" onclick="window.location.href= '#/'" value="Submit">
</form> 
    </div>
</div>
</template>
<script>

</script>
<style>


</style>