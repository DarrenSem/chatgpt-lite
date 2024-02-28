let OpenAI = function({apiKey} = {}) {
  let openai = {
    apiKey,
    create: async ({messages, ...options}) => {
      return ( await fetch( "https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey
        },
        body: JSON.stringify( {
          ...options,
          messages
        } )
      } ) )
      .json();
    },
  };
  return openai;
};
// 278 chars: let OpenAI=function({apiKey:a}={}){return{apiKey:a,create:async({messages:b,...c})=>(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+a},body:JSON.stringify({...c,messages:b})})).json()}};

export default (
// (typeof module !== "object" ? {} : module).exports = (
  OpenAI
);
