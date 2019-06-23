<template>
  <div>
    <AppBase @searchkey="update"></AppBase>
    <PicGallery @tagdatachanged="humantagchanged" @searchTag="update" @requestTexid="getTexfile" :style="{height: getheight}" :piclist="piclist"></PicGallery>
    <div @click="hideEditor($event)">
      <TexEditor :acecontent="acecontent" v-if="showeditor" class="texEdi"></TexEditor>
    </div>
    <div>
      <TagEditor :currentPicTagvalue="currentPicTagvalue" :currentPicTag="currentPicTag" @tagchange="humantagchanged" @tagcancel="hideTagEditor" v-if="showetagditor" class="texEdi"></TagEditor>
    </div>
  </div>
</template>

<script>
import PicGallery from "./PicGallery";
import AppBase from "./AppBase";
import TexEditor from "./TexEditor"
import TagEditor from "./TagEditor"
import DataService from "../services/data-service";
export default {
  name: "Main",
  components: {
    PicGallery,
    AppBase,
    TexEditor,
    TagEditor
  },
  data() {
    return {
      piclist: [],
      sizeinline: 5,
      currentIndex: 0,
      gridwidth: 274,
      imagewidth: 260,
      yindex: [],
      marginleft: 0,
      currentPage: 1,
      searchtag: "",
      showetagditor:false,
      showeditor:false,
      acecontent:"",
      currentPicTag:{},
      currentPicTagvalue:"",
      colorset:{}
    };
  },
  computed: {
    getheight() {
      return Math.max(...this.yindex) + "px";
    }
  },
  mounted() {
    this.initialize();
    this.update()
    window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    initialize() {
      if (window.innerWidth <= 779) {
        this.sizeinline = 2;
      } else if (window.innerWidth <= 1039) {
        this.sizeinline = 3;
      } else if (window.innerWidth <= 1299) {
        this.sizeinline = 4;
      } else if (window.innerWidth <= 1559) {
        this.sizeinline = 5;
      } else if (window.innerWidth <= 1819) {
        this.sizeinline = 6;
      } else if (window.innerWidth <= 2079) {
        this.sizeinline = 7;
      } else if (window.innerWidth <= 2339) {
        this.sizeinline = 8;
      } else if (window.innerWidth <= 2599) {
        this.sizeinline = 9;
      } else if (window.innerWidth <= 2859) {
        this.sizeinline = 10;
      } else if (window.innerWidth <= 3119) {
        this.sizeinline = 11;
      } else if (window.innerWidth <= 3379) {
        this.sizeinline = 12;
      } else if (window.innerWidth <= 3639) {
        this.sizeinline = 13;
      } else if (window.innerWidth <= 3899) {
        this.sizeinline = 14;
      } else if (window.innerWidth <= 4159) {
        this.sizeinline = 15;
      } else {
        this.sizeinline = 16;
      }
      for (let i = 0; i < this.sizeinline; i++) {
        this.yindex.push(0);
      }
      this.marginleft =
        (window.innerWidth - this.sizeinline * this.gridwidth) / 2;
    },
    humantagchanged(data){
      if(data.state == "delete"){
        this.piclist[data.index].tagshow[data.tagindex] = 0
      }else if(data.state == "add"){
        this.currentPicTag = data
        this.currentPicTagvalue = data.tag
        this.showetagditor = true
      }else if(data.state == "change"){
        let tags = data.tag.trim().split(";")
        this.piclist[data.index].tagshow[data.tagindex] = 0
        for(let t=0;t<tags.length;t++){
          let changed = false
          for(let i=0;i<this.piclist[data.index].tags.length;i++){
              if(this.piclist[data.index].tags[i] == tags[t]){
                this.piclist[data.index].tagshow[i] = 1
                changed = true
              }
          }
          if(!changed){
            this.piclist[data.index].tags.push(tags[t])
            this.piclist[data.index].tagshow.push(1)
            this.piclist[data.index].tagcolor.push( this.getRandomColor() )
          }
        }
        this.showetagditor = false
      }
      this.piclist.push({})
      this.piclist.pop()
    },
    update(searchkey) {
      if(searchkey !== undefined){
        this.searchtag = searchkey
        this.resetConfig();
      }
      let config = {
        page: this.currentPage,
        tag: this.searchtag
      };
      Object.getPrototypeOf(DataService).getImages.call(
        this,
        "getpiclist",
        config
      );
    },
    getpiclist(data) {
      this.stopfetch = false;
      let size = this.sizeinline;
      this.piclist = this.piclist.concat(data.map((item, i) => {
        let x = (this.currentIndex % size) * this.gridwidth + this.marginleft;
        let imghei = item.height / (item.width / this.imagewidth);
        // let padbtm = imghei / config.imagewidth * 100;//percentage
        let hei = imghei + 25;
        // let src = config.baseurl+"/image/"+arr[i]["name"];
        let y = this.yindex[this.currentIndex % size] + 60;
        this.yindex[this.currentIndex % size] += hei;
        this.currentIndex++;
        return {
          name: item.name,
          transx: x,
          transy: y,
          tags: Object.keys(item.tags),
          tagshow: Object.values(item.tags),
          tagcolor: this.getRandomColorList(Object.keys(item.tags))
        };
      }))
    },
    resetConfig() {
      this.currentIndex = 0;
      this.currentPage = 1;
      this.yindex = [];
      this.piclist = [];
      for (let i = 0; i < this.sizeinline; i++) {
        this.yindex.push(0);
      }
    },
    getRandomColor(str) {
      if(this.colorset[str[0]]){
        return this.colorset[str[0]]
      }
      var o = Math.round, r = Math.random;
      let color = 'rgba(' + o(r()*200 + 50) + ',' + o(r()*200 + 50) + ',' + o(r()*200 + 50) + ', 0.8)';
      this.colorset[str[0]] = color
      return color
    },
    getRandomColorList(arr) {
      return arr.map(itm =>{
        if(this.colorset[itm[0]]){
          return this.colorset[itm[0]]
        }
        var o = Math.round, r = Math.random;
        let color = 'rgba(' + o(r()*200 + 50) + ',' + o(r()*200 + 50) + ',' + o(r()*200 + 50) + ', 0.8)';
        this.colorset[itm[0]] = color
        return color
      })
    },
    onScroll(e) {
      if (
        !this.stopfetch &&
        document.getElementsByTagName("html")[0].scrollHeight <=
          window.scrollY + window.innerHeight
      ) {
        this.currentPage += 1;
        this.stopfetch = true;
        this.update()
      }
    },
    hideTagEditor(e){
      this.showetagditor = false
    },
    hideEditor(e){
      if(e.target.className === "ace_content"){
        console.log(e)
      }else{
        this.showeditor = false
        document.getElementsByTagName("html")[0].style.overflow = "auto" 
      }
    },
    getTexfile(id){
      let config = {
        name: id
      };
      Object.getPrototypeOf(DataService).getOneTexFile.call(
        this,
        "refreshACEeditor",
        config
      );
    },
    refreshACEeditor(data){
      this.showeditor = true
      document.getElementsByTagName("html")[0].style.overflow = "hidden" 
      this.acecontent = data
    }
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stopscroll{
  overflow: hidden;
}
.startscroll{
  overflow: auto;
}
.texEdi {
    height:100%;
    width:100%;
    background-color:rgba(0,0,0,0.4);
    position: fixed;
}
</style>
