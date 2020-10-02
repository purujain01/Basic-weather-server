const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')


const app=express()
const viewpath=path.join(__dirname,'../templates/views')
const pathdir=path.join(__dirname,'../public')
const partialpath=path.join(__dirname,'../templates/partials')

app.set('views',viewpath)
app.set('view engine','hbs')
hbs.registerPartials(partialpath)

app.use(express.static(pathdir))


app.get('',(req,res)=>{
    res.render('index1',{
        title:'Weather',
        conclusion:'No'
    })
})


app.get('/about',(req,res)=>{
    res.render('index2',{
        title:'About Me',
        conclusion:'YES'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address must be provided'
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
           return res.send({
               error
           })
        }
        forecast(longitude,latitude,(error,forecastdata)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/about/*',(req,res)=>{
    res.render('404',{
        title:404,
        conclusion:'Not decided',
        errormessage:'No data related to about was found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        conclusion:'Not decided',
        errormessage:'404 page'
    })
})


app.listen(3000,()=>{
    console.log('Server started....')
})