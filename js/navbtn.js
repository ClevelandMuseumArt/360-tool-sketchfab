function openNav() {
    document.getElementById( 'sidebar' ).style.width = "350px";
    document.getElementById( 'sidebar' ).style.padding = "5px";
    document.getElementById( 'main' ).style.marginLeft = "350px";
    document.getElementById( 'openbtn' ).style.visibility = "hidden";
}

function closeNav() {
    document.getElementById( 'sidebar' ).style.width = "0";
    document.getElementById( 'sidebar' ).style.padding = "0px";
    document.getElementById( 'main' ).style.marginLeft = "0";
    document.getElementById( 'openbtn' ).style.visibility = "visible";
}
