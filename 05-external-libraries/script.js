const img = document.querySelector(".food");
const msg = document.getElementById("messageBox");

gsap.from(".ChopBard h1", {
  duration: 1.5,
  opacity: 0,
  y: -50,
  ease: "power3.out"
});

gsap.from(".ChopBard p", {
  duration: 1,
  opacity: 0,
  y: 30,
  delay: 0.5,
  ease: "power2.out"
});

gsap.from(".food", {
  duration: 1.2,
  scale: 0.8,
  opacity: 0,
  delay: 1,
  ease: "elastic.out(1, 0.6)"
});

gsap.from(".menubar a", {
  duration: 0.8,
  opacity: 0,
  y: -20,
  stagger: 0.2,
  delay: 1.2,
  ease: "power2.out"
});

img.addEventListener("click", () => {
    msg.classList.remove("hidden");

    gsap.fromTo(
        msg,
        {opacity: 0, scale: 0.8},
        {opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)"}

    );

})

gsap.registerPlugin(ScrambleTextPlugin);

const sT = gsap.utils.toArray('.scramble');

sT.forEach(item => {
  let tween = gsap.to(item, {duration: 1, scrambleText:{ text:"-/#$%>", chars:"<&!§8("}, paused: true});
  item.addEventListener('mouseenter', () => {
    tween.play();
  });
  item.addEventListener("mouseleave", () => {
    tween.reverse();
  });
});