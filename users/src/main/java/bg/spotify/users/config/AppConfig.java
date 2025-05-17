package bg.spotify.users.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    private static String userAuthApi;

    @Value("${user.auth.api:/api/auth}")
    public void setUserAuthApi(String userAuthApi) {
        AppConfig.userAuthApi = userAuthApi;
    }
    
    public static String getUserAuthApi() {
        return userAuthApi;
    }

}