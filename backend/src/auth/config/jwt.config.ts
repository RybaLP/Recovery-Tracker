import { registerAs } from "@nestjs/config";
export default registerAs('jwt', ()=>{
    return{
        secret : "mysupersecret",
        audience : "eloasd",
        issuer : "dsadsa",
        accessTokenTtl : "3600"
    };
})