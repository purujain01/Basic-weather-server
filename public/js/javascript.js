
const formelement=document.querySelector('form')
const search=document.querySelector('input')
const m1=document.querySelector('#ps')
const m2=document.querySelector('#pn')

formelement.addEventListener('submit',(e)=>{
    m1.textContent = 'Loading...'
    m2.textContent = ''
    e.preventDefault()
    const value=search.value
    fetch('/weather?address='+value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
             m1.textContent = data.error
        }
        else{
            m1.textContent = data.forecast
            m2.textContent = data.location
        }
    })
})

})