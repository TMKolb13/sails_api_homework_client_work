(function(){
  $(function(){

    function callAPI(){
      $.get("http://localhost:1337/wine/", function(data){
        console.log(data)
        console.log(data[0].brand)
        $.each(data, function(index,bottle){
          console.log(bottle.brand)
          $("#wineList").append(`
            <tr>
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




  })
})()
