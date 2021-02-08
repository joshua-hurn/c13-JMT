$(document).ready(function () {
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate'];
    let sentenceCounter = 0;
    let letterCounter = 0;
    let highlighterPosition = 0;
    let numberOfMistakes = 0;
    let gameOn = false;
    let startTime = null;

    $("#keyboard-upper-container").hide();
    $("#sentence").text(sentences[sentenceCounter])
    $("#target-letter").text(sentences[sentenceCounter][letterCounter])

    $(document).keydown(function (e) {
        if (!gameOn) {
            gameOn = true;
            startTime = Date.now();
        }

        const eventKey = e.key;

        if (eventKey == "Shift") {
            $("#keyboard-lower-container").hide();
            $("#keyboard-upper-container").show();
        } else {
            $("#" + eventKey.charCodeAt(0)).css("background-color", "yellow");

            if (eventKey == sentences[sentenceCounter][letterCounter]) {
                $("#feedback").append("<span class='glyphicon glyphicon-ok'></span>");
            } else {
                $("#feedback").append("<span class='glyphicon glyphicon-remove'></span>");
                numberOfMistakes++
            }

            letterCounter++;

            if (letterCounter === sentences[sentenceCounter].length) {
                sentenceCounter++;

                if (sentenceCounter == sentences.length) {
                    const endTime = Date.now();
                    let playTime = endTime - startTime;
                    let minutes = playTime / 60000;
                    const WPM = 54 / minutes - 2 * numberOfMistakes;
                    $("#prompt-container").append(Math.floor(WPM));

                    setTimeout(function() {
                        let response = confirm("Would you like to play again?");
                        if (response == true) {
                            location.reload();
                        }
                    }, 3000);
                } else {
                    letterCounter = 0;
                    highlighterPosition = 0;
                    $("#feedback").empty();
                    $("#sentence").text(sentences[sentenceCounter])
                    $("#target-letter").text(sentences[sentenceCounter][letterCounter]);
                }
            } else {
                $("#target-letter").text(sentences[sentenceCounter][letterCounter]);
                highlighterPosition += 19
                $("#yellow-block").css("left", highlighterPosition + "px")
            }
        }
    });

    $(document).keyup(function (e) {
        const eventKey = e.key;

        if (e.key == "Shift") {
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();
        } else {
            $("#" + eventKey.charCodeAt(0)).css("background-color", "#F5F5F5");
        }
    });
});