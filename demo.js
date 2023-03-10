var jwt = require('jsonwebtoken')
var fs = require('fs')

// var privateKey = fs.readFileSync('./key/private.pem')

// var token = jwt.sign({ money: 9999 }, privateKey, { algorithm: 'RS256' })

var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb25leSI6OTk5OSwiaWF0IjoxNjc4NDQxNjI4fQ.DA5PqdriucdbZ1HPqovvIIuK5ZI-H4ta7QdQnyoRFt8fIGW-B0dAoneip-mnYcnZPcRUM5ktKAsmetf8UUUf3JMSB-QaSIWhh8JPSFlLzUt0i0EzsBRcmGXTygnLW47V5EQnSrN6SEetoQTAlDC_RKk72Tg1J9w6kRDsceMmnbipT_DNt60lj58W7ktWpTYbBxA8LMowogTmQladEAHt0uVjmRtbJOAh_ylzcIcFzBxjVQDPbpQ1z9bTZILYcgXMaatNwqFjogFRd3Se_X9bL7C6lUz9FwkGv_1k8qOq0dW3d2d45mKUbi9OomP-v3VCtOiZPo_d6YElD_dUTdj30g'

var cert = fs.readFileSync('./key/publickey.crt')
jwt.verify(token,cert, function(err,data){
    if(err) return console.log(err);
    console.log(data)
    return
})