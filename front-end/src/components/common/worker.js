console.log('>>>dentro do worker<<<<');

self.addEventListener(
    "message",
    function(e) {
      self.postMessage(e.data);
    },
    false
  );