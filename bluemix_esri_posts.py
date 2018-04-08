import os
import json
from watson_developer_cloud import VisualRecognitionV3

#for every file pair in directory
directory = os.fsencode('/Users/arkwl/Desktop/Workstation/Pothole/images/')

#while True:
if True:
    #for file in os.listdir(directory):
    for i in range(1):
        '''
        filename = os.fsdecode(file)
        if filename.endswith(".jpg"):
            #send photo to ibm bluemix
            visual_recognition = VisualRecognitionV3(
        	   '2016-05-20',
        	   api_key='91bef4426dc30ea321530c574bb1c1e5af087243'
            )

            with open("/Users/arkwl/Desktop/Workstation/Pothole/images/"+filename, 'rb') as images_file:
                classes = visual_recognition.classify(
                    images_file,
                    parameters=json.dumps({
                        'classifier_ids': ['Potholes_971110931'],
                        'threshold': 0.65
                    }))
            '''

        from arcgis.gis import GIS
        from arcgis.features import Feature, FeatureSet, FeatureLayer
        from arcgis.geometry import Point
        gis = GIS(username="lzak95", password="bitcamp2018")
        p = Point({"x": "-73.3432", "y":  "30.6782"})
        a = {"pothole_layer": "pothole"}
        f = Feature(p, a)
        fs = FeatureSet([f])
        lyr = FeatureLayer("https://services8.arcgis.com/x660UqfqVJlbWB0Y/arcgis/rest/services/pothole_layers/FeatureServer/0", gis=gis)
        lyr.edit_features(adds=fs)

            #get results
            #data = json.dumps(classes, indent=2)
            #print(data)

        #delete photo and txt
        #os.remove("/Users/arkwl/Desktop/Workstation/Pothole/images/"+filename)

    #else:
        #continue
