export const RUN_CMD = 'RUN_CMD';
export const PRINT = 'PRINT';

export function runCmd(cmd) {
  return {
    type: RUN_CMD,
    cmd: cmd,
  };
}

export function print(data) {
  return {
    type: PRINT,
    data: data,
  };
}
