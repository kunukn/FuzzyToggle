let root = typeof window !== 'undefined'
  ? window
  : global;

let rAF = root.requestAnimationFrame
  ? requestAnimationFrame.bind(root)
  : function (callback) {
    setTimeout(callback, 16)
  };

let getNow = () => new Date().getTime();

class FuzzyToggle(){

  constructor({update,complete duration = 300} = {}){
    this.update = update;
    this.complete = complete;
    this.duration = duration;
  }

  
}

function FuzzyToggle({update,complete duration = 300} = {}) {

  var prevRange;
  var cancelled = false;
  var startTime;

  var attrs = args || {};

  var update = attrs.update;
  var complete = attrs.complete;
  var duration = attrs.duration != null
    ? + (attrs.duration)
    : 300;
  var ensureLast = attrs.ensureLast != null
    ? attrs.ensureLast
    : true;

  function getCurrent(startTime) {
    var now = getNow();
    var elapsedTime = now - startTime;
    return {
      startTime: startTime,
      now: now,
      elapsedTime: elapsedTime,
      range: Math.min(elapsedTime / duration, 1)
    };
  }

  this.play = function play() {
    if (cancelled) 
      return;
    
    var current = getCurrent(startTime);

    if (current.elapsedTime >= duration) {
      ensureLast && prevRange !== current.range && update && update(1);
      complete && complete(current);
    } else {
      update && update(current.range);
      prevRange = current.range;
      rAF(play);
    }
  }

  this.startTime = getNow();

  if (duration > 0) {
    update && update(0);
    rAF(play);
  }

  this.cancel = function cancel(callback) {
    cancelled = true;
    callback && callback(getCurrent(startTime));
  }
};

export default FuzzyToggle;
