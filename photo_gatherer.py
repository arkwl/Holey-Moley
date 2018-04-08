#!/usr/bin/env python
from importlib import import_module
import os
from flask import Flask, render_template, Response
import cv2
import datetime

# import camera driver
if os.environ.get('CAMERA'):
    Camera = import_module('camera_' + os.environ['CAMERA']).Camera
else:
    from camera_opencv import Camera

# Raspberry Pi camera module (requires picamera package)
# from camera_pi import Camera

app = Flask(__name__)
count = 0
n = 0

@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')


def gen(camera):
    """Video streaming generator function."""
    global count
    global n

    while True:
        count += 1
        print(count)
        if (count == 150):
            #get frame and save it
            print("success")
            rawFrame = camera.get_frame()
            frame = cv2.imencode('.jpg', rawFrame)[1].tobytes()
            cv2.imwrite(r'/Users/arkwl/Desktop/Workstation/Pothole/images/photo_'+ str(n)+'.jpg', rawFrame)

            #write coordinates
            f= open(r'/Users/arkwl/Desktop/Workstation/Pothole/images/coor_'+ str(n)+'.txt', "w+")
            f.write(str(datetime.datetime.today()))
            f.close()

            #reset counters
            count = 0
            n += 1
            yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""


    return Response(gen(Camera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True)
