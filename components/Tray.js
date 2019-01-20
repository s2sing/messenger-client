const tray = new nw.Tray({title: 'Messenger', icon: 'resources/images/icon.png'});
const trayMenu = new nw.Menu();

trayMenu.append(new nw.MenuItem({label: '종료'}).on('click', function () {
  nw.App.quit();
}));
tray.menu = trayMenu;

tray.on('click', function () {
  nw.Window.get().show();
});
