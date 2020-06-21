```javascript
function* g{
    yield 1;
    yield 2;
    yield 3;
}

for(v of g()){
    console.log(v)
}

async function* ag(){
    let i=0;
    while(true){
        await sleep(1000);
        yield i++;
    }
}

for await(let v of ag()){
    console.log(v)
}
```

