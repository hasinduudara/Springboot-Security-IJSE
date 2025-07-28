package lk.ijse.gdse.backend.controller;

import lk.ijse.gdse.backend.dto.ApiResponse;
import lk.ijse.gdse.backend.dto.AuthDTO;
import lk.ijse.gdse.backend.dto.RegisterDTO;
import lk.ijse.gdse.backend.entity.User;
import lk.ijse.gdse.backend.repository.UserRepository;
import lk.ijse.gdse.backend.service.AuthService;
import lk.ijse.gdse.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(
            @RequestBody RegisterDTO registerDTO) {
        return ResponseEntity.ok(new ApiResponse(
                200,
                "OK",
                authService.register(registerDTO)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(
            @RequestBody AuthDTO authDTO) {
        return ResponseEntity.ok(new ApiResponse(
                200,
                "OK",
                authService.authenticate(authDTO)));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse> getDashboard(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7); // remove "Bearer "
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String dashboard = user.getRole().name().equals("ADMIN") ? "admin_dashboard" : "user_dashboard";
        return ResponseEntity.ok(new ApiResponse(200, "OK", dashboard));
    }

}