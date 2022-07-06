import boom from "../sounds/boom.wav";
import clap from "../sounds/clap.wav";
import hi_hat from "../sounds/hi_hat.wav";
import kick from "../sounds/kick.wav";
import open_hat from "../sounds/open_hat.wav";
import ride from "../sounds/ride.wav";
import snare from "../sounds/snare.wav";
import tink from "../sounds/tink.wav";
import tom from "../sounds/tom.wav";

let app_mode = "";
let record_mode = "";
let playback_mode = "";
var start = {};
let record = [];
let playback = [];

//start button chg
const start_game_btn = document.getElementById("start_game");
start_game_btn.addEventListener("click", () => {
  if (app_mode === "game") {
    start_game_btn.textContent = "Start Game";
    app_mode = "";
  } else {
    start_game_btn.textContent = "End Game";
    app_mode = "game";
  }
});

//record button chg text
const record_btn = document.getElementById("record");
record_btn.addEventListener("click", () => {
  if (record_mode === "record") {
    record_btn.textContent = "Record";
    record_mode = "";
    console.log("test2");
  } else {
    record_btn.textContent = "End record";
    record_mode = "record";
    console.log("test");
    record.length = 0;
    start = Date.now();
  }

  console.log(record);
});

//playback btn
const playback_btn = document.getElementById("playback");
playback_btn.addEventListener("click", () => {
  if (app_mode === "playback") {
    playback_btn.textContent = "Playback";
    app_mode = "";
  } else {
    playback_btn.textContent = "Stop Playback";
    app_mode = "playback";

    record.forEach((k) => {
      console.log(k.key);
      key_config.forEach((m) => {
        if (k.key === m.key) {
          console.log(m.sound);
          setTimeout(() => {
            const audio = new Audio(m.sound);
            audio.play();
          }, k.duration);
        }
      });
    });
  }
});
const key_config = [
  { id: "boom", key: "a", sound: boom },
  { id: "clap", key: "s", sound: clap },
  { id: "hi_hat", key: "d", sound: hi_hat },
  { id: "kick", key: "f", sound: kick },
  { id: "open_hat", key: "g", sound: open_hat },
  { id: "ride", key: "h", sound: ride },
  { id: "snare", key: "j", sound: snare },
  { id: "tim", key: "k", sound: tink },
  { id: "tom", key: "l", sound: tom },
];

const beats = ["f", "d", "f", "d", "f", "f", "d", "f", "d"];
const padding_count = 3;
const empty_array = Array(padding_count).fill("");

//  <div class="card sequence-card">A</div>
const targets = document.getElementById("targets");
let new_array = [...empty_array, ...beats, ...empty_array];

// Game Mode
let current_index = 0;
let score = 0;

const getActualPosition = () => current_index + padding_count;

const score_element = document.getElementById("score");
const updateTargets = () => {
  targets.innerHTML = "";
  const computed_array = new_array.slice(
    current_index,
    getActualPosition() + 4
  );
  console.log(computed_array);
  computed_array.forEach((item, index) => {
    const target_div = document.createElement("div");
    target_div.setAttribute(
      "class",
      `card sequence-card ${index === 3 ? "active" : ""}`
    );
    target_div.textContent = item;
    targets.appendChild(target_div);
  });
  score_element.textContent = score;
};
updateTargets();

/**
 * <div id="boom" class="card control">
     <div class="label container">A</div>
     <div class="key container">Boom</div>
   </div>
 */

const parent = document.getElementById("controls");
key_config.forEach((k) => {
  //     { id: "boom", key: "a", sound: boom },
  const control_div = document.createElement("div");
  control_div.setAttribute("id", k.id);
  control_div.setAttribute("class", "card control");

  const control_label = document.createElement("div");
  control_label.setAttribute("class", "label container");
  control_label.textContent = k.key;

  const control_key = document.createElement("div");
  control_key.setAttribute("class", "key container");
  control_key.textContent = k.id;

  control_div.appendChild(control_label);
  control_div.appendChild(control_key);
  parent.appendChild(control_div);

  control_div.addEventListener("click", (e) => {
    const audio = new Audio(k.sound);
    audio.play();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key.toLocaleLowerCase() === k.key) {
      const audio = new Audio(k.sound);
      audio.play();
    }

    //Score
    //If user key matches current target key then we increment
    if (app_mode === "game" && new_array[getActualPosition()] === e.key) {
      current_index++;
      score++;
    }

    if (record_mode === "record") {
      record.push({
        key: e.key,
        duration: Date.now() - start,
      });
    }

    if (getActualPosition() >= new_array.length - padding_count - 1) {
    }

    updateTargets();
  });
});
