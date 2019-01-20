function Patch() {
}

Patch.http = require('http');
Patch.fs = require('fs');

// ====================
// 클라이언트 버전 체크
// ====================
Patch.prototype.versionCheck = function () {
  $.ajax({url: Global.host + Global.patchUrl})
    .done((res) => {
      if (res.version !== Global.version) {
        res.files.forEach(function (file) {
          Patch.prototype.fileDownload(Global.host + res.repository + file, file, res.version);
        });
      }
    })
    .fail((res) => {
      alert("서버와 연결에 실패하였습니다.");
    });
}

// ====================
// 클라이언트 다운로드
// ====================
Patch.prototype.fileDownload = function (url, file, version) {
  Patch.http.get(url, function (res) {
    const {statusCode} = res;

    if (statusCode === 200) {
      res.setEncoding('binary');

      let a = "";
      res.on('data', function (chunk) {
        a += chunk;
      });

      res.on('end', function () {
        Patch.fs.writeFile(Global.clientRoot + file, a, 'binary', function (err) {
          if (err) throw err;
          Patch.fs.writeFileSync(Global.clientRoot + 'version', version);
          alert("클라이언트 버전이 업데이트 되었습니다.\n메신저를 다시 실행시켜 주시기 바랍니다.");
          nw.App.quit();
        });
      });
    }else{
      alert("업데이트 요청이 거부되었습니다.");
    }
  });
}
