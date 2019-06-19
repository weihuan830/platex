<template>
  <div>
    <div class="HeaderContent" data-test-id="header" id="HeaderContent" style="z-index:671">
      <div class="Jea jzS zI7 iyn Hsu">
        <div class="C9q Jea Zr3 ujU xcv L4E zI7 iyn Hsu">
          <div class="Jea gjz xcv L4E zI7 iyn Hsu" style="height:56px">
            <div class="zI7 iyn Hsu">
              <div class="XiG zI7 iyn Hsu">
                <div aria-label="Home" class="zI7 iyn Hsu">
                  <a
                    class="dangerouslyDisableFocusStyle"
                    href="https://driveuat.classviva.com/"
                    rel
                  >
                    <div
                      class="INd zI7 iyn Hsu"
                      style="background-color:transparent;height:48px;width:48px"
                    >
                      <img style="height:48px;width:48px" :src="logoimg">
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div
              role="combobox"
              aria-haspopup="listbox"
              aria-owns="SuggestionsMenu"
              aria-expanded="false"
              class="fZz ujU zI7 iyn Hsu"
              style="min-width:407px"
            >
              <div class="Jea gpV mix zI7 iyn Hsu" style="height:40px">
                <div class="Jea XiG fZz gjz ujU zI7 iyn Hsu" style="height:100%">
                  <div onclick="requestSearch()" class="Eqh ocu zI7 iyn Hsu">
                    <svg
                      class="gUZ B9u U9O kVc"
                      height="20"
                      width="20"
                      viewBox="0 0 24 24"
                      aria-label="Search icon"
                      role="img"
                    >
                      <path
                        d="M10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6m13.12 2.88l-4.26-4.26A9.842 9.842 0 0 0 20 10c0-5.52-4.48-10-10-10S0 4.48 0 10s4.48 10 10 10c1.67 0 3.24-.41 4.62-1.14l4.26 4.26a3 3 0 0 0 4.24 0 3 3 0 0 0 0-4.24"
                      ></path>
                    </svg>
                  </div>
                  <div class="ujU zI7 iyn Hsu" style="height:100%">
                    <input
                      id="id_search"
                      type="text"
                      autocapitalize="off"
                      autocorrect="off"
                      autocomplete="off"
                      aria-autocomplete="list"
                      aria-describedby="SearchInputAccessibleText"
                      aria-controls="SuggestionsMenu"
                      aria-activedescendant
                      class="SearchBoxInputExperimental"
                      name="searchBoxInput"
                      placeholder="Search"
                      style="background-color:transparent;border:none;color:#333;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Fira Sans&quot;,&quot;Droid Sans&quot;,&quot;Helvetica Neue&quot;,Helvetica,&quot;ヒラギノ角ゴ Pro W3&quot;,&quot;Hiragino Kaku Gothic Pro&quot;,メイリオ,Meiryo,&quot;ＭＳ Ｐゴシック&quot;,Arial,sans-serif,&quot;Apple Color Emoji&quot;,&quot;Segoe UI Emoji&quot;,&quot;Segoe UI Symbol&quot;;font-size:16px;font-weight:600;height:100%;outline:none;padding:0;width:100%"
                      v-model="searchValue"
                      v-on:input="searchKeyChange($event)"
                    >
                    <ul v-if="showhints" class="ul-container">
                      <li v-for="item in hintList" v-bind:key="item" @click="clickTag2Search(item)">
                        <div class="text-container">
                          <div class="text">
                            <span class="total-items">{{item}}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="Eqh XTf zI7 iyn Hsu" style="z-index: 3;">
                    <div @click="clearSearchKeyword()" class="zI7 iyn Hsu">
                      <button
                        aria-label="Remove search input"
                        class="rYa kVc adn yQo qrs BG7"
                        type="button"
                      >
                        <div class="x8f INd _O1 gjz mQ8 OGJ YbY" style="height: 24px; width: 24px;">
                          <div class="INd zI7 iyn Hsu">
                            <svg
                              class="gUZ B9u U9O kVc"
                              height="12"
                              width="12"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              aria-label
                              role="img"
                            >
                              <path
                                d="M15.18 12l7.16-7.16c.88-.88.88-2.3 0-3.18-.88-.88-2.3-.88-3.18 0L12 8.82 4.84 1.66c-.88-.88-2.3-.88-3.18 0-.88.88-.88 2.3 0 3.18L8.82 12l-7.16 7.16c-.88.88-.88 2.3 0 3.18.44.44 1.01.66 1.59.66.58 0 1.15-.22 1.59-.66L12 15.18l7.16 7.16c.44.44 1.01.66 1.59.66.58 0 1.15-.22 1.59-.66.88-.88.88-2.3 0-3.18L15.18 12z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </button>
                    </div>
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
import PicGallery from './PicGallery'
import DataService from "../services/data-service";
export default {
  name: "AppBase",
  components: {},
  data() {
    return {
      showhints: false,
      logoimg: require("../assets/img/logo.png"),
      hintList: [],
      searchValue: ""
    };
  },
  mounted() {
      Object.getPrototypeOf(DataService).getAllTags.call(this, 'initialize', "")
  },
  methods: {
    initialize() {
      this.filterHints();
    },
    searchKeyChange() {
      if (this.searchValue.length > 0) {
        this.showhints = true;
        this.filterHints()
      } else {
        this.showhints = false;
      }
    },
    clickTag2Search(val){
        this.searchValue = val
        this.$emit('searchkey', this.searchValue)
        this.showhints = false;
    },
    clearSearchKeyword(){
        this.clickTag2Search("")
    },
    filterHints() {
        this.hintList = DataService.tagBase.filter((item, i) => {
            return (item.indexOf(this.searchValue) >= 0)
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  width: 100%;
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
