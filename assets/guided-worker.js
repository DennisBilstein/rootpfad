// Runs only inside a sandboxed opaque-origin frame. No app state or credentials.
addEventListener('message', async function(event){
  var input=event.data;
  if(!input || input.type!=='run')return;
  try{
    var execute=new Function('"use strict";\n'+input.code+'\nreturn typeof '+input.functionName+' === "function" ? '+input.functionName+' : null;');
    var fn=execute();
    if(!fn)throw Error('Die geforderte Funktion fehlt.');
    var results=[];
    for(var item of input.cases){
      var args=JSON.parse(JSON.stringify(item.args)),before=JSON.stringify(args);
      var value=await fn.apply(undefined,args);
      results.push({ok:JSON.stringify(value)===JSON.stringify(item.expected)&&JSON.stringify(args)===before,actual:String(JSON.stringify(value)).slice(0,300),expected:JSON.stringify(item.expected)});
    }
    postMessage({type:'result',results:results});
  }catch(error){postMessage({type:'result',error:String(error.message||error).slice(0,500)});}
});
