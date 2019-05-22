var slider = document.getElementById( 'opacity-slider' );
var indicator = document.getElementById( 'opacity-indicator' );
var image = document.getElementById( 'stencil-img' );

slider.addEventListener( 'mouseup', function() {
    var transparency = slider.value;

    indicator.innerHTML = transparency;

    image.style.opacity = transparency;

});
