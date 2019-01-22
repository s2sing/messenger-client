$(function () {
  $(".version").html('v' + Global.version);

  const win = nw.Window.get();

  $("#btn-maximize").on('click', function () {
    win.maximize();
  });

  $("#btn-minimize").on('click', function () {
    win.minimize();
  });

  $("#btn-close").on('click', function () {
    win.hide();
    nw.App.quit();
  });

  win.on('restore', function(){
    $("#btn-maximize").unbind('click');

    $("#btn-maximize").on('click', function () {
      win.maximize();
    });
  });

  win.on('maximize', function(){
    $("#btn-maximize").unbind('click');

    $("#btn-maximize").on('click', function () {
      win.unmaximize();
    });
  });
});
