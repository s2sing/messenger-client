function Login() {
}

Login.prototype.render = function (dom) {
  Global.dom = dom;

  let html = "";
  html += `<div style="padding:60px 30px;">`;
  html += `<form id="loginForm">`;
  html += `<div class="form-group">`;
  html += `<label for="username">아이디</label>`;
  html += `<div>`;
  html += `<input type="text" class="form-control" id="username" name="username" placeholder="아이디를 입력하세요">`;
  html += `</div>`;
  html += `</div>`;
  html += `<div class="form-group">`;
  html += `<label for="password">비밀번호</label>`;
  html += `<div>`;
  html += `<input type="password" class="form-control" id="password" name="password" placeholder="비밀번호를 입력하세요">`;
  html += `</div>`;
  html += `</div>`;
  html += `<div style="width:80px;margin:0 auto;">`;
  html += `<button type="button" class="cmd-button" style="margin-top: 20px;" onclick="Login.prototype.submit();">로그인</button>`;
  html += `</div>`;
  html += `</form>`;
  html += `</div>`;

  dom.innerHTML = html;
}

Login.prototype.submit = function () {
  Patch.prototype.versionUpdate().then((result) => {
    $.ajax({
      url: Global.host + '/login',
      method: 'post',
      data: $("#loginForm").serialize()
    }).done((res) => {
      if (res.result) {
        WaitingRoom.prototype.render(Global.dom);
      }
    });
  }).catch((msg) => {
    alert(msg);
  });
}
