import _ from 'lodash';

function getStr() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(' 2s  --- Hello World !!! '+
             _.join(["this",'is', 'hello', 'function', 'in', 'index.js!'], ' ')
            )
        }, 2000)
    })
}

async function hello () {
    console.log(" Hello World !!!!!  ");
    const str = await getStr();
    console.log(str);
}

export default hello;