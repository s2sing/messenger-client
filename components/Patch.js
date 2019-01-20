const http = require('http');
const fs = require('fs');

function Patch() {
}

Patch.prototype.versionCheck = function () {
  $.ajax({url: Global.host + Global.patchUrl})
    .done((res) => {
      if (res.version !== Global.version) {
        res.files.forEach(function (file) {
          Patch.prototype.fileDownload(Global.host + res.repository + file, file);
        });
      }else{

      }
    });
}

Patch.prototype.fileDownload = function (url, file) {
  http.get(url, function (res) {
    const fileSize = res.headers['content-length'];
    res.setEncoding('binary');

    let a = "";
    res.on('data', function (chunk) {
      a += chunk;
    });

    res.on('end', function () {
      fs.writeFile(Global.clientRoot + file, a, 'binary', function (err) {
        if (err) throw err;
        document.location.reload(true);
      });
    });
  });
}