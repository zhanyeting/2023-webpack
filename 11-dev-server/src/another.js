// import { add, minus, print } from './util/math';
// import _ from 'lodash';

function getCompenent() {
    return import('lodash').then(({ default: _ }) => {
        const box = document.createElement('div');
        import(/* webpackChunkName: 'math' */ '@util/math').then(({ print }) => {
            const res = print(2,6);
            box.textContent = _.join(["Hello,", "another", "entry!!!"], "  ") + res;
        })
        // box.textContent = _.join(["Hello,", "another", "entry!!!"], "  ") + print(5,9) + "  "+minus(5,9) + "  " + add(5,9);
        return box;
    })
}

// document.body.appendChild(getCompenent());
getCompenent().then((compenent) => {
    document.body.appendChild(compenent);
})