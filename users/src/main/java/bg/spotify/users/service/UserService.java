package bg.spotify.users.service;

import bg.spotify.users.model.LoginForm;
import bg.spotify.users.model.RegistrationForm;
import bg.spotify.users.model.User;

public interface UserService {

    User updateUser(Long id, User user);
    
    User authenticateUser(LoginForm loginForm);
    
    User registerUser(RegistrationForm registrationForm);
}