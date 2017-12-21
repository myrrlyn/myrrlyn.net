#!/bin/bash

parallel -q -j $(parallel --num-cpu-cores) app/signer.sh {} ::: build/**/* build/*
