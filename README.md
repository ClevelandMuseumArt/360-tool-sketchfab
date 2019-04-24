# 360 tool

Tool to generate frames around a 3D model uploaded to Sketchfab

### Usage:

* __Preview snapshot__ will display a 120x120 screenshot of the current model state in the sidebar
* __Spin__ will spin the object 360 degrees, moving at about 1.2 degrees every 0.07 seconds.
* __Capture__ will spin the object 360 degrees and save a screenshot of the model at each step. The screenshots are downloaded as a single .ZIP file to the default download folder. The individual screenshots are saved as .PNG files, but the script can be modified to download as .JPG or .TIF files.

### Interesting functions

* `turntable( initial_camera, frame_index, total_frames )` calculates the camera position for a specified frame in a sequence.
* `screengrab( sketchfab_api, width, height )` calls the Sketchfab function `getScreenShot`
* `capture( sketchfab_api, initial_camera, frame_index, total_frames )` manages the pipeline for the _Capture_ button. It calls `turntable`, `lookat`, and `screengrab` for each frame in the sequence, and compresses the image blobs when the sequence has been captured.

### Current To-Do List

* ~~The first screenshot is taken from the initial camera position, NOT the first turntable position, where it should be taken. Initialise the camera to the first turntable position, but only after the __Capture__ button has been clicked.~~
* Determine best pipeline for converting .PNG, .JPG, or .TIF screenshots to .KTX format
* ~~For large sequences (eg, 300 frames), there always seems to be at least one repeated frame. ie, frame 214 is identical to frame 215. What is the cause of this repetition, and how can it be resolved? (__EDIT:__ this _seems_ to be resolved on the Wade cup, need to test with other models.)~~ Not a problem with the capture sequence, but rather the compression sequence.
* Better dashboarding features allowing user selection of model ID, frame count, screenshot resolution. Progress bar indicator for image sequencing and compression. Collapsible sidebar / floating controls.
