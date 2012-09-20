/**
 * Created with JetBrains WebStorm.
 * User: liu
 * Date: 12-7-19
 * Time: 下午9:53
 * To change this template use File | Settings | File Templates.
 */
// a global object variable to store all game scope variable.
var audiogame = {};

$(function(){
    // get the references of the audio element.
    audiogame.melody = document.getElementById("melody");
    $(audiogame.melody).bind('ended', onMelodyEnded);
    audiogame.base = document.getElementById("base");
    audiogame.buttonOverSound = document.getElementById("buttonover");
    audiogame.buttonOverSound.volume = .3;
    audiogame.buttonActiveSound = document.getElementById("buttonactive");
    audiogame.buttonActiveSound.volume = .3;

    // listen the button event that links to the music button
    $("a.musicButton")
        .hover(function(){
            audiogame.buttonOverSound.currentTime = 0;
            audiogame.buttonOverSound.play();
        },function(){
            audiogame.buttonOverSound.pause();
        }) .click(function(){
            audiogame.buttonActiveSound.currentTime = 0;
            audiogame.buttonActiveSound.play();
        });

    // listen the button event that links to #game
    $("a[href='#game']")
        .click(function(){
            startGame();
        });

});
function playMusic()
{
    // play both the melody and base
    audiogame.melody.play();
    audiogame.base.play();
}

function startGame()
{
    // starting game
    var date = new Date();
    audiogame.startingTime = date.getTime();
    setTimeout(playMusic, 3550);
}

// show game over scene on melody ended.
function onMelodyEnded()
{
    console.log('song ended');
    console.log('success percent: ',audiogame.totalSuccessCount / audiogame.totalDotsCount * 100 + '%');
}