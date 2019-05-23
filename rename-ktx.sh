#!/bin/bash

for filename in $HOME/Documents/GalleryLens/assets/artworks360/1944.485.ktx/*.ktx; do
    full_directory=$(dirname "$filename")
    shortname=$(basename "$filename")
    replacement="${shortname#*_}"
    rep_length=${#replacement}
    if [ $rep_length -eq 5 ]; then
	replacement="000$replacement"
    fi;
    if [ $rep_length -eq 6 ]; then
	replacement="00$replacement"
    fi;
    if [ $rep_length -eq 7 ]; then
	replacement="0$replacement"
    fi;
    acc_id="1944.485_"
    replacement="$full_directory/$acc_id$replacement"
    mv $filename $replacement
done
