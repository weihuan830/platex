from flask import Flask, send_from_directory
import json
from flask_cors import CORS
from flask import request
import os,sys
from PIL import Image

app = Flask(__name__, static_url_path="")
app._static_folder = "static"
CORS(app)

imgResourceList = []
tagResourceSet = {}
@app.route('/')
def index():
    return app.send_static_file('./latexfun.html')

def readIMGTAG():
    global imgResourceList
    global tagResourceSet
    imagenames = os.listdir('../ImgTex/image/')
    for i in imagenames:
        if i==".DS_Store":
            continue
        im=Image.open('../ImgTex/image/'+i)
        obj = {"name":i, "width":im.size[0], "height": im.size[1]}
        name = i.replace(".png","").replace(".jpg","").replace(".jpeg","")
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
                        if len(x) > 0:
                            tags[x] = 1
                            tagResourceSet[x] = 1
                    break
            obj["tex"] = name+".tex"
            obj["tags"] = tags
        except:
            obj["tex"] = ""
            obj["tags"] = {}
        imgResourceList.append(obj)
    print("circle" in tagResourceSet)

@app.route('/gettaglist',methods=['GET'])
def getTAGList():
    global tagResourceSet
    return str({"data":list(tagResourceSet.keys())})

@app.route('/getimgs',methods=['GET'])
def getIMGList():
    pagesize = 20
    global imgResourceList
    global tagResourceSet
    localList = imgResourceList
    page = 1
    tag = ""
    if "tag" in request.args:
        try:
            tag = request.args['tag']
            if tag.strip() != "":
                localList = []
                if tag.strip() in tagResourceSet:
                    for item in imgResourceList:
                        if tag in item['tags']:
                            localList.append(item)

        except:
            localList = []
    if "page" in request.args:
        try:
            page = int(request.args['page'])
        except:
            page = 1
    sub = localList[((page-1)*pagesize):(page*pagesize)]
    return str({"data":sub})

readIMGTAG()
if __name__ == '__main__':
    # app.run(host='0.0.0.0')
    app.run(debug=True)
