var util = require('util') ;
var exec = require('child_process').exec;

exec("chcp 437");

var enableProfile=function(intfName, ssid, p){
  console.log("enable static configuration at ", ssid, " as ", p)
  var cmd = 'netsh interface ip set address name="%s" static %s %s %s'
  cmd = util.format(cmd, intfName, p.ip, p.mask, p.gateway);
  console.log(cmd);
  exec(cmd, function(error, stdout, stderr){
    console.log(stdout);
  });

  cmd = 'netsh interface ip set dnsserver name="%s" static %s primary'
  cmd = util.format(cmd, intfName, p.dns)
  console.log(cmd);
  exec(cmd, function(error, stdout, stderr){
    console.log(stdout);
  });
}

var enableDHCP=function(intfName, ssid){
  console.log("enable dhcp at ", ssid)
  var cmd = 'netsh interface ip set address name="%s" source=dhcp';
  cmd = util.format(cmd, intfName);
  console.log(cmd);
  exec(cmd, function(error,stdout,stderr){
    console.log(stdout);
  });
}

exec('netsh wlan show interfaces', function(error, stdout, stderr) {
  var lines = stdout.split("\r\n");
  var ssid;
  var intfName;
  lines.forEach(function (item, index, array) {
    var kvs = item.trim().split(":");
    if(kvs.length == 2){
      var key = kvs[0].trim();
      var value = kvs[1].trim();
      if(key == "SSID"){
        ssid = value;
      }else if (key === "Name"){
        intfName = value;
      }
    }
  });
  console.log("get ssid", ssid, "get intf", intfName);

  var profiles = require('./profiles');
  var profile = profiles[ssid];
  if(profile){
    enableProfile(intfName, ssid, profile);
  }else{
    enableDHCP(intfName, ssid);
  }
});




