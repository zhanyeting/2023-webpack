import _ from 'lodash';
import numData from './ref.json';

export function numToWord(num){
    return _.reduce(numData, (accum, ref) => {
        return ref.num === num ? ref.word : accum; 
    }, "")
}

export function wordToNum(word){
    return _.reduce(
        numData,
        (accum, ref) => {
            return ref.word === word ? ref.num : accum;
        },
        -1
    );
}