/////funcion que limpia las tablas cuando se hace una nueva busqueda
    function limpiarTabla(){
        $("#myTable").find("tr").remove();
        $("#myPLTable").find("tr").remove();
        $("audio").hide();
    }    
//    
/////funcion que hace busqueda en api con terminos q que sean artist = artista
    function buscarArtista(){
        limpiarTabla()
        var SearchTerm = $("#SearchTerm").val();
        let urlXD = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=" + SearchTerm;
        var myArray = []
        

        $.ajax({
            method:'GET',
            url:urlXD,
            success:function(response){
                myArray = response.data
                buildTable(myArray)
                console.log(myArray)
            }
        })

    }
///
/////funcion que hace busqueda en api con terminos "q" que sean track = canciones
    function buscarCancion(){
        limpiarTabla()
        var SearchTerm = $("#SearchTerm").val();
        let urlXD = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=" + SearchTerm;
        var myArray = []
        

        $.ajax({
            method:'GET',
            url:urlXD,
            success:function(response){
                myArray = response.data
                buildCancion(myArray)
                console.log(myArray)
            }
        })

    }
//
/////funcion que hace busqueda en api con terminos q que sean album = album
    function buscarAlbum(){
        limpiarTabla()
        var SearchTerm = $("#SearchTerm").val();
        let urlXD = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=" + SearchTerm;
        var myArray = []
        

        $.ajax({
            method:'GET',
            url:urlXD,
            success:function(response){
                myArray = response.data
                buildAlbum(myArray)
                console.log(myArray)
            }
        })

    }
///
////////////funcion que genera consulta de api basada en id de artista
    function ShowResult(id){
        limpiarTabla()
        document.getElementById("resultado").innerHTML ='Vista: '+id;
        var myResults = []
        let urlResultado = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/" + id;

        $.ajax({
            method:'GET',
            url: urlResultado,
            success:function(response){
                myResults = response
                // buildResults(myResults)
                console.log(myResults);
                console.log(myResults.nb_fan);
                document.getElementById("resultado").innerHTML ='Nombre: '+myResults.name;
                document.getElementById("resultado2").innerHTML ='id: '+myResults.id;
                $("#resultado_img").attr("src",myResults.picture_big);
                playlist(myResults.id, myResults.tracklist)

            }
        })
    }
//

////////////funcion que genera consulta de api basada en id de track
    function ShowTrack(id){
        limpiarTabla()
        document.getElementById("resultado").innerHTML ='Vista: '+id;
        var myResults = []
        let urlResultado = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/" + id;

        $.ajax({
            method:'GET',
            url: urlResultado,
            success:function(response){
                myResults = response
                // buildResults(myResults)
                console.log(myResults);
                // console.log(myResults.nb_fan);
                document.getElementById("resultado").innerHTML ='Nombre: '+myResults.title;
                document.getElementById("resultado2").innerHTML ='Artista: '+myResults.artist.name;
                $("#resultado_img").attr("src",myResults.album.cover_big);
                // playlist(myResults.id, myResults.tracklist)
                $("audio").show();
                document.getElementById("audio").innerHTML ='<audio id="resultado_mp3" src="'+myResults.preview+'" controls>: ';

            }
        })
    }
//


////////////funcion que genera consulta de api basada en id de track
    function ShowAlbum(id){
        limpiarTabla()
        document.getElementById("resultado").innerHTML ='Vista: '+id;
        var myResults = []
        let urlResultado = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/" + id;

        $.ajax({
            method:'GET',
            url: urlResultado,
            success:function(response){
                myResults = response
                // buildResults(myResults)
                console.log(myResults);
                // console.log(myResults.nb_fan);
                document.getElementById("resultado").innerHTML ='Nombre: '+myResults.title;
                document.getElementById("resultado2").innerHTML ='Artista: '+myResults.artist.name;
                $("#resultado_img").attr("src",myResults.cover_big);
                playlist(myResults.id, myResults.tracklist)
            }
        })
    }
//

//////// funcion que genera consulta de playlist basada en id de artista
    function playlist(id, playlisturi){
        limpiarTabla()
        var myPlaylist = []
        let UrlPlaylist = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/"+id+"/top?limit=10";

        $.ajax({
            method: 'GET',
            url: UrlPlaylist,
            success:function(response){
                myPlaylist = response.data
                console.log(myPlaylist);
                buildTable2(myPlaylist);


            }
        })
    }
//

/////////////Construye tabla de resultados de Album
    function buildTable(data){
        document.getElementById("resultado").innerHTML ='';
        $("#resultado2").html("");
        $("#resultado_img").attr("src","");
        var table = document.getElementById('myTable')

        for (var i = 0; i < data.length; i++){
            var row = `<tr class="container-artist">
                            <td class="artist-cover"><img src="${data[i].picture_medium}"></td>
                            <td class="artist-name"><a href="resultado.html?id=${data[i].link}">${data[i].name}</a></td>
                            
                            <td><button type="submit" class="btn-card" onclick="ShowResult(${data[i].id})"><img src="img/music.png"></img></td>
                      </tr>`
            table.innerHTML += row


        }
    }
//
/////////////Construye tabla de resultados de Album
    function buildCancion(data){
        document.getElementById("resultado").innerHTML ='';
        $("#resultado2").html("");
        $("#resultado_img").attr("src","");
        var table = document.getElementById('myTable')

        for (var i = 0; i < data.length; i++){
            var row = `<tr class="container-cancion">
                            
                            <td class="cancion-cover"><img src="${data[i].album.cover_medium}" ></td>
                            <td class="cancion-title">${data[i].title}</td>
                            <td class="cancion-artist">${data[i].artist.name}</td>
                            <td><button type="submit" class="btn-card" onclick="ShowTrack(${data[i].id})"><img src="img/music.png"></img></button></button></td>
                      </tr>`
            table.innerHTML += row


        }
    }  
 //     

 /////////////Construye tabla de resultados de Album
    function buildAlbum(data){
        document.getElementById("resultado").innerHTML ='';
        $("#resultado2").html("");
        $("#resultado_img").attr("src","");
        var table = document.getElementById('myTable')

        for (var i = 0; i < data.length; i++){
            var row = `<tr class="container-album">
                            <td class="album-cover"><img src="${data[i].cover_medium}"></td>
                            <td class="album-title">${data[i].title}</td>
                            <td class="album-artist">${data[i].artist.name}</td>
                            <td><button type="submit" class="btn-card" onclick="ShowAlbum(${data[i].id})"><img src="img/music.png"></img></td>
                      </tr>`
            table.innerHTML += row


        }
    }  
 // 
/////////////Construye tabla de playlist
    function buildTable2(data){
        var table = document.getElementById('myPLTable')

        for (var i = 0; i < data.length; i++){
            var row = `
                        <th>Canciones del momento</th>
                        <tr>

                            <td>${data[i].title}</td>
                            <td><audio src="${data[i].preview}" controls></td>
                      </tr>`
            table.innerHTML += row


        }
    }

