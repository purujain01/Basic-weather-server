const request=require('request')
const geocodes=(address,callback)=>{
    const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGV2MDEyMzQiLCJhIjoiY2tmZ3VkN255MDY4bzJ3cTl4eHdtMXJ4OSJ9.ygK1JF0vLq7_AgevEvJxNA&limit=1'
    request({url:geourl,json:true},(error,{body})=>{
        if(error){
            callback('Not connected to internet service',undefined)
        }else if(body.features.length === 0){
            callback('Location not found',undefined)
        }else{
            const longitude=body.features[0].center[0]
            const latitude=body.features[0].center[1]
            const location=body.features[0].place_name
            callback(undefined,{
                longitude,
                latitude,
                location
            })
        }
    })
}

module.exports = geocodes



