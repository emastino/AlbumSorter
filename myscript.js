// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-2.2.0.js'; // Check https://jquery.com/ for the current version
// document.getElementsByTagName('head')[0].appendChild(script);


const list = document.querySelector('.sortable-list');
let draggingItem = null;
list.addEventListener('dragstart', (e) => {
    draggingItem = e.target;
    e.target.classList.add('dragging');
});


list.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.sortable-item')
        .forEach(item => item.classList.remove('over'));
    draggingItem = null;
});


list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingOverItem = getDragAfterElement(list, e.clientY);
    document.querySelectorAll('.sortable-item').forEach
        (item => item.classList.remove('over'));
    if (draggingOverItem) {
        draggingOverItem.classList.add('over');
        list.insertBefore(draggingItem, draggingOverItem);
    } else {
        list.appendChild(draggingItem); 
    }
});


function getDragAfterElement(container, y) {
    
    const draggableElements = [...container.querySelectorAll
        ('.sortable-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

var audio = document.getElementById("audioPlayer");
// var audioVolume = audio.volume;
audio.volume = 0.25;

audioPlayer();
function audioPlayer(){
    var currentSong = 0;
    $("#audioPlayer")[0].src = $("#playlist li a")[0];

    $("#playlist li a").click(
        function(e){
        e.preventDefault();
        $("#audioPlayer")[0].src = this;
        $("#audioPlayer")[0].play();
        $("#playlist li").removeClass("current-song");
        currentSong = $(this).parent().index();
        $(this).parent().addClass("current-song");
        }
    );

    $("#audioPlayer")[0].addEventListener("ended", function(){
        // alert($("#playlist li a").eq(currentSong).text());
        // if($("#playlist li a").eq(currentSong).text() == $("#playlist li a").eq(currentSong).text())
        
        currentSong = $("#playlist li.current-song").index();

        currentSong++;

        // alert($(this).parent().index() + 1);
        if(currentSong == $("#playlist li a").length){
            currentSong = 0;
        }
    
            

        $("#playlist li").removeClass("current-song");
        // $("#playlist li:eq"+currentSong+")").addClass("current-song");
        $("#playlist li").eq(currentSong).addClass("current-song");
        $("#audioPlayer")[0].src = $("#playlist li a")[currentSong].href;
        $("#audioPlayer")[0].play();
        }
    );

    $("#forward-button").click(
        function(e){
        // alert($("#playlist li a").eq(currentSong).text());
        // if($("#playlist li a").eq(currentSong).text() == $("#playlist li a").eq(currentSong).text())
        
        currentSong = $("#playlist li.current-song").index();

        currentSong++;

        // alert($(this).parent().index() + 1);
        if(currentSong == $("#playlist li a").length){
            currentSong = 0;
        }
    
            

        $("#playlist li").removeClass("current-song");
        // $("#playlist li:eq"+currentSong+")").addClass("current-song");
        $("#playlist li").eq(currentSong).addClass("current-song");
        $("#audioPlayer")[0].src = $("#playlist li a")[currentSong].href;
        $("#audioPlayer")[0].play();
        }
    );

    $("#back-button").click(
        function(e){
        // alert($("#playlist li a").eq(currentSong).text());
        // if($("#playlist li a").eq(currentSong).text() == $("#playlist li a").eq(currentSong).text())
        
        currentSong = $("#playlist li.current-song").index();

        currentSong--;

        // alert($(this).parent().index() + 1);
        if(currentSong == -1){
            currentSong = $("#playlist li a").length-1;
        }
    
            

        $("#playlist li").removeClass("current-song");
        // $("#playlist li:eq"+currentSong+")").addClass("current-song");
        $("#playlist li").eq(currentSong).addClass("current-song");
        $("#audioPlayer")[0].src = $("#playlist li a")[currentSong].href;
        $("#audioPlayer")[0].play();
        }
    );
}