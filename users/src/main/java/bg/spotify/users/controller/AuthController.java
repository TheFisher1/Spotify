package bg.spotify.users.controller;

import bg.spotify.users.model.User;
import bg.spotify.users.model.UserDto;
import bg.spotify.users.security.JwtUtil;
import bg.spotify.users.model.AuthResponse;
import bg.spotify.users.model.LoginForm;
import bg.spotify.users.model.RegistrationForm;
import bg.spotify.users.service.UserService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//${users.auth.api:/auth}
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginForm loginForm) {
        User user = userService.authenticateUser(loginForm);
        String token = jwtUtil.generateToken(user.getUsername());

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody RegistrationForm registrationForm) {
        User savedUser = userService.registerUser(registrationForm);
        return ResponseEntity.ok(convertToDto(savedUser));
    }

    private UserDto convertToDto(User user) {
        return new UserDto(user.getUsername(), user.getEmail());
    }
}