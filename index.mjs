let OpenAI = function({apiKey} = {}) {
  let openai = {
    create: async ({...options}) => {
      return ( await fetch( "https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey
        },
        body: JSON.stringify( {
          ...options,
        } )
      } ) )
      .json();
    },
  };
  return openai;
};
// 247 chars: let OpenAI=function({apiKey:a}={}){return{create:async({...b})=>(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+a},body:JSON.stringify({...b})})).json()}};

export default (
// (typeof module !== "object" ? {} : module).exports = (
  OpenAI
);
