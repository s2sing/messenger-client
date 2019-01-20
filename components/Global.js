function Global() {
}

Global.fs = require('fs');

Global.clientRoot = nw.App.startPath + "\\";

Global.host = 'http://localhost:3000';
Global.patchUrl = '/versionCheck';

Global.version = Global.fs.readFileSync(Global.clientRoot + 'version', 'utf-8');

// =======================
// 어플리케이션 초기화
// =======================
Global.prototype.init = function(){
  const win = nw.Window.get();
  const width = 412;
  const height = 500;
  win.resizeTo(width, height);
  //win.moveTo(screen.width - width, 0);
  win.setPosition('mouse');
}
Global.prototype.init();
