#!/bin/bash

parallel -q -j $(parallel --num-cpu-cores) app/signer.sh {} ::: build/{blog,fonts,images,javascripts,minecraft,oeuvre,stylesheets}/**/* /build/*
