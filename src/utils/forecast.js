const request=require('request')

const forecasting=(longitude,latitude,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=c7aa17330059205eaa0f210a15c904e0&units=metric'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Not connected to internet',undefined)
        }else if(body.message){
            callback('Incorrect url',undefined)
        }else{
            callback(undefined,body.main.temp+' '+ body.weather[0].description)
        }
    })

}

module.exports=forecasting