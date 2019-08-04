<template>
  <div class="container">
    <h1>Halal Certifications :</h1>
    <div class="card-columns">
      <div class="card" v-for="cert in certs.data.data" v-bind:key="cert.id">
        <div class="box-part text-center">
          <img class="img-fluid" :src="cert.thumbnailLogo" alt />
          <div class="title">
            <h3>{{cert.abbreviation}}</h3>
          </div>

          <div class="text">
            <span>{{cert.name}}</span>
          </div>

          <a href="#">Learn More</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      certs: { data: { data: {} } }
    };
  },
  mounted() {
    this.$http
      .get(
        "https://api.halalnode.com:8250/v1/certification-body/landing?compact=true&page=1&limit=8"
      )
      .then(response => (this.certs = response));
  }
};
</script>

<style lang="scss" scoped>
.card {
  border: none;
}
.box {
  padding: 60px 0px;
}

.box-part {
  background: #fff;
  border-radius: 10px;
  padding: 60px 10px;
}

.box-part:hover {
  background: #4183d7;
}

.box-part:hover .fa,
.box-part:hover .title,
.box-part:hover .text,
.box-part:hover a {
  color: #fff;
  -webkit-transition: all 1s ease-out;
  -moz-transition: all 1s ease-out;
  -o-transition: all 1s ease-out;
  transition: all 1s ease-out;
}
.title {
  margin: 10px;
}
.text {
  margin: 20px 10px;
}

.fa {
  color: #4183d7;
}
</style>
