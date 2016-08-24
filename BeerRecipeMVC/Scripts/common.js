$(document).ready(function () {

    //searching for recipe name
    $("#searchButton").click(function () {
        var value = {
            Name: $("input").val()
        };

        if ($(this).hasClass("ingredient")) {
            getIngredient(value);
        }
        else {
            getRecipe(value);
        }
        
    });

    //modal add another ingredient
    $("#myModal .modal-add-ingredient").click(function () {
        
        var inputGroup = $(this).closest(".input-group-inner");
        var clone = inputGroup.clone(true).find("input").val("").end(); //clone element events but not data
        clone.appendTo($(".input-group-outer"));
    });

    //modal save recipe
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

    //dropdown menu selection functionality
    $(".dropdown-menu li a").click(function () {
        var selText = $(this).text();
        var option = $(this).attr("data-id");
        var inputGroupParent = $(this).parents('.input-group')
        var recipeTable = $("#recipe-table");
        var searchButton = $("#searchButton");

        inputGroupParent.find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
        recipeTable.find(".panel-title").text(selText);
        recipeTable.find("ul").html('');
        searchButton.removeClass("ingredient recipe");

        if (option == "0") {
            inputGroupParent.find("input").attr("placeholder", "Find a recipe");
            searchButton.addClass("recipe");
        }
        else {
            inputGroupParent.find("input").attr("placeholder", "Find an ingredient");
            searchButton.addClass("ingredient");
        }
    });



    //get all recipes with name
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

    //save down specific recipe
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

    //get all recipes with name
    function getIngredient(data) {
        $.ajax({
            type: "GET",
            url: "/Api/Ingredients",
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: function (data) {
                populateRecipeTable(data);
            },
            error: function () {
                showErrorMessage("Ingredient Not Found!")
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
            items.push('<div> ID: ' + item.Name + '</div><div> Name: ' + item.Name + '</div><div> Description: ' + item.Description + '</div>');
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