package bg.spotify.recommendations.service.impl;

import bg.spotify.recommendations.service.RecommendationService;
import com.recombee.api_client.RecombeeClient;
import com.recombee.api_client.api_requests.AddBookmark;
import com.recombee.api_client.api_requests.AddDetailView;
import com.recombee.api_client.api_requests.AddPurchase;
import com.recombee.api_client.api_requests.DeleteBookmark;
import com.recombee.api_client.api_requests.RecommendItemsToUser;
import com.recombee.api_client.api_requests.SetItemValues;
import com.recombee.api_client.api_requests.SetUserValues;
import com.recombee.api_client.bindings.RecommendationResponse;
import com.recombee.api_client.exceptions.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RecommendationServiceImpl implements RecommendationService {
    @Autowired
    private RecombeeClient recombeeClient;

    @Override
    public void recordSongClick(Long userId, Long songId) {
        try {
            recombeeClient.send(new AddDetailView("" + userId, "" + songId));
        } catch (ApiException e) {
            log.error("There was an error when trying to add DetailView to Recombee", e);
        }
    }

    @Override
    public void recordSongPlay(Long userId, Long songId) {
        try {
            recombeeClient.send(new AddPurchase("" + userId, "" + songId));
        } catch (ApiException e) {
            log.error("Recombee exception occurred when adding a Purchase", e);
        }
    }

    @Override
    public void addNewSong(Long songId, String title, String artist, String album, String genre) {
        try {
            Map<String, Object> values = new HashMap<>();
            values.put("title", title);
            values.put("artist", artist);
            values.put("album", album);
            values.put("genre", genre);

            recombeeClient.send(new SetItemValues(
                    "" + songId,
                    values).setCascadeCreate(true));
        } catch (ApiException e) {
            log.error("Recombee exception occurred when adding a new song", e);
        }
    }

    @Override
    public List<Long> getRecommendedSongs(Long userId, int count) {
        try {
            RecommendationResponse response = recombeeClient.send(
                    new RecommendItemsToUser("" + userId, count));
            return Arrays.stream(response.getIds())
                .map(Long::parseLong)
                .collect(Collectors.toList());
        } catch (ApiException e) {
            log.error("Recombee exception occurred when requesting recommendations", e);
            return Collections.emptyList();
        }
    }

    @Override
    public void addBookmark(Long userId, Long songId) {
        try {
            recombeeClient.send(new AddBookmark("" + userId, "" + songId));
        } catch (ApiException e) {
            log.error("Recombee exception occured when adding a bookmark", e);
        }
    }

    @Override
    public void removeBookmark(Long userId, Long songId) {
        try {
            recombeeClient.send(new DeleteBookmark("" + userId, "" + songId));
        } catch (ApiException e) {
            log.error("Recombee exception occured when removing a bookmark", e);
        }
    }

    @Override
    public void addNewUser(Long userId, String username, Integer age, String gender, String country) {
        try {
            Map<String, Object> values = new HashMap<>();
            values.put("name", username != null ? username : "");

            if (age != null) {
                values.put("age", age);
            }

            if (gender != null) {
                values.put("gender", gender);
            }

            if (country != null) {
                values.put("country", country);
            }

            recombeeClient.send(new SetUserValues(userId + "", values)
                    .setCascadeCreate(true));
        } catch (ApiException e) {
            log.error("Recombee exception when trying to add new user", e);
        }
    }

    @Override
    public void updateUser(Long userId, String username, Integer age, String gender, String country) {
        try {
            Map<String, Object> values = new HashMap<>();
            values.put("name", username != null ? username : "");

            if (age != null) {
                values.put("age", age);
            }

            if (gender != null) {
                values.put("gender", gender);
            }

            if (country != null) {
                values.put("country", country);
            }
            recombeeClient.send(new SetUserValues("" + userId, values)
                .setCascadeCreate(true)
            );

        } catch (ApiException e) {
            log.error("Recombee exception when trying to update a user", e);
        }
    }
}
