package com.recipe;











import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RecipeGenerationService {

    private final GeminiConfig geminiConfig;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public RecipeGenerationService(GeminiConfig geminiConfig, RestTemplateBuilder restTemplateBuilder, ObjectMapper objectMapper) {
        this.geminiConfig = geminiConfig;
        this.restTemplate = restTemplateBuilder.build();
        this.objectMapper = objectMapper;
    }

    public String generateRecipe(String prompt) {
        String apiUrl = String.format("%s/%s:generateContent?key=%s",
                geminiConfig.getApiUrl(),
                geminiConfig.getModelName(),
                geminiConfig.getApiKey());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = String.format("""
                {
                  "contents": [
                    {
                      "parts": [
                        {
                          "text": "%s"
                        }
                      ]
                    }
                  ]
                }
                """, prompt);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                String responseBody = responseEntity.getBody();
                // Parse the JSON response to extract the generated recipe text
                JsonNode root = objectMapper.readTree(responseBody);
                if (root.has("candidates") && root.get("candidates").isArray() && !root.get("candidates").isEmpty()) {
                    JsonNode candidate = root.get("candidates").get(0);
                    if (candidate.has("content") && candidate.get("content").has("parts") && candidate.get("content").get("parts").isArray() && !candidate.get("content").get("parts").isEmpty()) {
                        JsonNode part = candidate.get("content").get("parts").get(0);
                        if (part.has("text")) {
                            return part.get("text").asText();
                        }
                    }
                }
                return "Error: Could not extract recipe from the response.";
            } else {
                return "Error: Gemini AI API request failed with status code: " + responseEntity.getStatusCode();
            }
        } catch (Exception e) {
            return "Error: An error occurred while calling the Gemini AI API: " + e.getMessage();
        }
//        return "Error: Could not extract recipe from the response."; // Default return in case of parsing issues
    }

    public String askRecipeQuestion(String recipe, String question) {
        String apiUrl = String.format("%s/%s:generateContent?key=%s",
                geminiConfig.getApiUrl(),
                geminiConfig.getModelName(),
                geminiConfig.getApiKey());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String prompt = String.format("Here is a recipe: %s. User has the following question: %s", recipe, question);

        String requestBody = String.format("""
                {
                  "contents": [
                    {
                      "parts": [
                        {
                          "text": "%s"
                        }
                      ]
                    }
                  ]
                }
                """, prompt);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                String responseBody = responseEntity.getBody();
                // Parse the JSON response to extract the answer
                JsonNode root = objectMapper.readTree(responseBody);
                if (root.has("candidates") && root.get("candidates").isArray() && !root.get("candidates").isEmpty()) {
                    JsonNode candidate = root.get("candidates").get(0);
                    if (candidate.has("content") && candidate.get("content").has("parts") && candidate.get("content").get("parts").isArray() && !candidate.get("content").get("parts").isEmpty()) {
                        JsonNode part = candidate.get("content").get("parts").get(0);
                        if (part.has("text")) {
                            return part.get("text").asText();
                        }
                    }
                }
                return "Error: Could not extract answer from the response.";
            } else {
                return "Error: Gemini AI API request failed with status code: " + responseEntity.getStatusCode();
            }
        } catch (Exception e) {
            return "Error: An error occurred while calling the Gemini AI API: " + e.getMessage();
        }
//        return "Error: Could not extract answer from the response."; // Default return
    }
}





