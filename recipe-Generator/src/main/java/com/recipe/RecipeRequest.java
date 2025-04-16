package com.recipe;

import java.util.List;

public  class RecipeRequest {
    private List<String> ingredients;
    private String idealTime;
    private Boolean healthy;
    private String instructions;
    private String preferences;
    private Integer servings;
    private String eatWith;

    // Default constructor (required for Jackson)
    public RecipeRequest() {
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getIdealTime() {
        return idealTime;
    }

    public void setIdealTime(String idealTime) {
        this.idealTime = idealTime;
    }

    public Boolean getHealthy() {
        return healthy;
    }

    public void setHealthy(Boolean healthy) {
        this.healthy = healthy;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getPreferences() {
        return preferences;
    }

    public void setPreferences(String preferences) {
        this.preferences = preferences;
    }

    public Integer getServings() {
        return servings;
    }

    public void setServings(Integer servings) {
        this.servings = servings;
    }

    public String getEatWith() {
        return eatWith;
    }

    public void setEatWith(String eatWith) {
        this.eatWith = eatWith;
    }

    // You can optionally add validation annotations here, e.g., @Min for servings
}
