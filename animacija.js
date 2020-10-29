window.addEventListener("load", () => {

    const sounds = document.querySelectorAll(".sound");
    const pads = document.querySelectorAll(".pads div");
    const visual = document.querySelector(".visual");
    const colors = [
        "#60d394",
        "#d36066",
        "#c060d3",
        "#d3d160",
        "#6860d3",
        "#60b2d3"
    ];

    pads.forEach((pad, index) => {
        pad.addEventListener("click", function(){
            sounds[index].currentTime = 0; //vraca sound na pocetak!!!
            sounds[index].play();


            createBubbles(index); //problem nagomilavanja objekata, tj. DIV-ova :/ A ako obrisem, nema animacije...
        });
    });

    //make bubbles
    const createBubbles = (index) => {
        //visual.empty();
        const bubble = document.createElement("div");
        visual.appendChild(bubble);
        bubble.style.backgroundColor = colors[index];
        bubble.style.animation = "jump 1s ease";
    }
});

