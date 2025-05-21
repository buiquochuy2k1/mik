//  █████╗ ███╗   ██╗████████╗██╗
// ██╔══██╗████╗  ██║╚══██╔══╝██║
// ███████║██╔██╗ ██║   ██║   ██║
// ██╔══██║██║╚██╗██║   ██║   ██║
// ██║  ██║██║ ╚████║   ██║   ██║
// ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝

document.onkeypress = function (event) {
  event = event || window.event;
  return keyFunction(event);
};
document.onmousedown = function (event) {
  event = event || window.event;
  return keyFunction(event);
};
document.onkeydown = function (event) {
  event = event || window.event;
  return keyFunction(event);
};

//Disable right click script
var message = 'Xin lỗi, chức năng này đã bị tắt, hãy nhắn tin cho tôi nếu bạn cần source code';

function clickIE() {
  if (document.all) {
    message;
    alert(message);
    return false;
  }
}
function clickNS(e) {
  if (document.layers || (document.getElementById && !document.all)) {
    if (e.which == 2 || e.which == 3) {
      message;
      alert(message);
      return false;
    }
  }
}
if (document.layers) {
  document.captureEvents(Event.MOUSEDOWN);
  document.onmousedown = clickNS;
} else {
  document.onmouseup = clickNS;
  document.oncontextmenu = clickIE;
}
document.oncontextmenu = new Function('return false');

function keyFunction(event) {
  //"F12" key
  if (event.keyCode == 123) {
    return false;
  }
  //"I" key
  if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
    return false;
  }
  //"J" key
  if (event.ctrlKey && event.shiftKey && event.keyCode == 74) {
    return false;
  }
  //"S" key
  if (event.ctrlKey && event.keyCode == 83) {
    return false;
  }
  //"U" key
  if (event.ctrlKey && event.keyCode == 85) {
    return false;
  }
  //F5
  // if (event.keyCode == 116) {
  //   return false;
  // }
}

document.querySelectorAll('img').forEach(function (img) {
  img.addEventListener('dragstart', function (e) {
    e.preventDefault(); // Ngừng hành động kéo
  });

  img.addEventListener('drag', function (e) {
    e.preventDefault(); // Ngừng hành động kéo
  });

  img.addEventListener('dragend', function (e) {
    e.preventDefault(); // Ngừng hành động kéo
  });
});
