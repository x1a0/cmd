export const RUN_CMD = 'RUN_CMD';
export const LOAD_INIT_OUTPUT = 'LOAD_INIT_OUTPUT';

export function runCmd(cmd) {
  return {
    type: RUN_CMD,
    cmd: cmd
  };
}

export function loadInitOutput() {
  return {
    type: LOAD_INIT_OUTPUT
  };
}
