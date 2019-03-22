import FuzzyToggle from 'src/FuzzyToggle';

var toggle = new FuzzyToggle();

var log = console.log.bind(console);

function onComplete(arg){
  log(arg);
  log('** example done');
  log('**  example start 2');
  toggle.play({ duration: 300, update: log, complete: onComplete2 });  
}

function onComplete2(arg){
  log(arg);
  log('** example done 2');
}

log('**  example start');
toggle.play({ duration: 500, update: log, complete: onComplete });

//setTimeout(() => cancel(range => log('cancelled', range)), 300);
