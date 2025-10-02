const btn = document.getElementById("homebtn");

gsap.registerPlugin(ScrambleTextPlugin);

const item = document.querySelector(".scramble");


const tween = gsap.to(item, {
  duration: 1.5,
  scrambleText: {
    text: "WORK IN PROGRESS , USE YOUR IMAGINATION FOR NOW",
    chars: "<>#%&/!?$*....LOVE",
    revealDelay: 1
  },
  paused: true
});


item.addEventListener("mouseenter", () => tween.play());
item.addEventListener("mouseleave", () => tween.reverse());


btn.addEventListener("click", () => {
  window.location.href = "index.html";
});