from flask import Flask, send_from_directory
import json
from flask_cors import CORS
from flask import request
import os,sys
from pathlib import Path
from PIL import Image
from datetime import date
from functools import reduce

# dd/mm/YY

app = Flask(__name__, static_url_path="")
app._static_folder = "static"
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('./latexfun.html')

def todayFile():
    today = date.today()
    name = "tag_" + str(today.strftime("%Y-%m-%d"))
    if not Path("tags/" + name).exists():
        with open("tags/" + name,"w+"):
            pass
    return "tags/" + name

def readIMGTAG():
    imgResourceList = []
    humanTag,tagResourceSet = loadTagfile()
    imagenames = os.listdir('../ImgTex/image/')
    for i in imagenames:
        if i==".DS_Store":
            continue
        im=Image.open('../ImgTex/image/'+i)
        obj = {"name":i, "width":im.size[0], "height": im.size[1]}
        name = i.replace(".png","").replace(".jpg","").replace(".jpeg","")
        if name in humanTag:
            tags = humanTag[name]
        else:
            tags = {}
        try:
            with open("../ImgTex/tex/"+name+".tex","r") as f:
                for ln in f:
                    if ":Tags:" in ln:
                        ln = ln.strip("\n").replace(":Tags:", "").strip("%").strip()
                    else:
                        continue
                    tmp = ln.split(";")
                    for k in tmp:
                        x = k.strip().lower()
                        if len(x) > 0 and not x in tags:
                            tags[x] = 1
                            tagResourceSet[x] = 1
                    break
            obj["tex"] = name+".tex"
            obj["tags"] = tags
        except:
            obj["tex"] = ""
            obj["tags"] = {}
        imgResourceList.append(obj)
    return imgResourceList, tagResourceSet

def loadTagfile():
    todayFile()
    tmptag = {}
    localtags = {}
    filelist = list(os.listdir("tags"))
    filelist.reverse()
    for item in filelist:
        with open("tags/" + item, "r") as f:
            for i in f.readlines():
                tmp = i.replace("\n","").split(";", 2)
                localtags[tmp[2]] = 1
                if tmp[0] in tmptag:
                    tmptag[tmp[0]][tmp[2]] = int(tmp[1])
                else:
                    tmptag[tmp[0]] = {tmp[2]: int(tmp[1])}
    return tmptag,localtags

@app.route('/gettaglist',methods=['GET'])
def getTAGList():
    _IRL, _TRS = readIMGTAG()
    return str({"data":list(_TRS.keys())})

@app.route('/getimgs',methods=['GET'])
def getIMGList():
    pagesize = 40
    _IRL, _TRS = readIMGTAG()
    localList = _IRL
    page = 1
    tag = ""
    if "tag" in request.args:
        # try:
            tagstr = request.args['tag']
            if tagstr.strip() != "":
                localList = []
                tmpSet = {}
                tags = tagstr.split(";")
                for tag in tags:
                    if tag.strip() in _TRS:
                        for item in _IRL:
                            if tag in item['tags']:
                                if not item['name'] in tmpSet:
                                    tmpSet[item['name']] = item
                                    tmpSet[item['name']]["cnt"] = 1
                                else:
                                    tmpSet[item['name']]["cnt"] += 1
                localList = sorted(tmpSet.values(), key=lambda kv: kv["cnt"], reverse=True)
    if "page" in request.args:
        try:
            page = int(request.args['page'])
        except:
            page = 1
    sub = localList[((page-1)*pagesize):(page*pagesize)]
    return str({"data":sub})

@app.route('/deletetag', methods=['GET'])
def getTagDelete():
    try:
        texid = request.args['id'].replace(".png","")
        tag = request.args['tag']
        filename = todayFile()
        with open(filename, "a") as f:
            f.write(texid+";"+"0"+";"+tag+"\n")
        return "true"
    except:
        return "false"

@app.route('/addtag', methods=['GET'])
def getTagAdd():
    try:
        texid = request.args['id'].replace(".png","")
        tag = request.args['tag'].split(";")
        replaced = request.args['rep'].strip()
        filename = todayFile()
        with open(filename, "a") as f:
            if len(replaced) > 0:
                f.write(texid+";"+"0"+";"+replaced+"\n")
            for i in tag:
                t = i.replace(";","").strip()
                if len(t) > 0:
                    f.write(texid+";"+"1"+";"+t+"\n")
        return "true"
    except:
        return "false"
if __name__ == '__main__':
    # app.run(host='0.0.0.0')
    app.run(host='0.0.0.0', port=5333, debug = True)
