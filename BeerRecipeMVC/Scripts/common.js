$(document).ready(function () {

    //click handlers
    $("#searchRecipe").click(function () {
        var recipe = {
            Name: $("input").val()
        };

        getRecipe(recipe);
    });

    $("#addRecipe").click(function () {
        var recipe = {
            ID : "1",
            Name : $("input").val(),
            Description : "placeholder"
        };

        addRecipe(recipe);
    });


    //modal functionality
    $("#myModal .modal-add-ingredient").click(function () {
        var addRow = ['<div class="input-group">'];

        addRow.push("<input type='text' class='form-control ingredient-input' placeholder='Add an ingredient'><span class='input-group-btn'><button type='button' class='btn btn-default modal-add-ingredient' aria-haspopup='true' aria-expanded='false'><span class='glyphicon glyphicon-plus-sign'></span></button></span></div>");
        
        $(this).closest(".input-group").append(addRow);
    });

    $("#modal-save-recipe").click(function () {
        
        var name = $("#recipeName").val();
        var ingredientList = $(".ingredient-input").map(function () { return $(this).val(); }).get();
        var description = $("#recipeDescription").val();

        var data = {
            Name: name,
            Description: description,
            Ingredients: ingredientList
        };

        addRecipe(data);
    });

    //functionality
    function getRecipe(data) {

        $.ajax({
            type: "GET",
            url: "/Api/Recipes",
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: function (data) {

                // create the user list
                var items = ['<ul>'];
                $.each(data, function (index, item) {
                    items.push('<li><a' + item.id + '">'
                            + item.name + '</a></li>');
                });

                items.push('</ul>');

                var result = items.join('');

                // clear current user list
                $('#recipeTable').html('');

                // add new user list
                $(result).appendTo('#recipeTable');
            }
        });
    }

    function addRecipe(data) {
        $.ajax({
            type: "POST",
            url: "/Api/Recipes",
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            success: function () { console.log(data); }
        });
    }

});