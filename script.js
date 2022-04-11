/*

Sensors Example
Mobile App Programming
Thanasis Papaioannou

*/
window.addEventListener("load", function (ev) {
    "use strict";
    var log = document.getElementById("log");
    // https://dvcs.w3.org/hg/dap/raw-file/tip/sensor-api/Overview.html
    window.addEventListener("devicetemperature", function (ev) {
        log.textContent += "devicetemperature " + ev.value + "\n";
    }, false);
    window.addEventListener("devicepressure", function (ev) {
        log.textContent += "devicepressure " + ev.value + "\n";
    }, false);
    window.addEventListener("devicelight", function (ev) {
        log.textContent += "devicelight " + ev.value + "\n";
        // toy tric
        log.style.color = "rgb(" + (255 - 2*ev.value) + ",0,0)";
        log.style.backgroundColor = "rgb(0,0," + (2*ev.value) + ")";
    }, false);
    window.addEventListener("deviceproximity", function (ev) {
        log.textContent += "deviceproximity " + ev.value + "\n";
        // toy tric
        if (ev.value < 3) navigator.vibrate([300, 100, 100]);
    }, false);
    window.addEventListener("devicenoise", function (ev) {
        log.textContent += "devicenoise " + ev.value + "\n";
    }, false);
    window.addEventListener("devicehumidity", function (ev) {
        log.textContent += "devicehumidity " + ev.value + "\n";
    }, false);

    //https://wiki.mozilla.org/Magnetic_Field_Events
    window.addEventListener("devicemagneticfield", function (ev) {
        log.textContent += "devicemagneticfield " + [ev.x, ev.y, ev.x]+ "\n";
    }, false);

    // https://dvcs.w3.org/hg/dap/raw-file/default/pressure/Overview.html
    window.addEventListener("atmpressure", function (ev) {
        log.textContent += "atmpressure " + ev.value + "\n";
    }, false);
    
    // https://dvcs.w3.org/hg/dap/raw-file/tip/humidity/Overview.html
    window.addEventListener("humidity", function (ev) {
        log.textContent += "humidity " + ev.value + "\n";
    }, false);
    
    // https://dvcs.w3.org/hg/dap/raw-file/tip/temperature/Overview.html
    window.addEventListener("temperature", function (ev) {
        log.textContent += "temperature " + [ev.f, ev.c, ev.k, ev.value] + "\n";
    }, false);
    
    // https://dvcs.w3.org/hg/dap/raw-file/tip/battery/Overview.html
    try {
        if (typeof navigator.getBattery === "function") {
            navigator.getBattery().then(function (battery) {
                log.textContent += "battery.level " + battery.level + "\n";
                log.textContent += "battery.charging " + battery.charging + "\n";
                log.textContent += "battery.chargeTime " + battery.chargeTime + "\n";
                log.textContent += "battery.dischargeTime " + battery.dischargeTime + "\n";
                battery.addEventListener("levelcharge", function (ev) {
                    log.textContent += "change battery.level " + battery.level + "\n";
                }, false);
            }).catch(function (err) {
                log.textContent += err.toString() + "\n";
            });
        } else {
            log.textContent += "navigator.getBattery is not existed\n";
        }
    } catch (ex) {
        log.textContent += ex.toString() + "\n";
    }
}, false);

window.addEventListener("compassneedscalibration", function(event) {
          log.textContent += 'Your compass needs calibrating! Wave your device in a figure-eight motion\n';
          event.preventDefault();
      }, true);

/*
  window.addEventListener("devicemotion", function(event) {
          // Process event.acceleration, event.accelerationIncludingGravity,
          // event.rotationRate and event.interval
	  //
	  log.textContent += 'acceleration:{x:'+event.acceleration.x+',y:'+event.acceleration.y+',z:'+event.acceleration.z+'}\n';
	  log.textContent += 'accelerationIncludingGravity:{x:'+event.accelerationIncludingGravity.x+',y:'+event.accelerationIncludingGravity.y+',z:'+event.accelerationIncludingGravity.z+'}\n';
	  log.textContent += 'rotationRate:{alpha:'+event.rotationRate.alpha+',beta:'+event.rotationRate.beta+',gamma:'+event.rotationRate.gamma+'}\n';
      }, true);
   */
