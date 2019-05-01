function sentinel() {
    console.log( 'sentinel activated' );
    return;
}

// CAREFUL --- img_warehouse is a global variable for storing blobs; only reference in capture()
var img_warehouse = [];

function capture( sketchfab_api, img_type = 'image/png', initial_camera, frame_index, total_frames = 1047, width = 1920, height = 1080, offset = 0.0 ) {

    // base case: zip all img blobs stored in img_warehouse[] and save to .ZIP file
    if ( frame_index === total_frames ) {
        var zip = new JSZip();

        for ( let img_index = 0; img_index < img_warehouse.length; img_index++ ) {
            var label = img_index.toString();
            if ( label.length === 1 ) {
                label = '000' + label;
            }
            else if ( label.length === 2 ) {
                label = '00' + label;
            }
            else if ( label.length === 3 ) {
                label = '0' + label;
            }

            if ( img_type === 'image/png' ) {
                zip.file( acc_id + '_' + label + '.png', img_warehouse[ img_index ] );
            }
            else if ( img_type === 'image/jpeg' ) {
                zip.file( acc_id + '_' + label + '.jpg', img_warehouse[ img_index ] );
            }
            console.log( 'zipped image ' + ( img_index + 1 ) + ' of ' + img_warehouse.length );
            if ( img_index === ( img_warehouse.length - 1 )) {
                zip.generateAsync({ type:'blob' }).then( function( blob ) {
                    console.log( 'finished compressing all image blobs' );
                    saveAs( blob, acc_id + '.zip' );
                }).then( function() {
                    img_warehouse = [];
                });
            }
        }
        return;
    }

    let camera_promise = turntable( initial_camera, frame_index, total_frames, offset );
    camera_promise.then( function( new_camera ) {
        lookat_wrapper( sketchfab_api, new_camera.position, new_camera.target, 0.0 );
        console.log( 'called lookat at frame ' + frame_index );
    }).then( function() {
        console.log( 'called screengrab at frame ' + frame_index );
        return screengrab( sketchfab_api, img_type, width, height );
    }).then( function ( img_blob ) {
        img_warehouse.push( img_blob );
        console.log( 'called push at frame ' + frame_index );
    }).then( function() {
        capture( sketchfab_api, img_type, initial_camera, frame_index + 1, total_frames, width, height, offset );
    });
}

// screengrab takes a screenshot of the specified resolution and returns the image as a blob
function screengrab( sketchfab_api, img_type = 'image/png', width = 1920, height = 1080 ) {
    return new Promise(( resolve, reject ) => {
        sketchfab_api.getScreenShot( width, height, img_type, function( err, result ) {
            var img_data = atob( result.split( ',' )[ 1 ]);
            var buffer = new ArrayBuffer( img_data.length );
            var view = new Uint8Array( buffer );
            for ( var i = 0; i < img_data.length; i++ ) {
                view[ i ] = img_data.charCodeAt( i ) & 0xff;
            }
            var img_blob = new Blob( [ buffer ], { type: img_type });
            resolve( img_blob );
        });
    });
}

// lookat_wrapper returns a Promise when setCameraLookAt finishes
function lookat_wrapper( sketchfab_api, eye, target, duration ) {
    return new Promise(( resolve, reject ) => {
        sketchfab_api.lookat( eye, target, duration, function() {
            resolve();
        });
    });
}

// turntable returns a camera object for a desired position around the model
function turntable( initial_camera, frame_index, total_frames, offset = 0.0 ) {
    return new Promise(( resolve, reject ) => {
        var increment = ( 2 * Math.PI ) / total_frames;
        var angle = increment * ( frame_index + 1 );
        var distance = Math.sqrt(
            Math.pow( initial_camera.target[ 0 ] - initial_camera.position[ 0 ], 2 ) +
            Math.pow( initial_camera.target[ 1 ] - initial_camera.position[ 1 ], 2 ));
        var x = initial_camera.target[ 0 ] + distance * Math.cos( angle + offset );
        var y = initial_camera.target[ 1 ] + distance * Math.sin( angle + offset );

        var new_camera = {
            position: [ x, y, initial_camera.position[ 2 ]],
            target: initial_camera.target.slice()
        };

        resolve( new_camera );
    });
}
