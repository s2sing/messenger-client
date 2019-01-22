function WaitingRoom() {
}

WaitingRoom.prototype.render = function (dom) {
  WaitingRoom.prototype.connectToWaitingRoom()
    .then(() => {
      let html = "";
      html += `<div style="padding:60px 30px;">`;
      html += `어서오십시오.`;
      html += `</div>`;

      dom.innerHTML = html;
    })
    .catch((msg) => {
      alert(msg);
    });
}

WaitingRoom.prototype.connectToWaitingRoom = function () {
  return new Promise((resolve, reject) => {
    var client = new WebSocket('ws://localhost:3000/waitingRoom');

    client.onerror = function () {
      reject("데이터 수신 오류");
    };

    client.onopen = function () {
      console.log('WebSocket Client Connected');

      if (client.readyState === client.OPEN) {
        client.send("데이터요청");
      }
    };

    client.onclose = function () {
      reject("소켓 종료");
    };

    client.onmessage = function (e) {
      resolve("새로고침");
    };
  });
}