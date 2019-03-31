// Support browser or node env
const root = typeof window !== 'undefined' ? window : global;
const rAF = root.requestAnimationFrame
  ? root.requestAnimationFrame.bind(root)
  : callback => root.setTimeout(callback, 16);
const cAF = root.cancelAnimationFrame ? root.cancelAnimationFrame.bind(root) : root.clearInterval.bind(root);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const sanitizeVal = value => clamp(Math.round((value + 0.00001) * 100) / 100, 0, 1); // https://stackoverflow.com/a/11832950/815507

const COLLAPSED = 'collapsed';
const EXPANDED = 'expanded';
const EXPANDING = 'expanding';
const COLLAPSING = 'collapsing';

const getNow = Date.now;

const defaultParams = {
  value: 0,
  duration: 300,
  trace: () => {}
};

let isMoving = motion => motion === EXPANDING || motion === COLLAPSING;
let isCollapsedOrCollapsing = motion => motion === COLLAPSED || motion === COLLAPSING;

let initiateStateAndConfig = (params = {}) => {
  let config = {
    ...defaultParams,
    ...params
  };
  config.duration = +config.duration;

  let state = {
    value: config.value === 1 ? 1 : 0,
    motion: config.value === 1 ? EXPANDED : COLLAPSED,
    cancelled: false,
    isRunning: false,
    startTime: 0
  };
  return [config, state];
};

function createToggle(params) {
  let [config, state] = initiateStateAndConfig(params);

  let getConfig = () => {
    config.trace('getConfig');

    let { duration, value } = config;

    return {
      duration,
      value
    };
  };

  let setConfig = params => {
    config.trace('setConfig');

    if (state.isRunning) return;

    let [updatedConfig, updatedState] = initiateStateAndConfig(params);

    config = updatedConfig;
    state = updatedState;

    return true;
  };

  let onDone = () => {
    config.trace('onDone');

    config.onDone && config.onDone({ value: state.value, motion: state.motion, hasReversed: state.hasReversed });
  };

  let onUpdate = () => {
    config.trace('onUpdate');

    config.onUpdate && config.onUpdate({ value: state.value, motion: state.motion });
  };

  let onCancel = () => {
    config.trace('onCancel');

    config.onCancel && config.onCancel({ value: state.value, motion: state.motion, hasReversed: state.hasReversed });
  };

  let onReverse = () => {
    config.trace('onReverse');

    config.onReverse && config.onReverse({ value: state.value, motion: state.motion });
  };

  let getUpdate = () => {
    let elapsedTime = getNow() - state.startTime;
    let value = elapsedTime / config.duration;

    value = sanitizeVal(isCollapsedOrCollapsing(state.motion) ? 1 - value : value);

    let result = {
      elapsedTime,
      prevValue: state.value,
      value
    };
    return result;
  };

  let run = () => {
    if (state.cancelled) return;

    let { value, prevValue, elapsedTime } = getUpdate();

    // update
    state.value = value;
    state.elapsedTime = elapsedTime;

    if (elapsedTime >= config.duration) {
      state.motion = isCollapsedOrCollapsing(state.motion) ? COLLAPSED : EXPANDED;
      state.isRunning = false;
      state.cAF = null;

      if (prevValue !== value) onUpdate();

      onDone();
    } else {
      onUpdate();
      state.cAF = rAF(run);
    }
  };

  let toggle = () => {
    config.trace('toggle');

    if (config.duration <= 0) return;

    state.cancelled = false;
    state.isRunning = true;
    state.hasReversed = isMoving(state.motion);
    state.motion = isCollapsedOrCollapsing(state.motion) ? EXPANDING : COLLAPSING;

    state.hasReversed && onReverse();

    let now = getNow();

    // update startTime
    if (state.hasReversed) {
      let { duration } = config;
      let { startTime } = state;
      let elapsedTime = Math.min(duration, now - startTime);
      let subtract = Math.max(0, duration - elapsedTime);
      state.startTime = now - subtract;
    } else {
      state.startTime = now;
    }

    onUpdate();
    state.cAF = rAF(run);
    return true;
  };

  let cancel = () => {
    config.trace('cancel');

    if (!state.isRunning) return;

    state.cAF && cAF(state.cAF);

    state.isRunning = false;

    let motion = state.motion === EXPANDING ? COLLAPSED : EXPANDED;

    state.motion = motion;
    state.value = motion === COLLAPSED ? 0 : 1;
    state.cancelled = true;

    onCancel();
    return true;
  };

  return { toggle, cancel };
}

export default createToggle;
