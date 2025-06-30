package bg.spotify.users.service.impl;

import bg.spotify.recommendations.service.RecommendationService;
import bg.spotify.users.exceptions.AlreadyExistingUserException;
import bg.spotify.users.exceptions.UserNotFoundException;
import bg.spotify.users.exceptions.WrongCredentialException;
import bg.spotify.users.model.LoginForm;
import bg.spotify.users.model.RegistrationForm;
import bg.spotify.users.model.User;
import bg.spotify.users.repository.UserRepository;
import bg.spotify.users.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RecommendationService recommendaionService;

    @Override
    public User updateUser(Long id, User user) {
        Optional<User> optionalUser = userRepository.getUserById(id);
        if (optionalUser.isEmpty()) {
            throw new UserNotFoundException();
        }
        User existingUser = optionalUser.get();
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setAge(user.getAge());
        existingUser.setCountry(user.getCountry());
        existingUser.setGender(user.getGender());

        recommendaionService.updateUser(id, existingUser.getUsername(), existingUser.getAge(),
            existingUser.getGender(), existingUser.getCountry());

        return userRepository.save(existingUser);
    }

    public User authenticateUser(LoginForm loginForm) {

        return userRepository.findByUsername(loginForm.getUsername())
                .filter(u -> passwordEncoder.matches(loginForm.getPassword(), u.getPassword()))
                .orElseThrow(WrongCredentialException::new);
    }

    public User registerUser(RegistrationForm registrationForm) {
        if (userRepository.findByUsername(registrationForm.getUsername()).isPresent()) {
            throw new AlreadyExistingUserException(
                    String.format("User with username: %s already exists.", registrationForm.getUsername()));
        }

        if (userRepository.findByEmail(registrationForm.getEmail()).isPresent()) {
            throw new AlreadyExistingUserException(
                    String.format("User with email: %s already exists.", registrationForm.getEmail()));
        }

        User user = new User();
        String username = registrationForm.getUsername();
        user.setUsername(username);
        user.setEmail(registrationForm.getEmail());
        user.setPassword(passwordEncoder.encode(registrationForm.getPassword()));

        User saved = userRepository.save(user);
        if (recommendaionService != null) {
            recommendaionService.addNewUser(saved.getId(), username, saved.getAge(), saved.getGender(), saved.getCountry());
        }
        return saved;
    }

}