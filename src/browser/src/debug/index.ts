import { VConsoleOptions } from "core/options.interface";
import VConsole from "vconsole";

export function useVConsole(opt?: VConsoleOptions) {
  const vConsole = new VConsole(opt);
  function destroy() {
    vConsole.destroy();
  }
  return {
    vConsole,
    destroy,
  };
}

