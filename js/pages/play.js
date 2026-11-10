import { playground } from "../data/playground.js";
import { renderPlayground } from "../components/playground.js";
export function initPage() {
  return renderPlayground(document.getElementById("pg-root"), playground, {});
}
