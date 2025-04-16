package com.recipe;

import jakarta.validation.constraints.NotBlank;

public  class RecipeQuestionRequest {
    @NotBlank(message = "Recipe cannot be blank")
    private String recipe;

    @NotBlank(message = "Question cannot be blank")
    private String question;

    public String getRecipe() {
        return recipe;
    }

    public void setRecipe(String recipe) {
        this.recipe = recipe;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
