package bg.spotify.users.service.impl;

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

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.getUserById(id);
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
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
        user.setUsername(registrationForm.getUsername());
        user.setEmail(registrationForm.getEmail());
        user.setPassword(passwordEncoder.encode(registrationForm.getPassword()));

        return userRepository.save(user);
    }

}