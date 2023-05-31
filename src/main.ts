import { createPlayer } from "./player";

const app = document.getElementById("app") as HTMLDivElement;

const controller = createPlayer(app);
