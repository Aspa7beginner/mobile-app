let navLogs = "";
self.navigator.permissions.query({name: 'gyroscope', userStopRequest: true})
.then(function(result){
    navLogs+="in nav-";
    if(result.state === 'denied'){
        navLogs += "inerror-";
        if (error.name === 'NotAllowedError' || 'NotReadableError') {
            navLogs +='-Permission to access sensor was denied.<br> or ::--->'+ 
             'Cannot connect to the sensor.<br>';
            alert('-Permission to access sensor was denied');
        }
    }
    else{
        try{
            navLogs+="intry-";
            self.gyroscope = new Gyroscope({frequency: 20});
            while(self.onmessage !=='activate'){
                console.log("inhere");
                self.gyroscope.addEventListener('reading', function(e){ 
                    navLogs += e;
                    navLogs += self.gyroscope.x + "";
                    self.postMessage(navLogs);
                    sleep(1000);
                });
            }

            self.gyroscope.start();
            navLogs+="afterstart-";
        }catch(error){
            navLogs+="inerrorconstruction-";
            if (error.name === 'SecurityError') {
                navLogs+='-Sensor construction was blocked by the Permissions Policy.<br>';
            } else if (error.name === 'ReferenceError') {
                navLogs+='Sensor is not supported by the User Agent.<br>';
            } else {
                navLogs+= "-Other error: "+ error.name + "<br>";
            }
        }
    }
    self.postMessage(navLogs);

});

