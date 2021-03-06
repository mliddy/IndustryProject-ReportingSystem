$(document).ready(
    function(){
     
        /*
        Functions which makes get request for each column.
        The response is an array of (Reports) in JSON format.
        Extract all the data in the array and add it to a String along with HTML,CSS,BootStrap
        Use Jquery to add the String variable to the element in the feed.hbs page.
        */
        getOlderReports();
        function getOlderReports() {			
            $.ajax({
                url: '/getOlderClosedReports/',
                type: 'GET',
                success: function (data) {
                    //console.log(data) //for testing 
                    var posts = "";
                    for (var i = 0; i < data.length; i++) 
                    {    //creates a new row for each Report and displays each attribute using HTML tags                    
                        posts+= " <div class='row text-white'><div class='col-sm-6'>"
                        + "<img onclick= "+str+" name ='img' src= '/"+data[i].image_file_name  
                        + "' style='width: 50px; height: 50px'>"+" Votes: "+data[i].votes
                        +"<br><br><button type='button' id='del' name='changeStatus " 
                        + data[i]._id +" Older' class='btn btn-primary'>Open</button>"+
                        "<button type='button' id='del' name='delete "
                        +data[i]._id+" Older' class='btn btn-danger'>Delete</button>" 
                        +"</div><div class='col-sm-6'style='text-align: left'>"+"<p>Building: "+data[i].building+"</p>"
                        + "<p>RoomNo:"+ data[i].room_number+"</p>"
                        +
                        "<p> Description: "+ data[i].description + "</p>"
                        +"<p>Status: "+data[i].status
                        +"<br>" 
                        +"</p></div></div><br>";
    
                    }
                    //Replaces inner HTML of element where id='OlderPosts' with posts. 
                    $("#OlderPosts").html(posts); 
                }
            });
        }
        
        getWeeklyReports();
        function getWeeklyReports() {			
            $.ajax({
                url: '/getWeeklyClosedReports/',
                type: 'GET',
                success: function (data) {
                    //console.log(data) //for testing 
                    var posts = "";
                    for (var i = 0; i < data.length; i++) 
                    {    //creates a new row for each Report and displays each attribute using HTML tags                    
                        posts+= " <div class='row'><div class='col-sm-6'>"
                        + "<img onclick= "+str+" name ='img' src= '/"+data[i].image_file_name  
                        + "' style='width: 50px; height: 50px'>"+" Votes: "+data[i].votes
                        +"<br><br><button type='button' id='del' name='changeStatus " 
                        + data[i]._id +" Weekly' class='btn btn-primary'>Open</button>"+
                        "<button type='button' id='del' name='delete "
                        +data[i]._id+" Weekly' class='btn btn-danger'>Delete</button>" 
                        +"</div><div class='col-sm-6' style='text-align: left'>"+"<p>Building: "+data[i].building+"</p>"
                        + "<p>RoomNo:"+ data[i].room_number+"</p>"
                        +
                        "<p> Description: "+ data[i].description + "</p>"
                        +"<p>Status: "+data[i].status
                        +"<br>" 
                        +"</p></div></div><br>";
    
                    }
                    //Replaces inner HTML of element where id='WeeklyPosts' with posts. 
                    $("#WeeklyPosts").html(posts); 
                }
            });
        }

     /*
     Function which makes get request to /getTodaysReports.
     The response is an array of (Reports) in JSON format.
     Extract all the data in the array and add it to a String along with HTML,CSS,BootStrap
     Use Jquery to add the String variable to the element in the feed.hbs page.
     */   
    getTodaysReports();
    function getTodaysReports() {			
        $.ajax({
            url: '/getTodaysClosedReports/',
            type: 'GET',
            success: function (data) {
                //console.log(data) //for testing 
                var posts = "";
                for (var i = 0; i < data.length; i++) 
                {    //creates a new row for each Report and displays each attribute using HTML tags                    
                    posts+= " <div class='row text-white'><div class='col-sm-6'>"
                    + "<img onclick= "+str+" name ='img' src= '/"+data[i].image_file_name  
                    + "' style='width: 50px; height: 50px'>"+" Votes: "+data[i].votes
                    +"<br><br><button type='button' id='del' name='changeStatus " 
                    + data[i]._id +" Today' class='btn btn-primary'>Open</button>"+
                    "<button type='button' id='del' name='delete "
                    +data[i]._id+" Today' class='btn btn-danger'>Delete</button>" 
                    +"</div><div class='col-sm-6'style='text-align: left'>"+"<p>Building: "+data[i].building+"</p>"
                    + "<p>RoomNo:"+ data[i].room_number+"</p>"
                    +
                    "<p> Description: "+ data[i].description + "</p>"
                    +"<p>Status: "+data[i].status
                    +"<br>" 
                    +"</p></div></div><br>";

                }
                //Replaces inner HTML of element where id='TodaysPosts' with posts. 
                $("#TodaysPosts").html(posts); 
            }
        });
       // setTimeout(getTodaysReports, 1000); // recursively calls getTodaysReports (comments are refreshed every 10 seconds)
    }

    //Delets Report from DB
    $("#posts").click(function (event){
        /*splits name of target(button clicked) at every space, adding it to an array
        Name consits of 1) Desired Action & 2) id of Report in DB  
        */
        var targetArray = event.target.name.split(" ");
        console.log(targetArray[2]);
        //If true, sends delte request, passing id as param.
        if(targetArray[0] == "delete"){
            //alert("Disabled During Demo ");  //uncomment for demo + disable below
            $.ajax({
            url: '/deleteReport/' + targetArray[1],
            type: 'DELETE',
            success: function(result) {
                if (targetArray[2] == "Today"){
                getTodaysReports(); //reloads Reports
                }else if (targetArray[2]== "Weekly"){
                    getWeeklyReports();
                }else getOlderReports();
                    }
            });
        }
    });

    //Changes status of Report to false 
    $("#posts").click(function (event){
        var targetArray = event.target.name.split(" ");
        console.log(targetArray[2]);
        if(targetArray[0] == "changeStatus"){
            $.ajax({
            url: '/changeStatusTrue/' + targetArray[1],
            type: 'PUT',
            success: function(result) {
                if (targetArray[2] == "Today"){
                    getTodaysReports(); //reloads Reports
                    }else if (targetArray[2]== "Weekly"){
                        getWeeklyReports();
                    }else getOlderReports();
                        }
            });
        }
    });
});