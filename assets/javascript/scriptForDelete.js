(function(){
  $(function(){

    let radioID

    function callAPI(){
      $.get("http://localhost:1337/wine/", function(data){
        console.log(data)
        console.log(data[0].brand)
        $("#wineList").html("")
        $.each(data, function(index,bottle){
          console.log(bottle.brand)
          $("#wineList").append(`
            <tr>
              <td><input type="radio" name="radio" data-id="${bottle.id}" class="radio" autocomplete="off"/></td>
              <td>${bottle.brand}</td>
              <td>${bottle.variety}</td>
              <td>${bottle.color}</td>
              <td>${bottle.abv}</td>
            <tr>
            `)
        })
      })
    }

    callAPI()

    function deleteRecord(id){
      $.ajax({
        url: "http://localhost:1337/wine/"+id,
        type: 'DELETE',
        success: function(result) {
            console.log("deletesuccessfunction")
            callAPI()
          }
      });
    }

    //event listener to detect which radio button was selected
    $("#wineList").on("click", ".radio", function(){
      radioID = $(this).data("id")
      console.log(radioID)
    })

    $("#button").click(function(){
      deleteRecord(radioID)
      //callAPI()
    })





  })
})()
