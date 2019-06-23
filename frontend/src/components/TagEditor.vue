<template>
  <div>
    <input type="text" v-model="currentPicTag.tag" class="tageditor">
    <div class="btns">
      <button @click="submitTag($event)" class="submit">submit</button>
      <button @click="cancel($event)" class="cancel">cancel</button>
    </div>
  </div>
</template>

<script>
import DataService from "../services/data-service";
export default {
  name: "TagEditor",
  data() {
    return {
    };
  },
  props: ["currentPicTag","currentPicTagvalue"],
  components: {},
  mounted() {},
  methods: {
    cancel(event) {
      this.$emit("tagcancel");
    },
    submitTag(event) {
      let config = {
        state: this.currentPicTag.state,
        id: this.currentPicTag.id,
        tag: this.currentPicTag.tag,
        index: this.currentPicTag.index,
        tagindex: this.currentPicTag.tagindex,
        rep: this.currentPicTagvalue
      }
      Object.getPrototypeOf(DataService).addTag.call(
        this,
        "addTagSucess",
        config
      );
    },
    addTagSucess(data,config){
      if(data == 'true'){
        this.$emit("tagchange", config);
      }else {
        alert("Update Failed!!!")
      }
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.tageditor {
  border-radius: 10px;
  position: relative;
  left: 40%;
  top: 250px;
  width: 300px;
  font-size: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
}
.btns {
  border-radius: 5px;
  position: relative;
  left: 40%;
  top: 300px;
  width: 300px;
  font-size: 20px;
  padding: 10px;
}
.submit {
  border-color: darkgreen;
  background-color: lawngreen;
  margin-right: 73px;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
}
.cancel {
  border-color: darkred;
  background-color: red;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
}
</style>
