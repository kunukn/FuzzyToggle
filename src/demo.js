let easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1);
let elasticInOut = t =>
  t < 0.5
    ? 0.5 * Math.sin(((+13.0 * Math.PI) / 2) * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
    : 0.5 * Math.sin(((-13.0 * Math.PI) / 2) * (2.0 * t - 1.0 + 1.0)) * Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;

export default function demo(Library) {
  let toggleButton = document.getElementById('toggle');
  let cancelButton = document.getElementById('cancel');
  let barArea = document.getElementById('bar-area');
  let result = document.getElementById('result');
  let pre = document.getElementById('pre');

  let onUpdate = params => {
    let progress = easeInOutCubic(params.value);
    barArea.style.transform = `translateX(${progress * 100}%)`;
    result.innerHTML = `<span style='display: inline-block;min-width: 50px;'>${params.value}</span> ${params.motion}`;
    pre.innerHTML = JSON.stringify(params, null, 2);
  };
  let onDone = params => {
    result.innerHTML = `<span style='display: inline-block;min-width: 50px;'>${params.value}</span> ${params.motion}`;
    pre.innerHTML = JSON.stringify(params, null, 2);
  };
  let onCancel = params => {
    onUpdate(params);
  };

  let config = {
    //   trace: console.log.bind(console),
    onUpdate,
    onDone,
    onCancel,
    onReverse: params => console.log('onReverse', params)
  };

  let fuzzy = Library({
    ...config,
    duration: 1000
  });

  console.log(fuzzy.getConfig());

  toggleButton.addEventListener('click', e => {
    fuzzy.toggle();
  });

  cancelButton.addEventListener('click', e => {
    fuzzy.cancel();
  });
}
