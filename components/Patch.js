function Patch() {
}

Patch.http = require('http');
Patch.fs = require('fs');

// ====================
// 클라이언트 버전 체크
// ====================
Patch.prototype.versionUpdate = function () {
  return new Promise((resolve, reject) => {
    $.ajax({url: Global.host + Global.patchUrl})
      .done((res) => {
        if (res.version !== Global.version) {
          const promises = res.files.map((file) => {
            return Patch.prototype.fileDownload(Global.host + res.repository + file, file, res.version);
          });

          Promise.all(promises).then((result) => {
            Patch.fs.writeFileSync(Global.clientRoot + 'version', res.version);
            alert("클라이언트 버전이 업데이트 되었습니다.\n메신저를 다시 실행시켜 주시기 바랍니다.");
            nw.App.quit();
          }).catch((msg) => {
            reject(msg);
          });
        } else {
          resolve("최신버전 입니다.");
        }
      })
      .fail((res) => {
        reject("서버와 연결에 실패하였습니다.");
      });
  });
}

// ====================
// 클라이언트 다운로드
// ====================
Patch.prototype.fileDownload = function (url, file, version) {
  return new Promise((resolve, reject) => {
    Patch.http.get(url, function (res) {
      const {statusCode} = res;

      if (statusCode === 200) {
        res.setEncoding('binary');

        let a = "";
        res.on('data', (chunk) => {
          a += chunk;
        });

        res.on('end', function () {
          Patch.fs.writeFile(Global.clientRoot + file, a, 'binary', (err) => {
            if (err) reject("파일 다운로드에 실패하였습니다.");
            resolve(true);
          });
        });
      } else {
        reject("파일 응답에 문제가 발견 되었습니다.");
      }
    }).on('error', (e) => {
      reject("파일 요청 도중 문제가 발생하였습니다.");
    });
  });
}
