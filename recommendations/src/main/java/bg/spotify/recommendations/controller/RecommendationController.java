package bg.spotify.recommendations.controller;

import bg.spotify.recommendations.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recommendations")
public class RecommendationController {
    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<String>> getRecommendations(@PathVariable Long userId,
            @RequestParam(defaultValue = "3") int count) {
        return ResponseEntity.ok(recommendationService.getRecommendedSongs(userId, count));
    }
}
