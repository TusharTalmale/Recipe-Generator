package com.recipe;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeGenerationService recipeGenerationService;

    public RecipeController(RecipeGenerationService recipeGenerationService) {
        this.recipeGenerationService = recipeGenerationService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateRecipe(@Valid @RequestBody RecipeRequest request) {
        StringBuilder promptBuilder = new StringBuilder("Generate a recipe");

        if (request.getIngredients() != null && !request.getIngredients().isEmpty()) {
            String ingredientsList = request.getIngredients().stream()
                    .collect(Collectors.joining(", "));
            promptBuilder.append(" using the following ingredients: ").append(ingredientsList);
        }

        if (request.getIdealTime() != null && !request.getIdealTime().isEmpty()) {
            promptBuilder.append(". The ideal preparation/cooking time is ").append(request.getIdealTime());
        }

        if (request.getHealthy() != null && request.getHealthy()) {
            promptBuilder.append(". This recipe should be healthy.");
        } else if (request.getHealthy() != null && !request.getHealthy()) {
            promptBuilder.append(". This recipe does not need to be strictly healthy.");
        }

        if (request.getInstructions() != null && !request.getInstructions().isEmpty()) {
            promptBuilder.append(". Specific instructions: ").append(request.getInstructions());
        }

        if (request.getPreferences() != null && !request.getPreferences().isEmpty()) {
            promptBuilder.append(". User preferences: ").append(request.getPreferences());
        }

        if (request.getServings() != null && request.getServings() > 0) {
            promptBuilder.append(". For ").append(request.getServings()).append(" servings.");
        }

        if (request.getEatWith() != null && !request.getEatWith().isEmpty()) {
            promptBuilder.append(". Ideally, this dish should be eaten with ").append(request.getEatWith()).append(".");
        } else {
            promptBuilder.append("."); // Add a period if no 'eatWith' is provided
        }

        String generatedRecipe = recipeGenerationService.generateRecipe(promptBuilder.toString());
        return ResponseEntity.ok(generatedRecipe);
    }
    @PostMapping("/ask")
    public ResponseEntity<String> askAboutRecipe(@Valid @RequestBody RecipeQuestionRequest request) {
        String answer = recipeGenerationService.askRecipeQuestion(request.getRecipe(), request.getQuestion());
        return ResponseEntity.ok(answer);
    }

}













