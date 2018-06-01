//esse aquivo não faz parte do projeto. É apenas um exemplo feito para ilustrar o destructuring

const obj = {
    key1: 10,
    key2: 20
}

//aqui o jeito "normal"
const key1 = obj.key1
const key2 = obj.key2


//aqui usando o destructuring assignament
const {key1,key2} = obj