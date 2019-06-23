<template>
  <div>
    <editor class="editor" v-model="acecontent" @init="editorInit" readOnly="true" lang="latex" theme="chrome" :style="{'marginLeft':marginleft+'px'}"></editor>
  </div>
</template>

<script>
import DataService from '../services/data-service'
export default {
  name: 'TexEditor',
  data () {
    return {
      marginleft: (window.innerWidth - 800)/2,
      content:""
    }
  },
  props:['acecontent'],
  components: {
    editor: require('vue2-ace-editor'),
  },
  mounted () {
  },
  methods: {
        editorInit: function () {
            require('brace/mode/html')                
            require('brace/mode/latex')
            require('brace/theme/chrome')
        }
    },
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.editor {
    margin-top: 60px;
    width:800px !important;
    height:700px !important;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
