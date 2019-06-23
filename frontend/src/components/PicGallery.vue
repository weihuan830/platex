<template>
  <div>
    <div class="zI7 iyn Hsu">
      <div class="gridCentered">
        <div style="width: 100%;">
          <div
            v-for="(item, picindex) in piclist"
            v-bind:key="item.name"
            class="Yl- MIw Hb7 imgcontent"
            v-bind:style="{transform: 'translateX('+item.transx+'px) translateY('+item.transy+'px)'}"
          >
            <div class="XiG zI7 iyn Hsu">
              <i @click.prevent="addTagClick(item.name, picindex)" class="fa fa-plus addtagicon" aria-hidden="true"></i>
              <a @click="getTex(item.name)" style="display: block; position: relative;">
                <div class="Pj7 sLG XiG ZKv mix m1e">
                  <div class="zI7 iyn Hsu" style="min-height: 55px;">
                    <div class="XiG zI7 iyn Hsu">
                      <div class="Jea gjz zI7 iyn Hsu" style="min-height: 120px;">
                        <div class="ujU zI7 iyn Hsu">
                          <div class="XiG zI7 iyn Hsu">
                            <img
                              alt="Daring"
                              class="hCL kVc L4E MIw"
                              :src="'static/image/'+item.name"
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <div class="MIw gjz ojN zI7 iyn Hsu hidecard">
                <div>
                  <div
                    @click.prevent="changeTagClick(item.name, tag, picindex, index)"
                    v-for="(tag,index) in item.tags"
                    class="tagstyle"
                    :style="{background:item.tagcolor[index]}"
                    v-bind:key="tag"
                    v-show="item.tagshow[index]==1?true:false"
                  >
                    <i @click.prevent="deleteTagClick(item.name, tag, picindex, index, $event)"
                      title="Delete"
                      class="fa fa-close deletecross"
                      style="font-size:20px"
                    ></i>&nbsp;
                    {{tag.split(",")[0].substr(0, 20)}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataService from "../services/data-service";
export default {
  name: "PicGallery",
  data() {
    return {};
  },
  props: ["piclist"],
  computed: {},
  mounted() {},
  methods: {
    getTex(id) {
      this.$emit("requestTexid", id.replace(".png", ""));
    },
    // searchTagClick(id, tag, index, tagindex) {
    //   let config = {
    //     state:"add",
    //     id:id,
    //     tag:tag,
    //     index:index,
    //     tagindex:tagindex
    //   }
    //   this.addTagChange(config)
    // },
    deleteTagClick(id, tag, index, tagindex, event) {
      event.stopPropagation()
      let config = {
        state:"delete",
        id:id,
        tag:tag,
        index:index,
        tagindex:tagindex
      }
      Object.getPrototypeOf(DataService).deleteTag.call(
        this,
        "deleteTagCallback",
        config
      );
    },
    deleteTagCallback(data, config){
      if(data == 'true'){
        this.$emit("tagdatachanged", config);
      }else {
        alert("Delete Failed!!!")
      }
    },
    changeTagClick(id, tag, index, tagindex){
      let config = {
        state:"change",
        id:id,
        tag:tag,
        index:index,
        tagindex:tagindex
      }
      this.$emit("tagW2change", config);
    },
    addTagClick(id, index){
      let config = {
        state:"add",
        id:id,
        index:index
      }
      this.$emit("tagW2change", config);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../node_modules/font-awesome/css/font-awesome";
a + div {
  /* -webkit-transition: opacity 0.5s;
  transition: opacity 0.5s;
  opacity: 0.2; */
  display: none;
}
.addtagicon {
    text-align: center;
    background: green;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    display: block;
    position: relative;
    margin-left: 230px;
    font-size: 20px;
}
.deletecross {
  position: relative;
  /* top: -10px; */
  font-size: 20px;
  border-radius: 2px;
  background: white;
  color: red;
}
.hidecard:hover {
  display: block;
}
.tagstyle:hover {
  border-color: red !important;
}
a:hover + div {
  display: block;
}
.tagstyle {
  cursor: pointer;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 2px;
  font-size: 14px;
  /* text-align: center; */
  border: 2px solid rgba(0, 0, 0, 0.2);
}
.hidecard {
  padding-left: 4px;
  padding-right: 12px;
  /* width:100%; */
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: 100%;
  top: -0px;
  position: absolute;
  z-index: 1000;
}
.imgcontent {
  top: 0px;
  left: 0px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 2px;
  padding-right: 2px;
  border: 1px solid #ccc !important;
  border-radius: 10px;
  width: 260px;
  position: absolute;
}
.gridCentered {
  margin-left: auto;
  margin-right: auto;
}

.gridCentered .static,
.gridCentered .Masonry-Premount .Collection-Item {
  position: absolute;
  visibility: hidden;
}

.gridCentered .Masonry-Premount,
.gridCentered .Masonry-Premount .AutoSizer,
.gridCentered .Masonry-Premount .Collection {
  width: auto !important;
}

@media (min-width: 0px) and (max-width: 779px) {
  .gridCentered {
    width: 520px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 2),
  .gridCentered .static:nth-child(-n + 2) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 780px) and (max-width: 1039px) {
  .gridCentered {
    width: 780px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 3),
  .gridCentered .static:nth-child(-n + 3) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 1040px) and (max-width: 1299px) {
  .gridCentered {
    width: 1040px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 4),
  .gridCentered .static:nth-child(-n + 4) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 1300px) and (max-width: 1559px) {
  .gridCentered {
    width: 1300px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 5),
  .gridCentered .static:nth-child(-n + 5) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 1560px) and (max-width: 1819px) {
  .gridCentered {
    width: 1560px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 6),
  .gridCentered .static:nth-child(-n + 6) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 1820px) and (max-width: 2079px) {
  .gridCentered {
    width: 1820px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 7),
  .gridCentered .static:nth-child(-n + 7) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 2080px) and (max-width: 2339px) {
  .gridCentered {
    width: 2080px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 8),
  .gridCentered .static:nth-child(-n + 8) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 2340px) and (max-width: 2599px) {
  .gridCentered {
    width: 2340px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 9),
  .gridCentered .static:nth-child(-n + 9) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 2600px) and (max-width: 2859px) {
  .gridCentered {
    width: 2600px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 10),
  .gridCentered .static:nth-child(-n + 10) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 2860px) and (max-width: 3119px) {
  .gridCentered {
    width: 2860px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 11),
  .gridCentered .static:nth-child(-n + 11) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 3120px) and (max-width: 3379px) {
  .gridCentered {
    width: 3120px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 12),
  .gridCentered .static:nth-child(-n + 12) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 3380px) and (max-width: 3639px) {
  .gridCentered {
    width: 3380px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 13),
  .gridCentered .static:nth-child(-n + 13) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 3640px) and (max-width: 3899px) {
  .gridCentered {
    width: 3640px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 14),
  .gridCentered .static:nth-child(-n + 14) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 3900px) and (max-width: 4159px) {
  .gridCentered {
    width: 3900px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 15),
  .gridCentered .static:nth-child(-n + 15) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}

@media (min-width: 4160px) and (max-width: 4419px) {
  .gridCentered {
    width: 4160px;
  }
  .gridCentered .Masonry-Premount .Collection-Item:nth-child(-n + 16),
  .gridCentered .static:nth-child(-n + 16) {
    position: static !important;
    visibility: visible !important;
    float: left;
    display: block;
  }
}
.AppBase {
  margin-top: -1px;
  min-width: 320px;
  padding-top: 1px;
}
.HeaderContent {
  position: fixed;
  top: 0;
  width: 100%;
}
.Jea {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}
.Hsu {
  box-sizing: border-box;
}
.jzS {
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
.L4E {
  width: 256px;
}
.ujU {
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
}
.Hsu {
  box-sizing: border-box;
}
.Zr3 {
  padding-left: 12px;
  padding-right: 12px;
}
.C9q {
  padding-bottom: 4px;
  padding-top: 4px;
}
.gjz {
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.fZz {
  padding-left: 16px;
  padding-right: 16px;
}
.XiG {
  position: relative;
}
a {
  color: #333;
  font-weight: bold;
  text-decoration: none;
}
.gpV {
  background-color: #efefef;
}
.mix {
  border-radius: 8px;
}
.Eqh {
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}
.ocu {
  margin-right: 12px;
}
.gUZ {
  fill: currentColor;
  stroke-width: 0;
  vertical-align: middle;
}
.SearchBoxInputExperimental:placeholder-shown {
  z-index: 1;
}
.SearchBoxInputExperimental {
  position: relative;
}
input {
  line-height: normal;
}
.rYa {
  background: transparent;
}
.yQo {
  padding: 0;
}
.adn {
  border: 0;
}
.BG7 {
  cursor: pointer;
}
.ul-container {
  position: absolute;
  left: 0;
  z-index: 99;
  min-width: 100%;
  box-sizing: border-box;
  list-style: none;
  padding: 0;
  border-radius: 3px;
  margin: 0.2em 0 0;
  background: #fff;
  box-shadow: 0.05em 0.2em 0.6em rgba(0, 0, 0, 0.2);
  text-shadow: none;
  color: #1d262d;
  text-align: left;
}
.ul-container li {
  position: relative;
  height: 3em;
  cursor: pointer;
  clear: both;
  display: block;
}
ul li {
  list-style: none;
  padding: 0;
}
.text-container {
  position: absolute;
  top: 0;
  height: 100%;
  background: #fff;
  padding: 0 0.5em;
  z-index: 1;
}
.ul-container li :first-child {
  border-radius: 3px 3px 0 0;
}
.text-container .text {
  padding-top: 10px;
}
button:focus {
  outline: 0;
}
.ul-container li:hover > .text-container {
  background: #0e2a47;
  color: white;
}
.ul-container li:hover {
  background: #0e2a47;
  color: white;
}
</style>
