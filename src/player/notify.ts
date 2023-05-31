import { PlayerDOM } from "./dom";

export function createNotify(dom: PlayerDOM) {
  let clearMessage: number | null = null;

  const setMessage = (message?: string) => {
    if (clearMessage) {
      clearTimeout(clearMessage);
      clearMessage = null;
    }

    if (!message) {
      dom.notify.style.opacity = "0";
    } else {
      dom.notify.textContent = message;
      dom.notify.style.opacity = "1";
    }
  };

  const mount = (elem: HTMLElement, message: string | (() => string)) => {
    elem.addEventListener("mouseenter", () =>
      setMessage(typeof message === "function" ? message() : message)
    );
    elem.addEventListener("mouseleave", () => setMessage());
  };

  const setMessageTimeout = (message: string, time: number) => {
    setMessage(message);
    clearMessage = setTimeout(() => {
      clearMessage = null;
      setMessage();
    }, time);
  };

  return { setMessage, mount, setMessageTimeout };
}

export type Notify = ReturnType<typeof createNotify>;
