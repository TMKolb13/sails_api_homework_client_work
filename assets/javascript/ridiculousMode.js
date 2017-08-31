(function(){
  $(function(){

    let radioID;

    $("#wineEditForm :input").prop("disabled", true);


    function callAPI(){
      $.get("http://localhost:1337/wine/", function(data){
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

    $("#wineList").on("click", ".radio", function(){
      radioID = $(this).data("id")
      $.get("http://localhost:1337/wine/"+ radioID, function(bottle){
        // reset form values from json object
        //loop over the student i got back from the api
        $.each(bottle, function(key, val){
            //find the input field that matches the name of the key
            let el = $('[name="'+key+'"]')
            //find the type of fiend that we selected
            let type = el.attr('type');
            //based on type, choose how we set the value
            switch(type){
                case 'checkbox':
                    el.attr('checked', 'checked');
                    break;
                case 'radio':
                    el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    el.val(val);
            }
          });
        })
        $("#wineEditForm :input").prop("disabled", false);
      })

      $("#editButton").click(function(e){
        e.preventDefault()
        $.ajax({
          url: "http://localhost:1337/wine/"+radioID,
          data: $("#wineEditForm").serialize(),
          method: "PUT",
          success: function(data){
            callAPI()
            $("#wineEditForm")[0].reset()
            $("#wineEditForm :input").prop("disabled", true);
          }
        })
      })

  })
})()
