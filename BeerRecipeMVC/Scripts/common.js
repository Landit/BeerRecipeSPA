$(document).ready(function () {

    //click handlers
    $("#searchRecipe").click(function () {
        var recipe = {
            Name: $("input").val()
        };

        getRecipe(recipe);
    });

    //modal functionality
    $("#myModal .modal-add-ingredient").click(function () {
        var addRow = ['<div class="input-group">'];

        addRow.push("<input type='text' class='form-control ingredient-input' placeholder='Add an ingredient'><span class='input-group-btn'><button type='button' class='btn btn-default modal-add-ingredient' aria-haspopup='true' aria-expanded='false'><span class='glyphicon glyphicon-plus-sign'></span></button></span></div>");
        
        $(this).closest(".input-group").append(addRow);
    });

    $("#modal-save-recipe").click(function () {
        
        var name = $("#modal-recipe-name").val();
        var description = $("#modal-recipe-description").val();
        var ingredientList = $(".ingredient-input").map(
            function () {
                var rObj = {};
                rObj["Name"] = $(this).val()
                return rObj;;
            }).get();

        var data = {
            Name: name,
            Description: description,
            Ingredients: ingredientList
        };

        addRecipe(data);
    });

    function getRecipe(data) {
        $.ajax({
            type: "GET",
            url: "/Api/Recipes",
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: function (data) {
                populateRecipeTable(data);
            },
            error: function () {
                showErrorMessage("Recipe Not Found!")
            }
        });
    };

    function addRecipe(data) {
        $.ajax({
            type: "POST",
            url: "/Api/Recipes",
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            success: function () {
                $("#myModal").modal("hide");
            },
            error: function () {
                showErrorMessage("Could not add recipe!")
            }
        });
    };

    function populateRecipeTable(data) {

        // create the user list
        var items = [];
        $.each(data, function (index, item) {
            items.push('<li><a data-id=' + item.ID + '>' + item.Name + '</a></li>');
        });

        var result = items.join('');
        var recipeTable = $('#recipe-table ul');

        // clear current user list
        recipeTable.html('');

        // add new user list
        recipeTable.append(result);
    };

    function populateRecipeDetails(data) {
        // create the user list
        var items = [];
        $.each(data, function (index, item) {
            items.push('<li><a data-id=' + item.ID + '>' + item.Name + '</a></li>');
        });

        var result = items.join('');

        // clear current user list
        $('#recipe-details ul').html('');

        // add new user list
        $('#recipe-details ul').append(result);
    };

    function showErrorMessage(message) {
        var alertPopup = $('.alert-danger');

        alertPopup.html('');
        alertPopup.append("<strong>" + message + "</strong>");
        alertPopup.show();
        alertPopup.fadeTo(2000, 500).slideUp(500, function () {
            alertPopup.slideUp(500);
        });
    };
});