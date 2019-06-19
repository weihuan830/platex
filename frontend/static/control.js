var config = {
    "baseurl":window.location.origin,
    "width":260.0,
    "imagewidth":236.0,
    "size":5,
    "yindex":[],
    "state": false,
    "page":1,
    "currentIndex":0,
    "aceeditor":null,
    "tag":"",
    "tagBase":[],
    "getRandomColor":randomColor(),
}
function init(){
    config.size = 0;
    if(window.innerWidth <= 779){
        config.size = 2;
    }else if(window.innerWidth <= 1039){
        config.size = 3;
    }else if(window.innerWidth <= 1299){
        config.size = 4;
    }else if(window.innerWidth <= 1559){
        config.size = 5;
    }else if(window.innerWidth <= 1819){
        config.size = 6;
    }else if(window.innerWidth <= 2079){
        config.size = 7;
    }else if(window.innerWidth <= 2339){
        config.size = 8;
    }else if(window.innerWidth <= 2599){
        config.size = 9;
    }else if(window.innerWidth <= 2859){
        config.size = 10;
    }else if(window.innerWidth <= 3119){
        config.size = 11;
    }else if(window.innerWidth <= 3379){
        config.size = 12;
    }else if(window.innerWidth <= 3639){
        config.size = 13;
    }else if(window.innerWidth <= 3899){
        config.size = 14;
    }else if(window.innerWidth <= 4159){
        config.size = 15;
    }else{
        config.size = 16;
    }
    for(let i=0;i<config.size;i++){
        config.yindex.push(0);
    }
    editorInit()
    document.getElementById("parent").addEventListener("click", function(e){
        if(e.target.id == "parent"){
            document.getElementById("parent").style.display="none";
        }
    })
    document.getElementById('id_search').onkeypress = function(e){
        if (!e) e = window.event;
        let keyCode = e.keyCode || e.which;
        if (keyCode == '13'){
            requestSearch();
        }
    }
    document.addEventListener("scroll", function(){
        if(checkBottom() && config.state){
            config.state = false;
            getIMGList(appendAll);
        }
    });
    document.getElementById("id_search").addEventListener("input", function(){
        localSearch();
    })
    document.getElementById("id_clear_search").addEventListener("click", function(){
        document.getElementById("id_search").value = "";
        document.getElementById("id_search_container").style.display = "none";
    })
    getIMGList(appendAll);
    getTAGList();
}
function editorInit(){
    let width = 800, height=600;
    let left = (window.innerWidth - width)/2;
    let top = (window.innerHeight - height)/2;
    document.getElementById("editor").style.width = width+"px";
    document.getElementById("editor").style.height = height+"px";
    document.getElementById("editor").style.left = left+"px";
    document.getElementById("editor").style.top = top+"px";
    config.aceeditor = ace.edit("editor");
	config.aceeditor.$blockScrolling = Infinity;
	config.aceeditor.setTheme("ace/theme/xcode");
	config.aceeditor.session.setMode("ace/mode/latex");
	config.aceeditor.session.setUseWrapMode(true);
    config.aceeditor.session.setUseSoftTabs(true);
}
function localSearch(){
    let half = document.getElementById("id_search").value.trim();
    if(half == ""){
        document.getElementById("id_search_container").style.display = "none";
        return;
    }
    let str1 = `
        <li onclick=requestSearch('`
    let str2 = `')>
            <div class="text-container">
                <div class="text">
                    <span class="total-items">`;
    let str3 = `</span>
                </div>
            </div>
        </li>`;
    let arr = [];
    let count = 0;
    for(let i=0;i<config.tagBase.length;i++){
        if(config.tagBase[i].indexOf(half) >= 0 && count < 10){
            count++;
            arr.push( str1 + encodeURI(config.tagBase[i]) + str2 + config.tagBase[i] + str3 );
        }
    }
    document.getElementById("id_search_container").innerHTML = arr.join("");
    if(arr.length > 0){
        document.getElementById("id_search_container").style.display = "block";
    }
}
function randomColor(){
    let colorlist = ["#ffc0cb","#ffe4e1","#008080","#ff0000","#ffd700","#40e0d0","#ff7373","#00ffff","#e6e6fa","#666666","#d3ffce","#ffa500","#f0f8ff","#0000ff","#b0e0e6","#c6e2ff","#faebd7","#7fffd4","#fa8072","#eeeeee","#cccccc","#003366","#800000","#ffb6c1","#800080","#00ff00","#ffff00","#ffc3a0","#333333","#20b2aa","#c0c0c0","#f08080","#66cdaa","#fff68f","#f6546a","#ff6666","#c39797","#468499","#ffdab9","#ff00ff","#00ced1","#ff7f50","#c0d6e4","#660066","#008000","#bada55","#101010","#0e2f44","#8b0000","#088da5","#f5f5f5","#808080","#990000","#afeeee","#daa520","#b4eeb4","#ffff66","#dddddd","#cbbeb5","#00ff7f","#f5f5dc","#b6fcd5","#81d8d0","#8a2be2","#000080","#794044","#3399ff","#6897bb","#ccff00","#ff4040","#a0db8e","#66cccc","#cc0000","#999999","#fef65b","#ff1493","#ff4444","#3b5998","#0099cc"];
    let colors = {}, index = 0;
    return function(fstChar){
        if(colors[fstChar] != undefined){
            return colors[fstChar];
        }else{
            colors[fstChar] = colorlist[index++];
            return colors[fstChar];
        }
    }
}
function appendAll(arr){
    let new_elem = document.createElement('div');
    let str = '', size = config.size;
    for(let i=0;i<arr.length;i++){
        let x = (config.currentIndex%size) * config.width;
        let imghei = (arr[i].height/(arr[i].width/config.imagewidth));
        let padbtm = imghei / config.imagewidth * 100;//percentage
        let hei = (467-411) + imghei + 35;
        let src = config.baseurl+"/image/"+arr[i]["name"];
        let trans = 'translateX('+x+'px) translateY('+config.yindex[config.currentIndex%size]+'px)';
        // let tags = ["1thisisalonglonglonglongTAG","shortTAG1","shortTAG2","2thisisalonglonglonglongTAG"];
        str += appendImage(trans, src, hei, padbtm, arr[i]["name"], arr[i].tags);
        config.yindex[config.currentIndex%size] += hei;
        config.currentIndex++;
    }
    new_elem.innerHTML = str;
    document.getElementById("id_container").appendChild(new_elem);
    config.state = true;
    if(arr.length > 0){
        config.page++;
        document.getElementById("noimg").style.display = "none";
    }else if(config.currentIndex == 0){
        document.getElementById("noimg").style.display = "block";
    }
}
function fireEvent(t,e){
    let text = e.target.textContent.trim();
    if(text != "View Latex Code"){
        console.log(text)
        requestSearch(text)
    }

}
function appendImage(trans, src, hei, padbtm, name, tags){
    let tagEle = "";
    for(let key in tags){
        // if(key.length > 12){
        //     tagEle += `<span name=` + key + ` class="tagspan" style="cursor: pointer;background:` + config.getRandomColor(key[0]) + `">` + key.substr(0,10) + `..</span>`;
        // }else{
            tagEle += `<span name=` + key + ` class="tagspan" style="cursor: pointer;background:` + config.getRandomColor(key[0]) + `">` + key + `</span>`;
        // }
    }
    let item = `
    <div onclick=fireEvent(this,event) class="Yl- MIw Hb7" style="top: 0px; left: 0px; transform: `+trans+`; width: 260px; height: `+hei+`px;">
        <div style="padding-bottom: 28px; padding-left: 12px; padding-right: 12px;" >
            <div class="XiG zI7 iyn Hsu" style="border: 1px solid #ccc!important;border-radius: 10px;" onclick=showlatex("`+name+`")>
                <a style="display: block; position: relative;">
                    <div class="Pj7 sLG XiG ZKv mix m1e">
                        <div class="zI7 iyn Hsu" style="min-height: 55px;">
                            <div class="XiG zI7 iyn Hsu">
                                <div class="Jea gjz zI7 iyn Hsu" style="min-height: 120px;">
                                    <div class="ujU zI7 iyn Hsu">
                                        <div class="XiG zI7 iyn Hsu" style="background-color: rgb(41, 51, 84); padding-bottom: `+padbtm+`%;">
                                            <img alt="Daring" class="hCL kVc L4E MIw" src="`+src+`">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>  
                <div class="Jea MIw gjz ojN zI7 iyn Hsu" style="width: 100%; height: 50px;">
                    <div class="zI7 iyn Hsu" style="width: 75%;">
                        <div class="XiG ojN zI7 iyn Hsu">
                            <div class="Jea b8T f03 hA- pP3 uro wYR zI7 iyn Hsu">
                                <div class="Shl zI7 iyn Hsu" style="min-width: 0px;cursor: pointer;">
                                    <div class="XiG zI7 iyn Hsu" style="border-radius: 20px;">
                                        <div class="Jea b8T gjz hA- prG wYR zI7 iyn Hsu" style="border-radius: 20px;">
                                            <div class="n9m sLG ujU zI7 iyn Hsu" style="height: 18px;">
                                                <div class="tBJ dyH iFc SMy MF7 erh DrD IZT mWe z-6">View Latex Code</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="Jea hDW hs0 zI7 iyn Hsu" style="display: block;">
            `+tagEle+`
            </div>
        </div>
    </div>
    `
    return item;
}
function checkBottom(){
    if(document.getElementsByTagName("html")[0].scrollHeight <= (window.scrollY + window.innerHeight)){
        return true;
    }
    return false;
}
function getIMGList(callback, reset){
    if(reset){
        config.currentIndex = 0;
        config.page = 1;
        for(let i=0;i<config.yindex.length;i++){
            config.yindex[i] = 0;
        }
    }
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "http://127.0.0.1:5000/getimgs?page="+config.page+"&tag="+config.tag);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            let x = xhr.responseText.replace(/\'/g,"\"")
            let data = JSON.parse(x);
            if(reset){
                document.getElementById("id_container").innerHTML = "";
            }
            document.getElementById("id_search_container").style.display = "none";
            callback(data.data);
        }
    }
    xhr.send();
}
function getTAGList(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "http://127.0.0.1:5000/gettaglist");
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            let x = xhr.responseText.replace(/\'/g,"\"")
            let data = JSON.parse(x);
            config.tagBase = data.data;
        }
    }
    xhr.send();
}
function getOneTexFile(name){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', config.baseurl+'/tex/' + name.replace(".png","").replace(".jpg","").replace(".jpeg","") + ".tex");
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            config.aceeditor.setValue(xhr.responseText);
            document.getElementById("parent").style.display="block";
        }
    }
    xhr.send();
}
function showlatex(name){
    getOneTexFile(name);
}
function requestSearch(localtag){
    if(localtag!=undefined && config.tag != localtag){
        document.getElementById("id_search").value = decodeURI(localtag.trim());
        config.tag = decodeURI(localtag);
    }else if(config.tag != document.getElementById("id_search").value.trim()){
        config.tag = document.getElementById("id_search").value.trim();
    }
    getIMGList(appendAll, true);
}
init()
