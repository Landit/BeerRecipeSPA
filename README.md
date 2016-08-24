# BeerRecipeSPA
Single Page Application to search and save beer recipes

Create a simple single page application that allows users to design beer recipes. The user requires the following features:
•             Ability to Search Ingredients (e.g. hops, grain, extract)
•             Ability to Save a Recipe
•             Ability to search for a recipe

As part of the project, I am aiming to implement the full stack solution. 

Front end = jQuery and bootstrap with minimal css changes
Back end = .NET 4.5 with Web API 2 and Entity Framework 6. LocalDB is used to save and populate recipes for the given user

Initially, I wanted to deliver this exercise through the ASP.NET SPA template, however that comes with MVVM population of Knockout.js - something I'm not familiar with...yet

TODOs:

Major
•             clean up any console errors/red flags
•             ensure that addition button for ingredients in modal is cleaned up and is truly cloned when clicked
•             display recipe details once clicking on single recipe in recipe search table 
•             enhance UI - not the prettiest
•             add error handling to null/empty/garbage inputs
•             clean up javascript code (ideally switch to Knockout for event bindings - much cleaner than jQuery)

Medium
•             ability to delete recipes
•             create view bags (cleans up razor code and provides code reuse down the road)

Minor
•             localDB should not be run in production setting. Ideally have handled production tables for data
•             security - XSS attacks
•             organize bundles
