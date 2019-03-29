
export default function demo(Library) {

  let toggleButton = document.getElementById('toggle');
  let cancelButton = document.getElementById('cancel');
  let barArea = document.getElementById('bar-area');
  let result = document.getElementById('result');
  let pre = document.getElementById('pre');

  let onUpdate = (params) => {
    barArea.style.transform = `translateX(${params.value * 100}%)`;
    result.innerHTML = `<span style='display: inline-block;min-width: 50px;'>${params.value}</span> ${params.motion}`;
    pre.innerHTML = JSON.stringify(params, null, 2);
  };
  let onDone = (params) => {
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
    onReverse: params => console.log('onReverse', params),
  };

  let fuzzy = Library({
    ...config,
    duration: 1000,
  });

  console.log(fuzzy.getConfig());

  toggleButton.addEventListener('click', e => {
    fuzzy.toggle();
  });

  cancelButton.addEventListener('click', e => {
    fuzzy.cancel();
  });
}
