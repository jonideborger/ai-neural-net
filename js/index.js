"use strict";

let model;

setup();

function setup() {
    model = ml5.neuralNetwork({
        dataUrl: '../data/data.json',
        inputs: ,
        outputs: ,
        task: ,
        debug: true
    }, modelLoaded);
}

function modelLoaded() {
    console.log('loaded')
    //normalize
    //train
}

function whileTraining(epoch, loss) {
    console.log(`epoch: ${epoch}, loss:${loss}`);
}

function doneTraining() {
    console.log('done!');
    //predict
}

