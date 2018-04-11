import os
import json
from watson_developer_cloud import VisualRecognitionV3

from arcgis.gis import GIS
from arcgis.features import Feature, FeatureSet, FeatureLayer
from arcgis.geometry import Point

#for every file pair in directory
directory = os.fsencode('./images/')

for file in os.listdir(directory):
    #for i in range(1):
    filename = os.fsdecode(file)
    if filename.endswith(".jpg"):
        #send photo to ibm bluemix
        print(filename)
        visual_recognition = VisualRecognitionV3(
            '2016-05-20',
        	 api_key='##########################'
             )

        with open("./images/"+filename, 'rb') as images_file:
            classes = visual_recognition.classify(
                images_file,
                parameters=json.dumps({
                    'classifier_ids': ['##########'],
                    'threshold': 0.876
                }))

        #print(json.dumps(classes, indent=2))
        data = json.loads(json.dumps(classes, indent=2))
        if len(data['images'][0]['classifiers'][0]['classes']) != 0:

            print(json.dumps(classes, indent=2))

            f = open("./images/"+filename.replace("photo", "coor").replace("jpg", "txt"), "r")
            d = float(f.read()) * 0.000000301

            gis = GIS(username="lzak95", password="bitcamp2018")
            p = Point({"x": -73.471977 + d, "y": 40.703342})
            a = {"pothole_layer": "pothole"}
            f = Feature(p, a)
            fs = FeatureSet([f])
            lyr = FeatureLayer("https://services8.arcgis.com/x660UqfqVJlbWB0Y/arcgis/rest/services/pothole_layers/FeatureServer/0", gis=gis)
            lyr.edit_features(adds=fs)

        #delete photo and txt
