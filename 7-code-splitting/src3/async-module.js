
function getCompenent() {
    return import('lodash')
        .then(({default: _}) => {
            const compenent = document.createElement('div');
            compenent.innerHTML = _.join(['hello,', "this", "is", "asyn-module", "!"], " ");
            console.log(_.join(['hello,', "this", "is", "async-module", "!"], " "));
            return compenent;
        }).catch(err => "An error occured while loading the compenent!")
}

getCompenent().then((compenent) => {
    document.body.appendChild(compenent);
})