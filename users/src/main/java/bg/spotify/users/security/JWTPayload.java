package bg.spotify.users.security;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import bg.spotify.users.model.User;

public record JWTPayload(
        String id,
        String username) {

    public Map<String, String> claims() {
        Map<String, String> claims = new HashMap<>();
        Field[] fields = this.getClass().getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object value = field.get(this);
                if (value != null) {
                    claims.put(field.getName(), value.toString());
                }
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Failed to read field " + field.getName(), e);
            }
        }

        return claims;
    }

    public static JWTPayload fromUser(User user) {
        return new JWTPayload(user.getId().toString(), user.getUsername());
    }
}
