(function(){
  $(function(){

    $("#wineAddForm").click(function(e){
      e.preventDefault()
    })

    $("#submitButton").click(function(){
      $.post("http://localhost:1337/wine/", $("#wineAddForm").serialize(), function(){
        })
      $("#wineAddForm")[0].reset()
    })

  })
})()
