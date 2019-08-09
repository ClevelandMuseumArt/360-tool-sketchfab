// function lookat_wrapper( sketchfab_api, eye, target, duration ) {
//     return new Promise( resolve => sketchfab_api.lookat( eye, target, duration ));
// }
//
// function getScreenShot_wrapper( sketchfab_api, width, height, mimetype ) {
//     return new Promise( resolve => sketchfab_api.getScreenShot( width, height, mimetype ));
// }

function getCameraLookAt_wrapper( sketchfab_api ) {
    return new Promise( resolve => sketchfab_api.getCameraLookAt());
}
