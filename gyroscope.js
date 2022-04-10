let state = {active: false,
            reading: 0,
            logs: "Gyroscope -----------------"};

let userStopRequest = 'false' || this.onmessage;

navigator.permissions.query({name: 'gyroscope', userStopRequest: true})
.then(function(result){
    state.logs += "ingranted";
    if(result.state === 'granted' && !this.onmessage){
        try{
            gyroscope = new Gyroscope({frequency: 1000});
            gyroscope.addEventListener('reading', function(e){
                state.logs += e;
                state.reading = e;
            });
            gyroscope.start();
            state.active = true;
        }catch(error){
                if (error.name === 'SecurityError') {
                    state.logs+='Sensor construction was blocked by the Permissions Policy.<br>';
                } else if (error.name === 'ReferenceError') {
                    state.logs+='Sensor is not supported by the User Agent.<br>';
                } else {
                    state.logs+= "Other error: "+ error.name + "<br>";
                }
        }
    }
    else{
        state.logs += "inerror";
        if (error.name === 'NotAllowedError' || 'NotReadableError') {
            state.logs +='Permission to access sensor was denied.<br> or ::--->  Cannot connect to the sensor.<br>';
            alert('Permission to access sensor was denied');
        } 
        if (this.onmessage){
            console.log(this.onmessage);
            gyroscope.stop();
        }
    }
});
state.logs += "not at all in granted";
this.postMessage(state);