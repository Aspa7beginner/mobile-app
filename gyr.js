let navLogs = "";
self.navigator.permissions.query({name: 'gyroscope'})
.then(function(result){
    navLogs+="innav---";
    if(result.state === 'denied'){
        navLogs += "inerror:"+error.name+"---";
        if (error.name === 'NotAllowedError' || 'NotReadableError') {
            navLogs +='-Permission to access sensor was denied.<br> or ::--->'+ 
             'Cannot connect to the sensor.<br>';
            alert('---Permission to access sensor was denied');
        }
    }
    else{
        try{
            navLogs+="intry-";
            self.gyroscope = new Gyroscope({frequency: 20});
            self.gyroscope.addEventListener('reading', function(e){
                navLogs += e;
                navLogs += self.gyroscope.x + "";
            });
            self.gyroscope.start();
            navLogs+="afterstart-";
        }catch(error){
            navLogs+="inerrorconstruction-";
            if (error.name === 'SecurityError') {
                navLogs+='---Sensor construction was blocked by the Permissions Policy.<br>';
            } else if (error.name === 'ReferenceError') {
                navLogs+='---Sensor is not supported by the User Agent.<br>';
            } else {
                navLogs+= "---Other error: "+ error.name + "<br>";
            }
        }
    }
    self.postMessage(navLogs);

});

